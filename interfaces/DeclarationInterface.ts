import {StatusEnum} from '../Enums/EnumStatus';


export default interface DeclarationInterface {
    id: number;
    description: string;
    dateDeCreation: string; 
    dateDeResolution: string; 
    reponse: string;
    typeDeProbleme: string;
    typeDeExact: string;
    altitude: number;
    adressComplet: string;
    ville: string;
    debit: number;
    longitude: number;
    status: string;
    userId: number;
    natureProbleme: string;
  }
  