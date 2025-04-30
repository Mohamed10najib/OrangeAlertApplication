
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useRouter,usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);
 
 
useEffect(() => {
  async function VerificationTokens() {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error("No token found in AsyncStorage");
      console.error("tokens"+token)
      
    }
    if (token==null && pathname.startsWith("/mainPages/")) {
      setRedirecting(true);
      router.replace('/auth/login');
    }
  
  };
    
  VerificationTokens(); 
   
  }, []);
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade',  }}  />
        <Stack.Screen name="auth/login" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="auth/register/registerFirstStep" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="auth/register/registerSecondStep" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="auth/register/registerThirdStep" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="auth/register/registerConfirmation" options={{ headerShown: false , animation: 'fade' }}  />
        
        <Stack.Screen name="mainPages/home" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="mainPages/createDecStep1" options={{ headerShown: false , animation: 'fade'}}  />
        <Stack.Screen name="mainPages/createDecStep2" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="mainPages/confirmationDec" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="mainPages/consulterLesDeclarations" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="mainPages/detailsDeclaration/[id]" options={{ headerShown: false , animation: 'fade' }}  />
        <Stack.Screen name="mainPages/mapPage" options={{ headerShown: false , animation: 'fade' }}  />
        

        
        
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
