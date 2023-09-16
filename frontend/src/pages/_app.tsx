import { AppProps } from "next/app";
import '../../styles/globals.scss';
import { AuthProvider } from '../contexts/AuthContexts';

function Myapp({Component, pageProps}: AppProps){
    return(
        <AuthProvider>
            <Component{...pageProps}/>
        </AuthProvider>
    )
}

export default Myapp;