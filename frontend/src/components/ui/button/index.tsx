import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?:boolean,
    children: ReactNode
}
// extends ButtonHTMLAttributes<HTMLButtonElement>{}

export function Button({loading,children,...params}:ButtonProps){
    return(
        <button 
            className={styles.button}
            disabled={loading}
            {...params}
        >

        {loading? (
            <FaSpinner color="#FFF" size={16}/>
        ):
        <a className={styles.buttonText}>
            {children}
        </a>
        }

        </button>
    )
}