import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import InputFiled from '../../components/InputFiled';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import {
  
 
  clearDeclarations
  
} from '../data/declarationStorage';
const LoginScreen = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    OnriaSans: require('../../assets/fonts/InriaSans-Bold.ttf'),
  });
 const Password: string ="Orange@2025";
 const Number: string ="0666666666";
 const [isInCorrect, setIsInCorrect] = useState(false);
 const [InputPassword, setInputPassword] = useState("");
 const [InputNumber, setInputNumber] = useState("");

 function  checkPassword (){
  
   if(Password==InputPassword&& Number==InputNumber){
   
    router.push('/mainPages/home');
    
   }else{
    setIsInCorrect(true);
   }

 }
 const handleChangePassword = (text: string) => {
  setInputPassword(text);
};
const handleChangeNumber = (text: string) => {
  setInputNumber(text);
};
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.Container}>
          <View style={styles.ContainerChild1}>
            <Text style={styles.titleContainer}>
              <Text style={styles.OrangeText}>Orange</Text>
              <Text style={styles.AlertText}>Alert</Text>
            </Text>
          </View>
          <View style={styles.ContainerChild2}>
            <Text style={styles.textChild2}>
              Connectez-vous pour signalez vos problèmes de réseau facilement !
            </Text>
          </View>
          <View style={styles.ContainerChild3}>
            <InputFiled label="Numéro de téléphone" placeholder="Entrez votre numéro de téléphone" isForPassword={false} value={InputNumber} onChangeText={handleChangeNumber} typeInput='large' mode="mode1"   editable={true}  />
            <InputFiled label="Mot de passe" placeholder="Entrez votre mot de passe" isForPassword={true} value={InputPassword} onChangeText={handleChangePassword} typeInput='large' mode="mode1"   editable={true} />
            <Text style={styles.passwordForget}>Mot de passe oublié ?</Text>
            {isInCorrect&&<View style={styles.ContainerChild31}><Text style={styles.ContainerText31}>Le mot de passe ou le numéro de téléphone est incorrect.</Text></View>}
          </View>
          <View style={styles.ContainerChild4}>
            <View>
              <TouchableOpacity onPress={ () => checkPassword()} style={styles.button1}>
                <Text style={styles.buttonText1}>Se connecter</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ContainerChild42}>
              <Text style={styles.ContainerChildText1}>Vous n'avez pas de compte ?</Text>
              <Text style={styles.ContainerChildText2}>Créer un compte</Text>
            </View>
            
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 13,
  },
  ContainerChild31 :{ marginBottom :'auto',marginTop :'auto',paddingLeft:10},
  ContainerText31 :{color :'red',textAlign :'center' },
  ContainerChildText1: {
    color: '#797979',
    fontWeight: 'medium',
  },
  ContainerChildText2: {
    paddingLeft: 10,
    color: '#4D81E7',
    fontWeight: 'bold',
  },
  ContainerChild42: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 36,
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Nunito_400Regular',
    textTransform: 'uppercase',
  },
  button1: {
    backgroundColor: '#FF9B17',
    paddingVertical: 12,
    width: width - 60,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  passwordForget: {
    color: '#4D81E7',
    textAlign: 'right',
    paddingRight: 20,
    fontWeight: 'bold',
  },
  textChild2: {
    fontSize: 25,
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: 'center',
    fontFamily: 'OnriaSans',
    fontWeight: 'bold',
  },
  AlertText: {
    color: '#000000',
  },
  OrangeText: {
    color: '#FF9B17',
  },
  Container: {
    backgroundColor: 'white',
    height: height,
  },
  ContainerChild1: {
    flex: 2,
  },
  ContainerChild2: {
    flex: 3,
    color: 'black',
  },
  ContainerChild3: {
    flex: 4,
  },
  ContainerChild4: {
    flex: 4,
  },
});

export default LoginScreen;
