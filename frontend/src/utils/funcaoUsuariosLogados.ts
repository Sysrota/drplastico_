import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError/AuthTokenError";
import { redirect } from "next/dist/server/api-utils";

export function funcaoUsuariosLogados<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        if(!cookies['@drplastico.token']){
            return{
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }
        try{
            return await fn(ctx);
        }catch(erro){
            if(erro instanceof AuthTokenError){
                destroyCookie(ctx,cookies['@drplastico.token']);
                return{
                    redirect:{
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}