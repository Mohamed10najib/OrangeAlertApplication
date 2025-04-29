import DeclarationInterface from "@/interfaces/DeclarationInterface";

 export default interface DeclarationServiceInterface {
    getAllDeclaration: () => Promise<DeclarationInterface[]>;
    SaveDeclaration: (Declaration :DeclarationInterface)=>Promise<DeclarationInterface | null>;
    getDeclaration :(id:number)=> Promise<DeclarationInterface| null>;
}