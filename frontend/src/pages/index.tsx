import Head from "next/head";
import styles from '../../styles/home.module.scss'
import Image from "next/image";
import logoImg from '../../public/logo.svg'
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from 'next/link';
import { FormEvent, useContext, useState } from "react";
import {AuthContext} from "../contexts/AuthContexts"
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { funcaoUsuariosNaoLogados } from "../utils/funcaoUsuariosNaoLogados";

export default function Home () {

	const {singIn} = useContext(AuthContext);

	const [email, setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [loading, setLoading] = useState(false);


	async function logar (e: FormEvent){
		e.preventDefault();


		if(email==='' || password === ''){
			toast.warn("Por favor, informe todos os campos!")
			return;	
		}

		setLoading(true)

		let dadosLogin ={
			email,
			password,
			loading
		}
	
		await singIn(dadosLogin);

		setLoading(false)
	} 


	return (
		<>
		<Head>
			<title>Dr Plastico - Faça seu Login</title>
		</Head>
		<div className ={styles.containerCenter}>
			<Image src={logoImg} alt="Logo Sysrota"/>
			<div className={styles.login}>
			<h1>
				Informe seus dados para acesso	
			</h1>
				<form onSubmit={logar}>
					<Input
						placeholder="Informe seu email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="Informe sua senha"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button 
						type="submit"
						loading={loading}
					>
						Acessar
					</Button>
				</form>
				<Link legacyBehavior href={"/signup"}>
					<a className={styles.text}>Não possui uma conta? Cadastre-se</a>
				</Link>
			</div>
		</div>
		</>
	)
}

// export const getServerSideProps: GetServerSideProps = async (ctx) =>{
// 	console.log("Testando Server Side")
// 	return{
// 		props:{}
// 	}
// }


export const getServerSideProps = funcaoUsuariosNaoLogados(async (ctx) => {
	return {
		props: {}
	}
})
