export class AuthTokenError extends Error{
    constructor(){
        super('Erro ao Autenticar o Token')
    }
}