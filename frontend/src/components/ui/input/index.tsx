import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...params}:InputProps){
    return(
        <input className={styles.input} {...params} />
    )
}

export function TextArea({...params}:TextAreaProps){
    return(
        <textarea className={styles.input} {...params} />
    )
}