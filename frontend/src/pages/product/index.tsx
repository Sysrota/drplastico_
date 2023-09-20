import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { api } from "../../services/apiClient";
import { funcaoUsuariosLogados } from "../../utils/funcaoUsuariosLogados";
import styles from './styles.module.scss';

export default function Product(){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [banner, setBanner] = useState('');
    const [urlavatar, setUrlAvatar] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    async function save(event: FormEvent){
        event.preventDefault();
        if(name === ''){
            toast.info("Por favor informe o nome do produto")
        }

        await api.post('/product',{
            name: name,
            description: description,
            price: price,
            banner:banner
        })

        toast.success(`O produto ${name} foi cadastrado com suscesso`);

        setName("")
        setBanner("")
        setDescription("")
        setPrice(0)

    }

    function getImagem(e:ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }
        const imagem = e.target.files[0];

        if(!imagem){
            return;
        }

        if(imagem.type === "image/png" || imagem.type === "image/jpeg" || imagem.type === "image/jpg"){
            setImageAvatar(imagem);
            setUrlAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }

    return(
        <>
        <Head>
            <title>
                Produtos - Dr Plastico
            </title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastro de Produto</h1>  
                <form 
                    onSubmit={save} 
                    className={styles.form}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#FFF"/>
                        </span>
                        <input type="file" accept="image/png, image/jpeg" onChange={getImagem}/>

                        {urlavatar &&(
                            <img 
                            className={styles.preview}
                            src={urlavatar}
                            alt="Foto do Produto"/>)
                        }

                    </label>

                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Digite de nome do Produto"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                     />
                     <textarea
                        placeholder="Descreva o produto"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                     />
                     <input
                      className={styles.input}
                      type="number"
                      placeholder="Digite o valor a ser vendido"
                      value={price}
                      onChange={(e)=>setPrice(e.target.valueAsNumber)}
                     />
                    <input
                      className={styles.input}
                      type="text"
                      value={banner}
                     onChange={(e)=>setBanner(e.target.value)}
                     />
                     <button className={styles.buttonAdd}>
                        Salvar
                     </button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = funcaoUsuariosLogados(async (ctx) => {
	return {
		props: {}
	}
})