import axios from "axios";
import {LoginRequest,RegisterRequest} from '../../../interfaces/AuthTypes'
import AuthenticationServiceInterface from "../ServiceInterface/AuthenticationServiceInterface";
import { API_URL } from '../../../config';
export default class AuthenticationService implements AuthenticationServiceInterface{
    
async register(newUser:RegisterRequest):Promise<string>{
try{
    const response = await axios.post(`${API_URL}auth/register`,newUser,{
        headers: {
          "Content-Type": "application/json",
        },});
    return "hhh";
}catch(error){
console.error("there is an error :"+error);
}
return 'jjf';

}
async login(userLogin:LoginRequest):Promise<AuthenticationResponse>{
    try{
        const response = await axios.post(`${API_URL}auth/login`, userLogin,{
            headers: {
              "Content-Type": "application/json",
            },});
        return response.data;
    }catch(error){
      throw error;
    }


}
async VerificationEmailNumero(email:string,numero:string):Promise<string>{
  try{
      const response = await axios.get(`${API_URL}auth/Verification/${email}/${numero}`,{
          headers: {
            "Content-Type": "application/json",
          },});
      return response.data;
  }catch(error){
    throw error;
  }


}


}