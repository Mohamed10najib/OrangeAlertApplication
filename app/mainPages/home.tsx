import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import SideBar from '../../components/sideBar';
import { useRouter } from 'expo-router';

const home = () => {
  const [Isopen, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
          <Header isOpen={!Isopen} openSideBar={() => { setOpen(true); }} isClosable={false}  url='/mainPages/home'/>

            <View style={styles.Container2}>
              <View style={styles.Container21}>
                <Image
                  source={require('../../assets/images/phone.png')}
                  style={{ width: 120, height: 120 }} />
              </View>
              <View style={styles.Container22}>
                <Text style={styles.ContainerText22}>Bienvenue sur notre application de signalement réseau !</Text>
              </View>
              <View style={styles.Container23}>
                <Text style={styles.ContainerText23}>
                  Signalez les zones à faible couverture et suivez l'évolution de votre demande en temps réel. Profitez d'une expérience fluide sur Android et iOS. Ensemble, améliorons la qualité du réseau !
                </Text>
              </View>
            </View>

            <View style={styles.Container3}>
              {/* Ensure these are correctly wrapped in Text components */}
              <TouchableOpacity style={styles.button1} onPress={ () => router.push('/mainPages/createDecStep1')}>
                <Text style={styles.buttonText1}>Faire une déclaration</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={ () => router.push('/mainPages/consulterLesDeclarations')}>
                <Text style={styles.buttonText2}>Consulter vos déclarations</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      {/* Conditionally rendering the sidebar */}
      {Isopen && <SideBar namePage="Home" closeSideBar={() => { setOpen(false); }} />}
    </>
  );
};

export const unstable_settings = {
  initialRouteName: 'home',
};

export const screenOptions = {
  gestureEnabled: false,
};

export default home;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
    display: 'flex',
  },
  Container2: {
    flex: 4,
  },
  Container1: {
    flex: 1,
  },
  Container3: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container21: {
    flex: 2,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container22: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContainerText22: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  Container23: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 28,
    paddingRight: 28,
  },
  ContainerText23: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'medium',
    color: '#545454',
    lineHeight: 30,
  },
  button1: {
    backgroundColor: '#FF9B17', // Background color
    paddingVertical: 12, // Vertical padding
    width: width - 60, // Horizontal padding
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  button2: {
    backgroundColor: 'white', // Background color
    width: width - 60,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Nunito_400Regular',
    textTransform: 'uppercase',
  },
  buttonText2: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Nunito_400Regular',
    textTransform: 'uppercase',
  },
});
