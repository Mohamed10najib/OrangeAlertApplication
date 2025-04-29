import { StyleSheet, Text, View, Dimensions, TouchableOpacity ,Image} from 'react-native';
import React, { useState ,useRef,useEffect} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import Circle from '@/components/circle';
import Line from '@/components/line';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

const RegisterSecondStep = () => {
  const { firstName, lastName, email, phoneNumber } = useLocalSearchParams();

    const [code, setCode] = useState(["", "", "", ""]);
    const inputs = useRef<Array<TextInput | null>>([]);
    const router = useRouter();
    const [fontsLoaded] = useFonts({
      OnriaSans: require('../../../assets/fonts/InriaSans-Bold.ttf'),
    });
const [confirm, setConfirm] = useState<any>(null);
useEffect(() => {
  {/*const subscriber = auth().onAuthStateChanged(user => {
    if (user) {
      // ✅ Navigate to next step or show success message
      router.push('/auth/register/registerThirdStep' as Route);
    }
  });
  return subscriber;*/} 
}, []);
{/*const confirmCode = async () => {
  const fullCode = code.join(""); 
  if (confirm) {
    try {
      await confirm.confirm("929292");
      console.log("✅ Code verified!");
router.push('/auth/login')   
 } catch (error) {
      console.log("❌ Invalid code.", error);
    }
  } else {
    console.log("Please enter the 4-digit code.");
  }
};*/}
const handleChange = (text: string, index: number) => {
  if (/^\d$/.test(text)) {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (index < 3) {
      inputs.current[index + 1]?.focus();
    }
  } else if (text === "") {
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
  }
};
    

  return (
    <SafeAreaProvider>
      <SafeAreaView>
       <View style={styles.containerHeader}><TouchableOpacity onPress={()=>{router.push('/auth/login');}}><Icon name="x" size={30} color="white" /></TouchableOpacity></View>
        
        <View style={styles.Container}>
          <View style={styles.ContainerChild1}>
            <Text style={styles.titleContainer}>
              <Text style={styles.OrangeText}>Orange</Text>
              <Text style={styles.AlertText}>Alert</Text>
            </Text>
            <View style={styles.container12}>
                <View style={styles.container121}><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#FFA500' borderColor='#FFA500'></Line><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#B9B9C3' borderColor='#B9B9C3'></Line><Circle color='#B9B9C3' borderColor='#B9B9C3'></Circle></View>
           </View>
          </View>
          <View style={styles.ContainerChild2}>
          
           <View style={styles.container12}>
            <View style={styles.CheckCodeBox}>
                <Text style={styles.star}>*</Text>
                <Text style={styles.star}>*</Text>
                <Text style={styles.star}>*</Text>
                <Text style={styles.star}>*</Text>
            </View>
           </View>
            <Text style={styles.textChild2}>
            Entrez le code pour continuer
            </Text>
            <Text style={styles.textDescription}>Entrez le code reçu pour compléter votre inscription.</Text>
          </View>
          <View style={styles.ContainerChild3}>
            
          {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => inputs.current[index] = ref}
          style={styles.inputCode}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          placeholder="•"
          placeholderTextColor="#ABAFB1"
        />
      ))}
            
            
         
          </View> 
           <View style={styles.ContainerChild4}>
                      <View>
                        <TouchableOpacity onPress={()=>{ 
                         router.push({
                          pathname: '/auth/register/registerThirdStep',
                          params: {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phoneNumber: phoneNumber
                          }
                          
                        });
                        }} style={styles.button1}>
                          <Text style={styles.buttonText1}>Confirmer</Text>
                        </TouchableOpacity>
                        <Text style ={styles.RecCode}>J'ai pas recu le code</Text>
                      </View>
                      </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default RegisterSecondStep;
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
    paddingLeft: 40,
    paddingRight: 40,
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
    flex: 2,
    display :'flex',
    flexDirection :'row',
    alignItems :'center',
    justifyContent :'center'
    
  },
  ContainerChild4: {
    flex: 4,
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
        marginTop :20,
        borderRadius :10,
        borderWidth :4,
        borderColor :'green',
        display :'flex',
        flexDirection :'row',
        justifyContent :'center',
        alignItems :'center'
       
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
        width :200,
        marginLeft :30,
        margin :6,
        color :"#808080"
        
      },
      RecCodeText : {
       
      }
});
