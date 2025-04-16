import { StyleSheet, Text, TouchableOpacity, View,Animated } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import {  Easing } from 'react-native';
import { useEffect, useRef } from 'react';
interface FilterComponentProps {
  
    closeFilter: (x:boolean) => void;
    filterFunction: (ville:string,date:string,probleme:string,nature:string)=>void;
    lockAttribute:boolean;
    ProblemeFilter:string;
    NatureFilter:string;
    VilleFilter:string;
    DateFilter:string;

  }
const FilterComponent: React.FC<FilterComponentProps> = ({ closeFilter,filterFunction ,lockAttribute,ProblemeFilter,NatureFilter,VilleFilter,DateFilter}) => {
    
   

 

    const optionsVille:any =["Tout","Casablanca","Taroudant"];
    const optionsDate:any =["Tout","Aujourd’hui","Cette semaine","Ce mois"];
    const optionsProbleme:any =["Tout","Data","Voix"];
    const optionsNature:any =["Tout","Temporaire","Permanent"];
    const[ville,setVille]=useState("Tout");
    const[Date,setDate]=useState("Tout");
    const[Probleme,setProbleme]=useState("Tout");
    const[Nature,setNature]=useState("Tout");
    const [AnimatedState,SetAnimatedState] =useState(true);
    const slideAnim = useRef(new Animated.Value(600)).current; 
    

    
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: AnimatedState?0:600, 
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      
    }, [AnimatedState]);
    const [fontsLoaded] = useFonts({
               
                'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
              });
              
              
              if (!fontsLoaded) {
                return null; 
              }
  return (
<Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
<View style={styles.container1}><Text style={styles.container1Text}>🎯 Affiner ma recherche</Text><TouchableOpacity onPress={()=>{closeFilter(!lockAttribute);SetAnimatedState(!AnimatedState)}}><Icon name="x" size={24} color="black" /></TouchableOpacity></View>
      <View style={styles.container2}>
      <View style={styles.container21}>
        <View style={styles.container211}><Text style = {styles.textFilter}>🏙️ Ville</Text></View>
        <View style={styles.container212}>
        <Picker  selectedValue={VilleFilter} onValueChange={setVille} style={styles.picker}>
            {optionsVille.map((option:any, index:any) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.container21}>
        <View style={styles.container211}><Text style = {styles.textFilter}>📅 Date de l'alerte</Text></View>
        <View style={styles.container212}>
       <Picker  selectedValue={DateFilter} onValueChange={setDate} style={styles.picker}>
            {optionsDate.map((option:any, index:any) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.container21}>
        <View style={styles.container211}><Text style = {styles.textFilter}>⚡Type de Problème</Text></View>
        <View style={styles.container212}>
        <Picker  selectedValue={ProblemeFilter} onValueChange={setProbleme} style={styles.picker}>
            {optionsProbleme.map((option:any, index:any) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.container21}>
        <View style={styles.container211}><Text style = {styles.textFilter}>⏳Nature du problème</Text></View>
        <View style={styles.container212}>
        <Picker  selectedValue={NatureFilter} onValueChange={setNature} style={styles.picker}>
            {optionsNature.map((option:any, index:any) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      
      
      </View>
      <View style={styles.container3}><TouchableOpacity style={styles.container31} onPress={()=>{filterFunction(ville,Date,Probleme,Nature)}}><Text style = {styles.container31Text}>Filtrer les déclarations</Text></TouchableOpacity></View>
    </Animated.View>
  )
}

export default FilterComponent

const styles = StyleSheet.create({
    container :{
        width :'100%',
        height : 600,
        backgroundColor :'#F7F7F7',
        zIndex :1000,
        margin :'auto',
        marginBottom:10,
        borderRadius :10,
        borderColor :'#F1EFEC',
        borderWidth :1,
        display :'flex'

    },
    textFilter : {fontFamily :'Poppins-SemiBold',},
    container1 :{
      flex :1 ,
       
        margin :5,
        marginLeft :10,
        marginRight :10,
        alignItems :'center',
        display :'flex',
        flexDirection :'row',
        justifyContent :'space-between'
    },
    container2 :{
      flex :8,
      
      margin :8
    },
    container1Text :{
     fontFamily :'Poppins-SemiBold',
     fontSize : 15
    },
    container21 :{
        flex:1,
        
        borderBottomColor :'#F1E7E7',
        borderBottomWidth :1
    },
    container211 :{
        flex:1,
       
        borderBottomColor :'black',
      
        justifyContent :'center'
    },
    container212 :{
        flex:1,
        
        borderBottomColor :'black',
         alignItems :'center',
        justifyContent :'center'
    },
    picker :{
        backgroundColor :'#F4F6FF',
        width :'85%',
        height :'95%',
        
   
        fontFamily :'Poppins-SemiBold',
        marginBottom :10

    },
    container3 :{
        flex :1,
       
        width :'80%',
        height :'80%',
        justifyContent :'center',
        alignItems :'center',
        margin :'auto',
        borderRadius :5
    },
    container31 : {
        backgroundColor :'orange',
        width :'100%',
        height :'80%',
        justifyContent :'center',
        alignItems :'center',
        borderRadius :5,
        
    },
    container31Text : {
      color :'white',
      fontFamily :'Poppins-SemiBold',
      fontSize:13
    }
    
})