import Head from "next/head"
import { funcaoUsuariosLogados } from "../../utils/funcaoUsuariosLogados"
import { Header } from "../../components/Header"

export default function Dashboard(){
    return(
        <>
        <Head>
            <title>Painel - Dr. Plastico</title>
        </Head>
        <Header/>
        </>
        
    )
}

export const getServerSideProps = funcaoUsuariosLogados(async (ctx) => {
	return {
		props: {}
	}
})