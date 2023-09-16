import Router from "next/router";
import { destroyCookie, setCookie } from 'nookies';
import { ReactNode, createContext, useState } from "react";
import { api } from "../services/apiClient";


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

            // Redirecionar o usuario para pagina principal

            Router.push('/dashboard')


        }catch(error){
            console.log("ERRO",error)
        }
    }

    async function singUp({name,email,password}:SignUpProps){

        const response = await api.post('/users',{
            name,
            email,
            password
        })

    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,singIn, singOut,singUp}} >
            {children}
        </AuthContext.Provider>
    )
}

