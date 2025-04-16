

import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView ,ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SideBar from '../../components/sideBar';

import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font'
import Declaration from '@/components/Declaration';
import DeclarationInterface from '@/interfaces/DeclarationInterface';
import { useRouter } from 'expo-router';
import FilterComponent from '../../components/filterComponent';
import {
  
  getDeclarations,
  
} from '../data/declarationStorage';
import SearchInput from '@/components/searchInput';
const ConsulterLesDeclarations = () => {
   
    const router = useRouter();
    const [VilleFilter,SetVilleFilter] = useState("Tout");
    const [DateFilter,SetDateFilter] = useState("Tout");
    const [ProblemeFilter,SetProblemeFilter] = useState("Tout");
    const [NatureFilter,SetNatureFilter] = useState("Tout");
    const [isLoading,setLoading]=useState(true);
    const [Isopen, setOpen] = useState(false);
    const [IsopenFilter, setopenFilter] = useState(false);
    const [declarations, setDeclarations] = useState<DeclarationInterface[]>([]);
    const [declarationsBackUp, setDeclarationsBackUp] = useState<DeclarationInterface[]>([]);
   function  openFilterFunction () {
    console.log("before",IsopenFilter);
    const x =!IsopenFilter;
    setopenFilter(x);
    console.log("after",IsopenFilter);
    
   }
   function RestFilter () {
    setDeclarations(declarationsBackUp);
    SetDateFilter("Tout");
    SetNatureFilter("Tout");
    SetProblemeFilter("Tous");
    SetVilleFilter("Tous");
   }
   function filterFunction(ville: string, date: string, probleme: string, nature: string) {
    // Filtrer à partir des données d'origine
    let filtered = declarations;
  
    if (ville !== 'Tout') {
      filtered = filtered.filter((dec) =>
        dec.ville.toLowerCase().trim() === ville.toLowerCase().trim()
      );
      SetVilleFilter(ville);
    } else {
      SetVilleFilter("Tout");
    }
  
    if (probleme !== 'Tout') {
      filtered = filtered.filter((dec) =>
        dec.type.toLowerCase().trim() === probleme.toLowerCase().trim()
      );
      SetProblemeFilter(probleme);
    } else {
      SetProblemeFilter("Tout");
    }
  
    if (nature !== 'Tout') {
      filtered = filtered.filter((dec) =>
        dec.NatureProbleme.toLowerCase().trim() === nature.toLowerCase().trim()
      );
      SetNatureFilter(nature);
    } else {
      SetNatureFilter("Tout");
    }
  
    if (date !== 'Tout') {
      // Exemple : filtrer par date selon tes règles ("Aujourd’hui", "Cette semaine", etc.)
      SetDateFilter(date);
      // Tu peux appliquer un filtre par date ici si nécessaire
    } else {
      SetDateFilter("Tout");
    }
  
    // Mettre à jour les données filtrées
    setDeclarations(filtered);
  
    // Fermer le filtre
    setopenFilter(false);
  
    console.log("Filtres appliqués:", ville, date, probleme, nature);
  }
    React.useEffect(() => {
      // Get all declarations when the component mounts
      const fetchDeclarations = async () => {
        const data = await getDeclarations();
        setDeclarations(data);
        setDeclarationsBackUp(data);
        setLoading(false);
      };
  
      fetchDeclarations();
    }, []);
    
   
    const [fontsLoaded] = useFonts({
       
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-semibold' :require('../../assets/fonts/Poppins-SemiBold.ttf')
      });
      
      
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
              <View style={styles.container12} >
                <View><Text style={styles.textTitle}>Mes déclarations</Text></View>
                <TouchableOpacity onPress={()=>{}}>
                <View style={styles.boxFilter}><TouchableOpacity onPress={()=>{openFilterFunction()}}><Text style={styles.textFilter}> Personnaliser les résultats</Text></TouchableOpacity><Icon name="filter" size={18} color="black" style={styles.IconFilter} /></View>
                </TouchableOpacity>
                </View>
           </View>
          
          {isLoading?
          <View style={styles.container2}>
          <ActivityIndicator size="large" color="orange" />
          </View>
          : ( declarations.length==0?<View style={styles.container2}>
            <Text>Aucune declaration</Text>
           <TouchableOpacity onPress={()=>{RestFilter()}}><Text style = {{color:'orange',fontWeight :'bold'}}>Rest Filter</Text></TouchableOpacity>
            </View>:
          <View style={styles.container2}>
           <ScrollView 
    style={{ flex: 1,  }}
    contentContainerStyle={{ paddingBottom: 20, width: width,display:'flex' ,alignItems:'center' }}
  >
   <View style={styles.container21}>
   {IsopenFilter&&<FilterComponent closeFilter={setopenFilter} filterFunction={filterFunction} lockAttribute={IsopenFilter} ProblemeFilter={ProblemeFilter} NatureFilter={NatureFilter} VilleFilter={VilleFilter} DateFilter={DateFilter}></FilterComponent>}
  {
  declarations.map((declarationElement,index)=>(
<TouchableOpacity key={index} onPress={ () => {router.push({
  pathname: '/mainPages/detailsDeclaration/[id]',
  params: { id: declarationElement.id }
});}} ><Declaration declaration={declarationElement}/></TouchableOpacity>
))
  }
  
</View>

</ScrollView>       
  </View>)}
  <SearchInput></SearchInput>
 </View>

          </SafeAreaView>
        </SafeAreaProvider>
  
        
        {Isopen && <SideBar namePage="Mes signalements" closeSideBar={() => { setOpen(false); }} />}
      </>
    );
}

export default ConsulterLesDeclarations
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
        display: 'flex',
      },
      boxFilter :{
display :'flex',
        flexDirection :'row'
      },
      textTitle :{fontWeight :'semibold',

        fontFamily:'Poppins-Bold',
        fontSize:16
      },
      textFilter :{
        fontSize:10,
        fontWeight :'semibold',
        fontFamily:'Poppins-semibold',
        color :'orange',
        paddingTop:7,
        
      },
      IconFilter : {
        color :'orange',
        paddingTop:7,},
      
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
     justifyContent :'flex-start',
   
      },
      container11:{
       
        flex :1,
        justifyContent :'flex-start',

        alignItems :'flex-start',
        paddingLeft :18
      },
      container12:{
       
        flex :2,
        display :'flex',
        justifyContent :'space-between',
        alignItems :'center',
        flexDirection :'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop :15
       

      },
      container2 : {
        flex :8,
      paddingBottom : 10,
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
      
})