
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SideBar from '../../components/sideBar';
import Circle from '@/components/circle';
import Line from '@/components/line';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font'
import InputFiled from '@/components/InputFiled';
import { useRouter } from 'expo-router';
import SelectComponent from '../../components/select'
const ConfirmationDec = () => {
    const router = useRouter();
  
    const [Isopen, setOpen] = useState(false);
    

    
    
    const [fontsLoaded] = useFonts({
       
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      });
     
      if (!fontsLoaded) {
        return null; 
      }
    return (
      <>
        <SafeAreaProvider>
          <SafeAreaView>
            <View style={styles.container}>
            <Header isOpen={!Isopen} openSideBar={() => { setOpen(true); } } isClosable={true} url='/mainPages/home' titre={''} ispage={false} />
           <View style={styles.container1}>
            
            <View style={styles.container12}>
                <View style={styles.container121}><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#FFA500' borderColor='#FFA500'></Line><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line  color='#FFA500' borderColor='#FFA500'></Line><Circle color='#FFA500' borderColor='#FFA500'></Circle></View>
                 </View>
           </View>
           <View style={styles.container2}>
           <View style={styles.container21}>
           <Text style={styles.container2Text1}>Déclaration Soumise</Text>
  <Text style={styles.container2Text1}>
    avec <Text style={styles.container2Text1Name}>Succès</Text> !
  </Text>
</View>
            <Text style ={styles.container2Text2}>Merci pour votre déclaration. Nous avons bien pris en compte votre problème et nous allons le résoudre dans les plus brefs délais. Vous pouvez suivre l'évolution de votre demande dans l'espace de suivi des déclarations.</Text>
           </View>
          
          <View style={styles.container3}>
<Image
                  source={require('../../assets/images/check.png')}
                   />
          </View>
           <View style={styles.container4}>
            <TouchableOpacity onPress={ () => {router.push(`/mainPages/consulterLesDeclarations`);}} style={styles.button1}>
                            <Text style={styles.buttonText1}>Suivre ma déclaration</Text>
                          </TouchableOpacity>
          </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
  
        {/* Conditionally rendering the sidebar */}
        {Isopen && <SideBar namePage="AjouterSignalement" closeSideBar={() => { setOpen(false); }} />}
      </>
    );
}

export default ConfirmationDec
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
        display: 'flex',
      },
      container2Text1Name :{color :'orange'},
      buttonText1: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Nunito_400Regular',
        textTransform: 'uppercase',
      },
      container21 : {
       display :'flex',flexDirection: 'column',padding:10, alignItems:'center',width:'90%'
      },
      button1: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        width: width - 60,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: '#FFA500',
        borderStyle: 'solid',
        borderWidth: 2,
      },
      PositionBox :{
        backgroundColor :'#F7F7F7',
        width :'18%',
        height :64,
        alignItems :'center',
        justifyContent :'center',
       marginTop :8,
       borderColor :'#EFF1F9',
       borderRadius :10,
       borderWidth :1
       
      },
      container1 : {
     flex :1,
    
     display :'flex',
     flexDirection :'row'
      },
      container11:{
       
        flex :1,
        justifyContent :'center',
        alignItems :'center'
      },
      container12:{
        
        flex :6,
        display :'flex',
        justifyContent :'center',
        alignItems :'center'
      },
      container2 : {
        flex :3,
       
         justifyContent :'center',
        alignItems :'center'
      },
      container2Text1 : {
      
      
      
       fontFamily: 'Poppins-Bold',
       fontSize :30
      },
      container2Text2 : {
        paddingBottom :20,
        paddingRight :20,
        paddingLeft :20,
        fontSize :16,
        textAlign :'center',
        color :'#575F6E'
      },
      container121 :{
   
    width :'80%',
    height :'50%',
    display :'flex',
    flexDirection :'row',
    justifyContent :'center',
    alignItems :'center'
      },
      container3 : {
        flex :3,
       justifyContent:'center',
       alignItems:'center'
       
      },
      container31 :{
        display :'flex',
        flexDirection :'row'
      },
      container4 : {
        flex :2,
       
      },
})