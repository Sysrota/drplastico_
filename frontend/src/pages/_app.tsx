import { AppProps } from "next/app";
import '../../styles/globals.scss';
import { AuthProvider } from '../contexts/AuthContexts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Myapp({Component, pageProps}: AppProps){
    return(
        <AuthProvider>
            <Component{...pageProps}/>
            <ToastContainer 
            autoClose={3000}
            position="top-center"
            />
        </AuthProvider>
    )
}

export default Myapp;