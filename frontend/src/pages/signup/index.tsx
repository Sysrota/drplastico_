import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import { FormEvent, useContext, useState } from "react";
import {AuthContext} from '../../contexts/AuthContexts'
import { toast } from "react-toastify";

export default function Signup () {
	const {singUp} = useContext(AuthContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [loading, setLoading] = useState(false);


	async function salvar(e:FormEvent) {
		e.preventDefault();
		if(name === '' || email === '' || password === ''){
			toast.info("Por favor, informe todos os campos!")
			return;
		}

		setLoading(true)


		let dadosUsuario ={
			email,
			password,
			name
		}
		singUp(dadosUsuario);

		setLoading(false)
	}

	return (
		<>
		<Head>
			<title>Dr Plastico - Cadatro de Usuário</title>
		</Head>
		<div className ={styles.containerCenter}>
			<Image src={logoImg} alt="Logo Sysrota"/>
			<div className={styles.login}>
			<h1>
				Cadastro de Usuário	
			</h1>
				<form onSubmit={salvar}>
				<Input
						placeholder="Informe o Nome Completo"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

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
						Salvar
					</Button>
				</form>
				<Link legacyBehavior href={"/"}>
					<a className={styles.text}>Já possui uma conta? Clique aqui para fazer login</a>
				</Link>
			</div>
		</div>
		</>
	)
}
