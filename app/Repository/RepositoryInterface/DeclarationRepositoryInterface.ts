import DeclarationInterface from "@/interfaces/DeclarationInterface";

export default interface  DeclarationRepositoryInterface {
    GetAllDeclaration: ()=>Promise<DeclarationInterface[]>;
    GetDeclaration: (id:number)=>Promise<DeclarationInterface| null>;
    SaveDeclaration: (Declaration :DeclarationInterface)=>Promise<DeclarationInterface | null>;
}