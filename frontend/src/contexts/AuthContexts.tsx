import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useState, useEffect } from "react";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";


type AuthContextData ={
    user: UserProps;
    isAuthenticated:boolean;
    singIn:(credencials: SignInProps) => Promise<void>;
    singOut:() => void;
    singUp:(credencials: SignUpProps) => Promise<void>;
}

type SignInProps ={
    email: string;
    password: string;
}

type SignUpProps ={
    name: string;
    email: string;
    password: string;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}


type AuthProviderProps={
    children: ReactNode;
}


export function singOut(){
    try{
        destroyCookie(undefined,'@drplastico.token');
        Router.push('/')
    }catch{
        console.log("Erro ao Deslogar")
    }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(()=>{
        // Recuperar dados do token no browser
        const { '@drplastico.token': token } = parseCookies();

        if(token){
            api.get('/me').then(response=>{
                const {id,name,email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            }).catch(()=>{
                singOut();
            })

        }

    },[])

    async function singIn({email,password} : SignInProps){
        try{
            const response = await api.post('/session',{
                email,
                password
            })
            // console.log("Chegou",response.data)
            const [id, name, token] = response.data.token;
 
            setCookie(undefined,'@drplastico.token', response.data.token,{
                maxAge: 60 * 60 * 24 * 30, // 30 dias para expirar o token
                path: "/" // quais rotas usam cooke
            })

            setUser(
                {
                    id,
                    name,
                    email
                }
            )
            // Passar para as proximas requisicoes o token 

            api.defaults.headers['Authorization'] = `Baerer ${token}`

            // Alerta de boas vindas
            toast.success("Seja Bem vindo!!!")

            // Redirecionar o usuario para pagina principal
            Router.push('/dashboard')


        }catch(error){
            toast.error("Não foi possível logar! \n" + error)
            console.log("ERRO AO LOGAR",error)
        }
    }

    async function singUp({name,email,password}:SignUpProps){
        try{
            const response = await api.post('/users',{
                name,
                email,
                password
            })
            toast.success("Usuário cadastrado com sucesso Bem vindo!!!")
            Router.push("/")
        }catch(error){
            toast.error("Não foi possível cadastrar o usuário!" + error)
            console.log("Erro ao cadastrar usuario", error)
        }


    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,singIn, singOut,singUp}} >
            {children}
        </AuthContext.Provider>
    )
}

