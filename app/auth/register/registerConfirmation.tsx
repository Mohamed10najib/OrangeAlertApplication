import { StyleSheet, Text, View, Dimensions, TouchableOpacity,Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';

const RegisterConfirmation = () => {
    const [fontsLoaded] = useFonts({
          OnriaSans: require('../../../assets/fonts/InriaSans-Bold.ttf'),
          Nunito_400Regular :require('../../../assets/fonts/InriaSans-Bold.ttf')
        });
  return (
    <SafeAreaProvider>
    <SafeAreaView>
      <View style={styles.Container}>
        <View style={styles.ContainerChild1}>
          <Text style={styles.titleContainer}>
            <Text style={styles.OrangeText}>Orange</Text>
            <Text style={styles.AlertText}>Alert</Text>
          </Text>
         
        </View>
        <View style={styles.ContainerChild2}>
        
          <Text style={styles.textChild2}>
          Votre compte a été créé avec succès !
          </Text>
       <Text style={styles.textDescription}>Vous pouvez maintenant accéder à votre espace et commencer à signaler vos problèmes de réseau.</Text>
          
        </View>
        <View style={styles.ContainerChild3}>
          <Image source={require('../../../assets/images/check.png')}
                                           style={{ width: 180, height: 180 }} />

        </View>
        <View style={styles.ContainerChild4}>
          <View>
            <TouchableOpacity onPress={ () => {router.push('/auth/login')}} style={styles.button1}>
              <Text style={styles.buttonText1}>Commencez maintenant</Text>
            </TouchableOpacity>
          </View>
         
          
        </View>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default RegisterConfirmation

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 13,
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
    color: '#373737',
    fontWeight: 'bold',
    fontFamily: 'Nunito_400Regular',
    textTransform: 'uppercase',
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 12,
    width: width - 60,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#373737',
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
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
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
    flex: 3,
    justifyContent :'center',
    alignItems :'center'
    
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
      textDescription :{
        textAlign :'center',
        color :'#808080',
     borderRadius :10,
   padding :8
      },
});
