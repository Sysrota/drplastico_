import {useContext} from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContexts';
export function Header(){
    const {singOut} = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href={"/dashboard"}>
            <img src='/logo.svg'></img>
            </Link>
            <nav className={styles.menuNav}>
                <Link href={'/product'}>
                    Produto
                </Link>
                <Link href={'/cadastros'}>
                    Relatórios
                </Link>
                <button onClick={singOut}>
                    <FiLogOut color='#FFF' size={24}/>
                </button>
            </nav>
        </div>
    </header>
    )
}