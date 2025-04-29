import DeclarationInterface from "@/interfaces/DeclarationInterface";
import DeclarationRepositoryInterface from "../../Repository/RepositoryInterface/DeclarationRepositoryInterface";
import DeclarationServiceInterface from "../ServiceInterface/DeclarationServiceInterface";
import DeclarationRepositoryImplement from "@/app/Repository/RepositoryImplement/DeclarationRepositoryImplement";
 class DeclarationsServiceImplement implements DeclarationServiceInterface{
  private declarationRepository:DeclarationRepositoryInterface =  new DeclarationRepositoryImplement();
  async SaveDeclaration(Declaration :DeclarationInterface):Promise<DeclarationInterface | null> {
    try {
      const DeclarationResult:DeclarationInterface | null  =  await this.declarationRepository.SaveDeclaration(Declaration);

        return DeclarationResult;
      } catch (error) {
        console.error("Failed to save declarations", error);
        return null;
      }
    }
  async getAllDeclaration (): Promise<DeclarationInterface[]>{
      try {
        const AllDeclaration :DeclarationInterface[] =  await this.declarationRepository.GetAllDeclaration();
        return  AllDeclaration;
      }catch(error){
         console.error(error);
      }
      return []
  };
  async getDeclaration (id:number): Promise<DeclarationInterface | null>{
    try {
      const Declaration:DeclarationInterface|null =  await this.declarationRepository.GetDeclaration(id);
      return  Declaration;
    }catch(error){
       console.error(error);
    }
    return null;
};
  
    
}

export default DeclarationsServiceImplement;