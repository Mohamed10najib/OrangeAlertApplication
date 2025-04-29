import DeclarationInterface from '@/interfaces/DeclarationInterface';
import DeclarationRepositoryInterface  from '../RepositoryInterface/DeclarationRepositoryInterface'
import axios from 'axios';
import { API_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class DeclarationRepositoryImplement implements DeclarationRepositoryInterface{
  
  private async getTokens(): Promise<string | null> {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error("No token found in AsyncStorage");
    }
    return token;
  }
   async SaveDeclaration(Declaration :DeclarationInterface):Promise<DeclarationInterface | null> {
    try {
      const tokens =await this.getTokens();
       console.log("tokens is :" ,tokens);
        const response = await axios.post<DeclarationInterface>(`${API_URL}signalement`,Declaration,{
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokens}`,
            },});
        return response.data;
      } catch (error) {
        console.error("Failed to save declarations", error);
        return null;
      }
    }
    async GetAllDeclaration(): Promise<DeclarationInterface[]> {
      try {
        const tokens = await this.getTokens();
      
        if (!tokens) {
          console.error("No token found");
          return [];
        }
      
        const response = await axios.get<DeclarationInterface[]>(`${API_URL}signalements`, {
          headers: {
            "Authorization": `Bearer ${tokens}`,
          },
        });
      
        return response.data;
      
      } catch (error: any) {
        console.error("Failed to fetch declarations", error);
        
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access. Token may be invalid.");
        } else {
          console.error("Error occurred while fetching declarations:", error.message);
        }
        
        return [];
      }
    }
      async GetDeclaration(id:number): Promise<DeclarationInterface| null> {
        try {
          const tokens = await this.getTokens();
          console.log("tokens is :" ,tokens);
          const response = await axios.get<DeclarationInterface>(`${API_URL}signalements/${id}`,{
            headers: {
             "Authorization": `Bearer ${tokens}`,
            },});
          return response.data;
        } catch (error) {
          console.error( `Failed to fetch declarations id  : ${id}` , error);
          return null;
        }
      }
    
}