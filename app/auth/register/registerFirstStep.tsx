import { StyleSheet, Text, View, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InputFiled from '../../../components/InputFiled';
import SelectComponent from '@/components/selectV2';
import Circle from '@/components/circle';
import Line from '@/components/line';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import AuthenticationService from '../../Services/ServiceImplement/AuthenticationService';
import AuthenticationServiceInterface from '../../Services/ServiceInterface/AuthenticationServiceInterface';
import Icon from 'react-native-vector-icons/Feather';

{/*import auth from '@react-native-firebase/auth';*/}

const RegisterFirstStep = () => {
    const AuthService:AuthenticationServiceInterface = new AuthenticationService();
      const router = useRouter();
      const [firstName,SetFirstName]= useState('');
      const [lastName,SetLastName]= useState('');
      const [phoneNumber,SetPhoneNumber]= useState('');
      const [email,SetEmail]= useState('');
      const [error,setErorr]=useState('');
      const [loading, setLoading] = useState(false);
      
      const [fontsLoaded] = useFonts({
            OnriaSans: require('../../../assets/fonts/InriaSans-Bold.ttf'),
          });
          const validatePhoneNumber = (input:string) => {
            const regex = /^\d{10}$/;
        
            if (regex.test(input)) {
              return true;
            } else {
              return false;
            }
          };
          function isValidEmail(email:string) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(email);
          }
          const sendCode = async () => {
            try {
             {/* const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
              console.log("✅ Code sent!");*/}

              if(firstName.trim()==""||lastName.trim()==""||!isValidEmail(email.trim())|| !validatePhoneNumber(phoneNumber.trim())){
                    if(lastName.trim()==""){
                      setErorr("Le nom ne peut pas être vide.");
                    }else if(firstName.trim()==""){
                      setErorr("Le prénom  ne peut pas être vide.");
                    }else if(!isValidEmail(email.trim())){
                    setErorr("L'email est invalide !");
                    }else {
                     setErorr('Le numéro doit contenir exactement 10 chiffres.');
                    }
              }else{
                try{
                  setLoading(true);
                  const response = await AuthService.VerificationEmailNumero(email,phoneNumber);
                  console.log('verification:', response);
                  setLoading(false);
                  if(response!="Correct"){
                    setErorr(response);
                  }else{
                    setErorr('');
                    router.push(`/auth/register/registerSecondStep?firstName=${firstName}&lastName=${lastName}&email=${email}&phoneNumber=${phoneNumber}`);
                  }
                }catch(error){
                  console.error("error fetch");
                }}

            } catch (error) {
              console.log("Erreur d'envoi:", error);
            }
          };
        
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {loading&&<View 
                 style={{position:'absolute',
                  width:"100%",
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  alignItems:"center",justifyContent:"center",
                  zIndex:1000,
                  height:"100%"}}>
                <ActivityIndicator size="large" color="orange"></ActivityIndicator>
                </View>}
        <View style={styles.Container}>
        <View style={styles.containerHeader}><TouchableOpacity onPress={()=>{router.push('/auth/login');}}><Icon name="x" size={30} color="white" /></TouchableOpacity></View>
          <View style={styles.ContainerChild1}>
            <Text style={styles.titleContainer}>
              <Text style={styles.OrangeText}>Orange</Text>
              <Text style={styles.AlertText}>Alert</Text>
            </Text>
            <View style={styles.container12}>
            <View style={styles.container121}>
            <Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#B9B9C3' borderColor='#B9B9C3'></Line><Circle color='#B9B9C3' borderColor='#B9B9C3'></Circle><Line color='#B9B9C3' borderColor='#B9B9C3'></Line><Circle color='#B9B9C3' borderColor='#B9B9C3'></Circle></View>
           </View>
          </View>
          <View style={styles.ContainerChild2}>
          
            <Text style={styles.textChild2}>
            Créez votre compte pour signaler facilement vos problèmes de réseau !
            </Text>
          </View>
          <View style={styles.ContainerChild3}>
            <Text style={{color:'red',textAlign:'center',fontFamily:"OnriaSans"}}>{error}</Text>
            <InputFiled label="Nom" placeholder="Entrez votre nom" isForPassword={false} value={lastName} onChangeText={(text)=>{SetLastName(text)}} typeInput='large' mode="mode1"   editable={true}  />
            <InputFiled label="Prénom" placeholder="Entrez votre prénom" isForPassword={false} value={firstName} onChangeText={(text)=>{SetFirstName(text)}} typeInput='large' mode="mode1"   editable={true}  />
            <InputFiled label="Email" placeholder="Entrez votre email" isForPassword={false} value={email} onChangeText={(text)=>{SetEmail(text)}} typeInput='large' mode="mode1"   editable={true}  />
            <InputFiled label="Numéro de téléphone" placeholder="Entrez votre numéro de téléphone" isForPassword={false} value={phoneNumber} onChangeText={(text)=>{SetPhoneNumber(text)}} typeInput='large' mode="mode1"   editable={true}  />
            <SelectComponent label="Département"  options={[
    { label: 'Département Commercial', value: 'Département Commercial' },{ label: 'Département Technique', value: 'Département Technique' }]}  setSelectedOption={()=>{}}  />

          </View>
          <View style={styles.ContainerChild4}>
            <View>
              <TouchableOpacity onPress={sendCode} style={styles.button1}>
                <Text style={styles.buttonText1}>Confirmer </Text>
              </TouchableOpacity>
            </View>
           
            
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default RegisterFirstStep

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 13,
  },
  containerHeader :{
    backgroundColor :'orange',
    zIndex:1000,
    position:'absolute',
    right:0,
    width:50,
    height:50,
    borderBottomLeftRadius:'70%',
    justifyContent:'center',
    alignItems :'center'
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
    backgroundColor: '#373737',
    paddingVertical: 12,
    width: width - 60,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'white',
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
    flex: 2,
    color: 'black',
  },
  ContainerChild3: {
    flex: 6,
    
    
  },
  ContainerChild4: {
    flex: 1,
  },
  container12:{
        
    flex :6,
    display :'flex',
    justifyContent :'center',
    paddingBottom :5,
    paddingTop :5,
    alignItems :'center',
   
  },
  container121 :{
    width :'80%',
    height :'50%',
    display :'flex',
    flexDirection :'row',
    justifyContent :'center',
    alignItems :'center'
      },
});
