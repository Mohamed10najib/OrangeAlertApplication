import { StyleSheet, Text, View, Dimensions, TouchableOpacity,Image ,ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InputFiled from '../../../components/InputFiled';
import Feather from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import Circle from '@/components/circle';
import Line from '@/components/line';
import AuthenticationService from '../../Services/ServiceImplement/AuthenticationService';
import AuthenticationServiceInterface from '../../Services/ServiceInterface/AuthenticationServiceInterface';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
const RegisterThirdStep = () => {
  const AuthService:AuthenticationServiceInterface = new AuthenticationService();
  const { firstName , lastName, email, phoneNumber } = useLocalSearchParams();
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password ,setPassword] = useState("");
    const [passwordVer ,setPasswordVer] = useState("");
    const router = useRouter();
    const [error,setError]=useState("");
    const [fontsLoaded] = useFonts({
    OnriaSans: require('../../../assets/fonts/InriaSans-Bold.ttf'),
  });
  function validerMotDePasse(motDePasse:string) {
    const regexMotDePasse = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regexMotDePasse.test(motDePasse);
  }
  const handleRegister= async () => {
   if(!validerMotDePasse(password) || password!=passwordVer || !checked){
       if(!validerMotDePasse(password)){
        setError("Le mot de passe est invalide !");
       }else if(password!=passwordVer){
        setError("Le mot de passe et sa confirmation ne correspondent pas !");
       }else{
        setError("Vous devez accepter les conditions d'utilisation et la politique de confidentialité.");
       }
   }else{
    try {
      setLoading(true);
      console.log( firstName, lastName, email, phoneNumber,password);
      const response = await AuthService.register({
        firstName: (firstName as string).trim(),
        lastName: (lastName as string).trim(),
        email: (email as string).trim(),
        phoneNumber: (phoneNumber as string).trim(),
        password: (password as string).trim(),
      });
      setLoading(false);
      console.log('SingUp in successfully:', response);
      router.push('/auth/register/registerConfirmation');
    } catch (err) {
      console.error(err);
    }
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
       <View style={styles.containerHeader}><TouchableOpacity onPress={()=>{router.push('/auth/login');}}><Icon name="x" size={30} color="white" /></TouchableOpacity></View>
        <View style={[styles.Container,loading?{}:{}]}>
          <View style={styles.ContainerChild1}>
            <Text style={styles.titleContainer}>
              <Text style={styles.OrangeText}>Orange</Text>
              <Text style={styles.AlertText}>Alert</Text>
            </Text>
            <View style={styles.container12}>
                <View style={styles.container121}><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#FFA500' borderColor='#FFA500'></Line><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#FFA500' borderColor='#FFA500'></Line><Circle color='#FFA500' borderColor='#FFA500'></Circle></View>
           </View>
          </View>
          <View style={styles.ContainerChild2}>
          
           <View style={styles.container12}>
            <View >
               <Image source={require('../../../assets/images/Lock.png')}
                                 style={{ width: 100, height: 100 }} />
            </View>
           </View>
            <Text style={styles.textChild2}> Créer un mot de passe</Text>
            <Text style={styles.textDescription}>Choisissez un mot de passe sécurisé pour protéger votre compte.</Text>
          </View>
          <View style={styles.ContainerChild3}>
          <View style={styles.ContainerChild31}>
            <Text  style={{color:'red',textAlign:'center',fontFamily:"OnriaSans"}}>{error}</Text>
          <InputFiled label="Mot de passe" placeholder="Entrez votre mot de passe" isForPassword={true} value={password} onChangeText={(text)=>{setPassword(text)}} typeInput='large' mode="mode1"   editable={true} />
          <InputFiled label="Confirmez le mot de passe" placeholder="Confirmez votre mot de passe" isForPassword={true} value={passwordVer} onChangeText={(text)=>{setPasswordVer(text)}} typeInput='large' mode="mode1"   editable={true} />
          <View style={styles.Condition}>
          <View style={styles.checkContainer}>
            <TouchableOpacity
                  onPress={() => setChecked(!checked)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 10,
                  }}
                >
                 {!checked? <View
                    style={{
                      height: 20,
                      width: 20,
                      borderWidth: 1,
                      borderColor: '#808080',
                      backgroundColor: checked ? 'orange' : '#fff',
                    }}
                  />:
                  <View style={{borderWidth: 1, height: 20,
                    width: 20,
                    borderColor: '#808080',}}>
                  <Feather name="check" size={20} color="green" />
                </View>}
                </TouchableOpacity>
          </View>

            <Text style ={styles.RecCode}>J'accepte les conditions d'utilisation et
          la politique de confidentialité.</Text>
          
          </View>
          </View>
          
          </View> 
           <View style={styles.ContainerChild4}>
                      <View>
              
                        <TouchableOpacity onPress={ () => {handleRegister();}} style={styles.button1}>
                          <Text style={styles.buttonText1}>Créer un compte</Text>
                        </TouchableOpacity>
                        
                      </View>
                      </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default RegisterThirdStep

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
    borderTopLeftRadius:'50%',
    borderBottomLeftRadius:'50%',
    justifyContent:'center',
    alignItems :'center'
  },
  ContainerChild31 :{ 
    display :'flex',
    justifyContent :'space-around',
    alignItems :'center',
    width :"100%",
    height :'100%'
},
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
    fontSize: 38,
    
    paddingLeft: 30,
    paddingRight: 30,
   
    textAlign: 'center',
    fontFamily: 'OnriaSans',
   
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
  checkContainer : {
  },
  ContainerChild3: {
    flex: 3,
    display :'flex',
      width :"100%",
    alignItems :'center',
    justifyContent :'center',
     
    
  },
  ContainerChild4: {
    flex: 2,
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
      CheckCodeBox : {
        width :150,
        height :60,
        backgroundColor :'white',
       
        borderRadius :10,
        borderWidth :4,
        borderColor :'green',
        display :'flex',
        flexDirection :'row',
        justifyContent :'center',
        alignItems :'center',
       
       
      },
      star : {
        marginLeft :10,
        marginRight:10,
        marginTop:5,
        fontWeight :'bold',
        fontSize :30,
        color :'green'
    
      },
      BoxCode : {
        width :60,
        height:60,
        borderColor :'#808080',
        borderWidth :2,
       
        borderRadius :5

      },
      inputCode : {
   width:60,
   height :60,
   justifyContent:'center',
   marginLeft :10,
   marginRight :10,
   textAlign :'center',
   fontSize :30,
   fontWeight :'bold',
   borderWidth :2,
   borderColor :'#808080',
   

      },
      textDescription :{
        textAlign :'center',
        color :'#808080',
     borderRadius :10,

      },
      RecCode :{
        width :350,
       padding :6,
        
        color :"#808080"
        
      },
      RecCodeText : {
       
      },
      Condition : {
        display :'flex',
        flexDirection :'row',
        alignItems :'center',
        justifyContent :'space-around'
      }
});
