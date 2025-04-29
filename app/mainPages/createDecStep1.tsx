
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SideBar from '../../components/sideBar';
import Circle from '@/components/circle';
import Line from '@/components/line';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font'
import InputFiled from '@/components/InputFiled';
import { useRouter } from 'expo-router';
import SelectComponent from '../../components/select';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateDecStep1 = () => {
  
    const [errorMsg, setErrorMsg] = useState("");
    const [userName,setUserName]=useState("");
    useEffect (()=>{
      const fetchUserName = async () => {
        try {
          const userName = await AsyncStorage.getItem('firstName');
          if (userName !== null) {
            console.log('UserName:', userName);
            setUserName(userName);
          } else {
            console.log('No userName found');
          }
        } catch (e) {
          console.error('Error retrieving userName:', e);
        }
      };
  
      fetchUserName();
    },[])  
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      let loc = await Location.getCurrentPositionAsync({});
      
      SetAttitude(loc.coords.latitude + "");  
      SetAptitude(loc.coords.longitude + ""); 
      console.log(loc.coords.latitude,loc.coords.longitude)
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
  
      if (reverseGeocode.length > 0) {
        const locationInfo = reverseGeocode[0];
        const fullAddress = `${locationInfo.formattedAddress || ''}`;
        if(AddressComplet.trim()==""){
           SetAddressComplet(fullAddress);
        }
        console.log(fullAddress);
      }
    };
    const router = useRouter();
  
    const [Isopen, setOpen] = useState(false);
    const [Attitude,SetAttitude]=useState("");
    const [Aptitude,SetAptitude]=useState("");
    const [AddressComplet,SetAddressComplet]=useState("");
    const [TypeProbleme,SetTypeProbleme]=useState("Data");
    const [ville,SetVille]=useState("casablanca");
    const [msgErrorLocalisation,SetmsgErrorLocalisation]=useState(false);
    const [msgErrorAddress,SetmsgErrorAddress]=useState(false);


    const [isclicked,Setclicked]=useState(false);
    const [fontsLoaded] = useFonts({
       
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      });
      const moroccoCities = [
        { label: 'Casablanca', value: 'casablanca' },
        { label: 'Rabat', value: 'rabat' },
        { label: 'Marrakech', value: 'marrakech' },
        { label: 'Fes', value: 'fes' },
        { label: 'Tangier', value: 'tangier' },
        { label: 'Agadir', value: 'agadir' },
        { label: 'Meknes', value: 'meknes' },
        { label: 'Oujda', value: 'oujda' },
        { label: 'Tétouan', value: 'tetouan' },
        { label: 'Safi', value: 'safi' },
        { label: 'El Jadida', value: 'el-jadida' },
        { label: 'Nador', value: 'nador' },
        { label: 'Essaouira', value: 'essaouira' },
        { label: 'Beni Mellal', value: 'beni-mellal' },
        { label: 'Kénitra', value: 'kenitra' },
        { label: 'Khouribga', value: 'khouribga' },
        { label: 'Taza', value: 'taza' },
        { label: 'Ouarzazate', value: 'ouarzazate' },
        { label: 'Ifrane', value: 'ifrane' },
        { label: 'Taroudant', value: 'taroudant' },
      ];
      const typeProblems = [{label: 'Data', value: 'Data'},{label: 'Voix', value: 'Voix'}]
      if (!fontsLoaded) {
        return null; 
      }
    return (
      <>
        <SafeAreaProvider>
          <SafeAreaView>
            <View style={styles.container}>
            <Header isOpen={!Isopen} openSideBar={() => { setOpen(true); }} isClosable={true} url='/mainPages/home' />
           <View style={styles.container1}>
            <View style={styles.container11}>
           <TouchableOpacity onPress={ () => {router.push(`/mainPages/home`);}}>
           <Icon name="arrow-left" size={24} color="black" />
           </TouchableOpacity>
            </View>
            <View style={styles.container12}>
                <View style={styles.container121}><Circle color='#FFA500' borderColor='#FFA500'></Circle><Line color='#B9B9C3' borderColor='#B9B9C3'></Line><Circle color='#B9B9C3' borderColor='#B9B9C3'></Circle><Line color='#B9B9C3' borderColor='#B9B9C3'></Line><Circle color='#B9B9C3' borderColor='#B9B9C3'></Circle></View>
                 </View>
           </View>
           <View style={styles.container2}>
            <View style ={styles.container21} ><Text style ={styles.container2Text1}>Bonjour </Text><Text style ={[styles.container2Text1,styles.container2Text1Name]}> {userName} </Text></View>
            <Text style ={styles.container2Text2}>Ici, vous pouvez déclarer vos problèmes de réseau en toute simplicité !</Text>
           </View>
           <View style={styles.container3}>
           <InputFiled label="Adresse complète" placeholder="Ex : 45 Boulevard Zerktouni, Casablanca" isForPassword={false} value={AddressComplet}  onChangeText={SetAddressComplet} typeInput='large' mode="mode2"   editable={true}  />
          <View  style={styles.container31}>
          <InputFiled label="l’Attitude" placeholder="0" isForPassword={false} value={Attitude} onChangeText={SetAttitude} typeInput='small' mode="mode2"   editable={false} />
          <InputFiled label="l’Aptitude" placeholder="0" isForPassword={false} value={Aptitude} onChangeText={SetAttitude} typeInput='small' mode="mode2" editable={false}  />
          <View style={[styles.PositionBox,isclicked&&{borderColor:'orange'}]}><TouchableOpacity disabled={isclicked}  onPress={()=>{
            getLocation();
            Setclicked(true);
          }} ><Icon name="map-pin" size={30} color={isclicked?'orange':"gray"}   /></TouchableOpacity>   
          </View>
          </View>
           <SelectComponent label="Ville"    options={moroccoCities}  setSelectedOption={SetVille}  />
           <SelectComponent label="Type de problème" options={typeProblems}   setSelectedOption={SetTypeProbleme}  />
 </View>
           <View style={styles.container4}>
           {msgErrorLocalisation&& <Text style = {{color:'red',textAlign:'center',paddingBottom:20}}>S'il vous plaît, cliquez sur le bouton de localisation pour identifier votre position.</Text>}
           {msgErrorAddress&& <Text style = {{color:'red',textAlign:'center',paddingBottom:20}}>S'il vous plaît, entrez votre adresse.</Text>}

            <TouchableOpacity onPress={ () => {
              if(!isclicked || AddressComplet.trim()==""){
                if(!isclicked){
                  SetmsgErrorLocalisation(true);
                  SetmsgErrorAddress(false);
                }else{
                  SetmsgErrorLocalisation(false);
                  SetmsgErrorAddress(true);
                }
              }else{
                router.push(`/mainPages/createDecStep2?type=${TypeProbleme}&&adressComplet=${AddressComplet}&&Attitude=${Attitude}&&Aptitude=${Aptitude}&&ville=${ville}`);
              }
              }} style={styles.button1}>
                            <Text style={styles.buttonText1}>Suivant</Text>
                          </TouchableOpacity>
          </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
  
        {/* Conditionally rendering the sidebar */}
        {Isopen && <SideBar  closeSideBar={() => { setOpen(false); } } namePage="AjouterSignalement" />}
      </>
    );
}

export default CreateDecStep1
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
        height :64,
        alignItems :'center',
        justifyContent :'center',
       marginTop :8,
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