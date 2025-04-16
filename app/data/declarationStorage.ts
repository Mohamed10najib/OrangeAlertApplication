import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your Declaration interface
import  DeclarationInterface  from '../../interfaces/DeclarationInterface';

const DECLARATION_KEY = 'declarations';

// Get all declarations
export  const  getDeclarations = async (): Promise<DeclarationInterface[]> => {
  const data = await AsyncStorage.getItem(DECLARATION_KEY);
  return data ? JSON.parse(data) : [];
};

// Add a new declaration
export const  addDeclaration = async (declaration: DeclarationInterface): Promise<DeclarationInterface[]> => {
  const existing = await getDeclarations();
  const newDeclarations = [...existing, declaration];
  await AsyncStorage.setItem(DECLARATION_KEY, JSON.stringify(newDeclarations));
  return newDeclarations;
};

// Clear all declarations
export const clearDeclarations = async (): Promise<void> => {
  await AsyncStorage.removeItem(DECLARATION_KEY);
};
export const  getDeclaration = async (id: number): Promise<DeclarationInterface | undefined> => {
  const stored = await AsyncStorage.getItem(DECLARATION_KEY);
  const declarations: DeclarationInterface[] = stored ? JSON.parse(stored) : [];
  return declarations.find((declaration) => declaration.id === id);
};


// Overwrite declarations
export const setDeclarations = async (declarations: DeclarationInterface[]): Promise<void> => {
  await AsyncStorage.setItem(DECLARATION_KEY, JSON.stringify(declarations));
};
