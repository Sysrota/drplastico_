import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { singout } from "../contexts/AuthContexts";
import { AuthTokenError } from "./errors/AuthTokenError/AuthTokenError";



export function SetupAPIClient(ctx =undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:{
            Authorization:`Bearer ${cookies['@drplastico.token']}`
        }
    })

    api.interceptors.response.use(response=>{
        return response;
    },(error: AxiosError) => {
        if(error.response.status === 401){
            if(typeof window !== undefined){
                // Deslogar o Usuario
                singout();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
    })

    return api;
}