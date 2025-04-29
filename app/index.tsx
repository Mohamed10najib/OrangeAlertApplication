import { Image, StyleSheet, Platform,Text, View,ScrollView,Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Route, useRouter } from 'expo-router';

import Icon from 'react-native-vector-icons/Feather'; // Use Feather for wifi-exclamation
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';  // Importing Inter Font weights
import { useFonts } from 'expo-font'

import { Nunito_400Regular } from '@expo-google-fonts/nunito';
export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Nunito_400Regular
  });
  const router = useRouter();
  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>; // Display a loading text until fonts are ready
  }
  return (
   <SafeAreaProvider>
    <SafeAreaView>
    
    <View style={styles.Container}>
    <View style={styles.Container1} >
    <Icon name="wifi-off"  size={70} color="#FF9B17" style={styles.icon} />
    <Text style={styles.titleContainer}><Text style={styles.OrangeText}>Orange</Text><Text style={styles.AlertText}>Alert</Text></Text>
    </View>
    <View style={styles.Container2}>
      <Text style={styles.Description}>Rencontrez-vous un problème réseau ?Signalez-le dès maintenant !</Text>
    </View>
    <View style={styles.Container3}>
      
   
    <TouchableOpacity onPress={ () => router.push('/auth/login')} style={styles.button1}><Text style={styles.buttonText1}>se connecter</Text></TouchableOpacity>
    <TouchableOpacity onPress={() => router.push("/auth/register/registerFirstStep")} style={styles.button2} ><Text style={styles.buttonText2}>créer un compte</Text></TouchableOpacity>
      
          </View>
    </View>
  
    </SafeAreaView>
   </SafeAreaProvider>
  );
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleContainer: {
  
   fontSize :45,
   textAlign : 'center',
   fontWeight : 'bold',
   
  },
  Container : {
  display : 'flex',
  height :height,
  width:width,
  backgroundColor:'black'
  },
  Container1 : {
    flex :3,
    
   justifyContent: 'flex-end',
   
    
    },
    icon :{
 
 marginBottom :30,
  marginLeft :'auto',
    marginRight :'auto'

    },
  Container2 : {
    flex :1,
     
     
     fontSize :18,
      alignItems :'center',
      justifyContent :'center'
      },
      buttonText1 :{
      color :'#191920',
      fontWeight :'bold',
      fontFamily: 'Nunito_400Regular',
      textTransform: 'uppercase',
      },
      buttonText2 :{
      color :'#FFA500',
      fontWeight :'bold',
      fontFamily: 'Nunito_400Regular',
      textTransform: 'uppercase',
      
      
      },
  Container3 : {
    flex :3,
     justifyContent :'center'
     
        },
  AlertText: {
  
    color :'white',
   }, 
   OrangeText: {
  
    color :'#FF9B17',
   },
   Description:{
    fontSize :18,
    color : '#BABABA',
    textAlign : 'center',
    marginTop :20,
    fontFamily: 'Inter_400Regular',
    paddingLeft :10,
    paddingRight :10
   },
   button1 : {
    backgroundColor: '#FF9B17', // Background color
    paddingVertical: 12, // Vertical padding
    width :width-60, // Horizontal padding
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    marginTop :10,
    marginLeft :'auto',
    marginRight :'auto',
    borderColor :"orange",
    borderStyle :'solid',
    borderWidth :2,
    
   },
   button2 : {
    backgroundColor: '#191920', // Background color
    width :width-60,
    borderColor :"#525D70",
    borderStyle :'solid',
    borderWidth :2,
    paddingVertical: 12,
    marginTop :10,
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    marginLeft :'auto',
    marginRight :'auto'
   },
  
 
});
