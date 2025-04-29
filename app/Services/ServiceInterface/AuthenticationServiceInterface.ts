import {LoginRequest,RegisterRequest} from '../../../interfaces/AuthTypes'

export default interface AuthenticationServiceInterface {

    register : (newUser:RegisterRequest)=>Promise<string>;
    login : (userLogin:LoginRequest)=>Promise<AuthenticationResponse>;
    VerificationEmailNumero:(email:string,numero:string)=>Promise<string>;

}