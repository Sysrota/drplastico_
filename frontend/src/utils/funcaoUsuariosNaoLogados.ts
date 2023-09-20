import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

export function funcaoUsuariosNaoLogados<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        if(cookies['@drplastico.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(ctx);
    }
}