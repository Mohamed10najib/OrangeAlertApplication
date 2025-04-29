

import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import React, { FC, useState,useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SideBar from '../../components/sideBar';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font'

import { useLocalSearchParams, useRouter } from 'expo-router';

interface  location {
    latitude:number,
    longitude:number
}
const mapPage = () => {
    const router = useRouter();
      const {Ap,At,id} = useLocalSearchParams();
      const [loading, setLoading] = useState(true);

    const [Isopen, setOpen] = useState(false);
    
    
   
    const [fontsLoaded] = useFonts({
       
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      });
      
      
      if (!fontsLoaded) {
        return null; 
      }
       
      const  latitude:string =At as string;
      const  longitude:string =Ap as string;
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://js.arcgis.com/4.27/esri/themes/light/main.css" />
          <script src="https://js.arcgis.com/4.27/"></script>
          <style>
            html, body, #viewDiv {
              padding: 0;
              margin: 0;
              height: 100%;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <div id="viewDiv"></div>
          <script>
            require(["esri/Map", "esri/views/MapView", "esri/Graphic"], (Map, MapView, Graphic) => {
              const map = new Map({ basemap: "streets-vector" });
              const view = new MapView({
                container: "viewDiv",
                map: map,
                center: [${longitude}, ${latitude}],
                zoom: 15
              });
  
              const point = {
                type: "point",
                longitude: ${longitude},
                latitude: ${latitude}
              };
  
              const markerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              };
  
              const pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
              });
  
              view.graphics.add(pointGraphic);
            });
          </script>
        </body>
      </html>
    `;
   

    return (
      <>
        <SafeAreaProvider>
          <SafeAreaView>
            <View style={styles.container}>
            <Header isOpen={!Isopen} openSideBar={() => { setOpen(true); }} isClosable={true} url='/mainPages/home' />
           <View style={styles.container1}>
             <View style={styles.container11}>
                       <TouchableOpacity onPress={ () => {router.push({
  pathname: '/mainPages/detailsDeclaration/[id]',
  params: { id: parseInt(id as string) }
});}}>
                       <Icon name="arrow-left" size={24} color="black" />
                       </TouchableOpacity>
                        </View>
              
           </View>
          
       <Text style = {{fontSize:16,fontFamily:'Poppins-Bold',paddingLeft:20}}>Adresse affichée sur la carte</Text>
          <View style={styles.container2}>
          <View style={styles.mapContainer}>
          {loading && (
                  <View style ={styles.spinnerContainer} >
                    <ActivityIndicator size="large" color="#EFB036" />
                  </View>
                )}
      <WebView originWhitelist={['*']} source={{ html }} style={styles.webview}  onLoadStart={() => setLoading(true)} // ✅ Show spinner
                onLoad={() => setLoading(false)}/>
    </View>
   
   {/*<MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
  coordinate={{
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  }}
  title="Votre position"
>
  <View style={{
    backgroundColor: '#EFB036',
    width :50,
    height:50,
    borderRadius: '50%',
    
    
    justifyContent :'center',
    alignItems :'center',
   
  }} >
     <View style={{
    backgroundColor: 'orange',
    width :30,
    height:30,
    borderRadius: '50%',
    justifyContent :'center',
    alignItems :'center',
    
   zIndex:500
  }} >
    <View style={{
    backgroundColor: 'white',
    width :5,
    height:5,
    borderRadius: '50%',
    
   zIndex:1000
  }} ></View>
  </View>
  </View>
</Marker>
      </MapView>*/}


       
  </View>
 </View>
          </SafeAreaView>
        </SafeAreaProvider>
  
        
        {Isopen && <SideBar namePage="Mes signalements" closeSideBar={() => { setOpen(false); }} />}
      </>
    );
}

export default mapPage
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
        display: 'flex',
      },
      mapContainer: {
        width: width - 30,
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
      },
      webview: {
        flex: 1,
      },
      textTitle :{fontWeight :'semibold',

        fontFamily:'Poppins-Bold',
        fontSize:16
      },
      textFilter :{
        fontSize:10,
        fontWeight :'semibold',
        fontFamily:'Poppins-Bold',
        color :'orange',
        paddingTop:7
      },
      spinnerContainer :{
        position :'absolute',
        top :'40%',
        left :'45%',
        zIndex :1000
      },

      container2Text1Name :{color :'orange'},
      buttonText1: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Nunito_400Regular',
        textTransform: 'uppercase',
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
        margin :13,
     
         justifyContent :'center',
        alignItems :'center',
        borderRadius :8,
        borderColor :'#F5F7F8',
        backgroundColor :"#F5F7F8",
        borderWidth:1
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
      map: {
        width: '98%',
        height: '98%',
        borderRadius :8,
      }
      
})