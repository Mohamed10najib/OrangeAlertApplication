import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import Icon from 'react-native-vector-icons/Feather'; 
import DeclarationInterface from '@/interfaces/DeclarationInterface';

const Declaration : React.FC<{declaration:DeclarationInterface}> = ({declaration}) => {
    const [fontsLoaded] = useFonts({
           
            'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          });
          
          
          if (!fontsLoaded) {
            return null; 
          }
 const [NameIcon,setNameIcon] =useState("");
 const [NameIconProbleme,setNameIconProbleme] =useState("");
 const [ColorIcon,setColorIcon] =useState("");
 const [dateP, hour] = declaration.date.split(',');
function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
 const iconMap:any = {
    // Problèmes Data
    connexion_lente: 'wifi',
    coupures_internet: 'wifi-off',
    pas_acces_internet: 'x-circle',
    faible_debit: 'trending-down',
    app_site_non_charge: 'alert-circle',
    probleme_data_mobile: 'smartphone',
    ping_eleve: 'activity',
    deconnexion_streaming_jeu: 'video-off',
    problemes_apn: 'settings',
    donnees_epuisees: 'loader',
    pas_partage_connexion: 'share-2',
    signal_wifi_faible: 'wifi',
    debit_limite: 'minus-circle',
    probleme_telechargement: 'download-cloud',
    blocage_sites_apps: 'slash',
  
    // Problèmes Voix
    appels_interrompus: 'phone-off',
    pas_appels: 'x-octagon',
    reseau_indisponible: 'alert-triangle',
    pas_entendu: 'volume-x',
    qualite_son_mediocre: 'volume-2',
    echo_grésillement: 'volume',
    numero_non_joignable: 'phone-missed',
    connexion_appel_lente: 'clock',
    appels_pas_aboutis: 'x-circle',
    appels_sans_sonnerie: 'bell-off',
    repondeur_auto: 'voicemail',
    numero_bloque: 'slash',
    probleme_internationaux: 'globe',
    pas_sms_envoyer: 'message-circle',
    erreur_reseau_appel: 'alert-octagon',
  };
  
  React.useEffect(() => {
    const icon = iconMap[declaration.titre] || 'help-circle';
    setNameIconProbleme(icon);
  }, [declaration.titre]);
    
       React.useEffect(() => {
        if(declaration.status === "En cours"){
            setNameIcon('clock');
            setColorIcon('#DAA400');
          
        } else if(declaration.status === "Résolus") {
            setNameIcon('check-circle');
            setColorIcon('#07864B');
          
        }
        
        

      }, [declaration.status]);
  return (
    <View style ={styles.container}>
     <View style ={styles.container1}>
     <View style ={styles.container11}>
        <View style ={styles.container111}>
        <Icon name={NameIconProbleme} size={30} color="#3C3D37" />
         </View>
        <View style ={styles.container112}>
            <Text style ={styles.container112Text1}>{capitalizeFirstLetter(declaration.titre.toUpperCase().replace("_"," "))}</Text>
            <Text style ={styles.container112Text2}>{capitalizeFirstLetter(declaration.ville.toUpperCase())}</Text>
        </View>
     </View>
     <View style ={styles.container12}>
     <View style ={[styles.container121,{backgroundColor:ColorIcon, borderTopLeftRadius :4 ,
       borderBottomLeftRadius :4,flexDirection :'row'}]}>
        <Icon name={NameIcon} size={20} color="white" />
      <Text style = {styles.container121Text }>{declaration.status}</Text>
     </View>
     </View>
     </View>
     <View style ={styles.container2}><Text style ={styles.DateText}>{dateP}</Text><Text style ={styles.HourText}>{hour}</Text></View>
    </View>
  )
}

export default Declaration

const styles = StyleSheet.create({
    container :{
        width :350,
        height : 100,
        backgroundColor :'#F7F7F7',
        marginTop:20,
        borderColor :'#F1EFEC',
        borderRadius :10,
        borderWidth :1
    },
    DateText :{fontWeight :'medium',fontSize:12,fontFamily:'Poppins-Bold',color:'#434545'},
    HourText :{fontWeight :'medium',fontSize:12,fontFamily:'Poppins-Bold',color:'#434545',paddingRight:10},
    container1 :{
        flex :2,
       
        
        display :'flex',
        flexDirection :'row'
    },
    container112Text1 :{fontWeight :'semibold',fontSize:14,fontFamily:'Poppins-Bold'},
    container112Text2 :{fontWeight :'medium',fontSize:12,fontFamily:'Poppins-Bold',color:'#434545'},
    container2 :{
        flex :1,
        
        justifyContent :'space-between',
        alignItems :'center',
        paddingLeft :10,
        flexDirection:'row'
        
    },
    container11 : {
      flex:5,
      
      flexDirection :'row'
    },
    container12 : {
        flex:2,
        justifyContent :'center'
    },
    container121:{
       
        height :'40%',
        justifyContent :'center',
        alignItems :'center',
      
       
        fontWeight :'semibold',
fontFamily:'Poppins-Bold'


    },
    container121Text : {
        color :'white',
        marginLeft:8
    },
    container111 :{
  flex :1,
  backgroundColor :'#F1EFEC',
  borderRadius :'50%',
  margin:3,
  justifyContent :"center",
  alignItems :'center'
    },
    container112 :{
        flex :3,
       
        paddingLeft :10,
        paddingTop :10
       
    },


})