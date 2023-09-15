import Head from "next/head";
import styles from '../../styles/home.module.scss'
import Image from "next/image";
import logoImg from '../../public/logo.svg'
import { Input } from "../components/ui/input";

export default function Home () {
	return (
		<>
		<Head>
			<title>Dr Plastico - Faça seu Login</title>
		</Head>
		<div className ={styles.containerCenter}>
			<Image src={logoImg} alt="Logo Sysrota"></Image>
			<div className={styles.login}>
				<form>
					<Input
						placeholder="Informe seu email"
						type="text"
					/>
				</form>
				<form>
					<Input
						placeholder="Informe sua senha"
						type="password"
					/>
				</form>
			</div>
		</div>
		</>
	)
}
