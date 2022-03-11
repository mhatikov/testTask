export class AuthError extends Error{
    constructor(message: string){
        super(message)
        this.name = 'AuthError'
    }
}
export class ServerError extends Error{
    constructor(message: string){
        super(message)
        this.name = 'ServerError'
    }
}