
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity,ScrollView,Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SideBar from '../../components/sideBar';
import Circle from '@/components/circle';
import Line from '@/components/line';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font'
import InputFiled from '@/components/InputFiled';
import {optionInterface} from '../../interfaces/optionInterface';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import SelectComponent from '../../components/select'
import ProblemeVoixList from '../data/ProblemeVoixList'; 
import  ProblemeDataList from '../data/ProblemeDataList'; 
import TextArea from '@/components/textArea';


import {
  
  addDeclaration,
  clearDeclarations
  
} from '../data/declarationStorage';
import DeclarationInterface from '@/interfaces/DeclarationInterface';
const CreateDecStep2 = () => {
  const router = useRouter();
  const handleClear = async () => {
    await clearDeclarations();
    console.log('All declarations have been cleared!');
  };
  const { type,adressComplet,Attitude,Aptitude,ville} = useLocalSearchParams();
  const [debitInternet,SetDebitInternet]=useState("");
  const [NatureProbleme,SetNatureProbleme]=useState("");
  const [Description,SetDescription]=useState("");
  const [TypeExact,SetTypeExact]=useState(type=="Data"?"connexion_lente":"appels_interrompus");
  const [Isopen, setOpen] = useState(false);
  const [speed,Setspeed] =useState(0);
  const [fontsLoaded] = useFonts({
       
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      });
      const NatureProblemeList = [
        { label: 'Permanent', value: 'Permanent' },
        { label: 'Temporaire', value: 'Temporaire' },
       ];
      function submitForm (){
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
        const hour = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
        const declaration:DeclarationInterface ={
          id: Date.now(),
          titre: TypeExact,
          NatureProbleme: NatureProbleme,

          description: Description,
          date: date + "," + hour,
          adressComplet: adressComplet + "",
          ville: ville + "",
          Attitude: Attitude+"" ,
          type: type + "",


          Aptitude: Aptitude+"",
          debit:speed as number  ,
          status: 'En cours',
          reponse: 'Merci pour votre signalement. Nous nous en occupons.'
        }
        addDeclaration(declaration);
        router.push('/mainPages/confirmationDec');
      }
      const [Option,SetOption]=useState("");
     
      let ListeChoix: optionInterface[] = type === "Data" ? ProblemeDataList : ProblemeVoixList;
      
       React.useEffect(() => {
        if(type === "Data"){
          SetOption('connexion_lente');
        } else {
          SetOption('appels_interrompus');
        }
      }, [type]);
      
      const typeProblems = [{label: 'Data', value: 'Data'},{label: 'Voix', value: 'Voix'}]
      if (!fontsLoaded) {
        return null; 
      }
    return (
      <>
        <SafeAreaProvider>
          <SafeAreaView>
          <ScrollView >
            
            <View style={styles.container}>
            <Header isOpen={!Isopen} openSideBar={() => { setOpen(true); }} isClosable={true} url='/mainPages/home' />
           <View style={styles.container1}>
            <View style={styles.container11}>
           <TouchableOpacity onPress={ () => {router.push(`/mainPages/createDecStep1`);}}>
           <Icon name="arrow-left" size={24} color="black" />
           </TouchableOpacity>
            </View>
            <View style={styles.container12}>
                <View style={styles.container121}><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#FFA500' borderColor='#FFA500'></Line><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#B9B9C3' borderColor='#B9B9C3'></Line><Circle color='#B9B9C3' borderColor='#B9B9C3'></Circle>
                {/* <TouchableOpacity onPress={handleClear}>
  <Text>Clear Declarations</Text>
</TouchableOpacity> */}
                </View>
                 </View>
           </View>
           <View style={styles.container2}>
            <View style ={styles.container21} ><Text style ={styles.container2Text1}>Détails du</Text><Text style ={[styles.container2Text1,styles.container2Text1Name]}> problème</Text></View>
            <Text style ={styles.container2Text2}>Sur cette page, vous pouvez ajouter plus de détails concernant votre problème.</Text>
           </View>
           <View style={styles.container3}>
        
           <SelectComponent label="Nature du problème"     options={NatureProblemeList}  setSelectedOption={SetNatureProbleme} />
           <SelectComponent label={type=="Data"?" Problèmes liés à Data":" Problèmes liés à Voix"}   options={ListeChoix}  setSelectedOption={SetTypeExact}  />
{  type=="Data"&&<InputFiled label="Débit Internet" placeholder="Entrez votre débit Internet" isForPassword={false} value={speed+""} onChangeText={(text)=>{Setspeed(parseInt(text))}} typeInput='large' mode="mode2"   editable={true}  />
}
           <TextArea label="Description du problème" placeholder="Décrivez brièvement le problème rencontré"  value={Description} onChangeText={SetDescription}    />

 </View>
           <View style={styles.container4}>
            <TouchableOpacity onPress={ () => { submitForm();}} style={styles.button1}>
                            <Text style={styles.buttonText1}>Soumettre</Text>
                          </TouchableOpacity>
          </View>
            </View>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
  
        
        {Isopen && <SideBar  closeSideBar={() => { setOpen(false); } } namePage="AjouterSignalement" />}
      </>
    );
}

export default CreateDecStep2
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
       display :'flex',flexDirection :'row'
      },
      button1: {
        backgroundColor: '#1A1A1A',
        paddingVertical: 12,
        width: width - 60,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: '#1A1A1A',
        borderStyle: 'solid',
        borderWidth: 2,
      },
      PositionBox :{
        backgroundColor :'#F7F7F7',
        width :'18%',
        height :66,
        alignItems :'center',
        justifyContent :'center',
       marginTop :13,
       borderColor :'#EFF1F9',
       borderRadius :10,
       borderWidth :1
       
      },
      container1 : {
     flex :2,
    
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
        alignItems :'flex-start'
      },
      container2 : {
        flex :2,
        
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
        flex :9,
       
       
      },
      container31 :{
        display :'flex',
        flexDirection :'row'
      },
      container4 : {
        flex :3,
       
      },
})