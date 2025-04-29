import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import Option from './option';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SideBarProps {
  closeSideBar: Function;
  namePage:string;
}

const SideBar: React.FC<SideBarProps> = ({ closeSideBar,namePage }) => {
  const [fontsLoaded] = useFonts({
    OnriaSans: require('../assets/fonts/InriaSans-Bold.ttf'),
  });
  const router = useRouter();
  const [userName,setUserName]=useState("");
  async function  Deconnexion () {
   await AsyncStorage.setItem('token',"");
   router.push("/auth/login");
  }
    useEffect (()=>{
      const fetchUserName = async () => {
        try {
          const firstName = await AsyncStorage.getItem('firstName');
          const lastName = await AsyncStorage.getItem('lastName');
          if (userName !== null) {
            console.log('UserName:', userName);
            setUserName(firstName+" "+lastName);
          } else {
            console.log('No userName found');
          }
        } catch (e) {
          console.error('Error retrieving userName:', e);
        }
      };
  
      fetchUserName();
    },[])  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.containerChild2}>
            <View style={styles.titreConainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'orange', fontFamily: 'OnriaSans' }}>
                Orange
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'white', fontFamily: 'OnriaSans' }}>
                Alert
              </Text>
            </View>
          </View>
          <View style={styles.containerChild1}>
            <View style={styles.containerChild11}>
              <Image source={require('../assets/images/imgProfil.png')} style={{ width: 60, height: 60, borderRadius: 50 }} />
            </View>
            <View style={styles.containerChild12}>
              <Text style={{ lineHeight: 30, fontWeight: 'bold', color: '#B7B7B7' }}>Collaborateur</Text>
              <Text style={{ lineHeight: 30, fontWeight: 'medium', color: 'white' }}>{userName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity onPress={()=>{router.push("/mainPages/home")}}>
            <Option isHere={namePage=="Home"} nameOption="Home" iconName="home" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push("/mainPages/consulterLesDeclarations")}}>
            <Option isHere={namePage=="Mes signalements"} nameOption="Mes signalements" iconName="file" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push("/mainPages/createDecStep1")}}>
            <Option isHere={namePage=="AjouterSignalement"} nameOption="Ajouter un signalement" iconName="plus-circle" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Option isHere={namePage=="Notifications"} nameOption="Notifications" iconName="bell" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Option isHere={namePage=="Assistance"} nameOption="Assistance & FAQ" iconName="info" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Option isHere={namePage=="settings"} nameOption="Paramètres" iconName="settings" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Deconnexion()}}>
            <Option isHere={false} nameOption="Déconnexion" iconName="log-out" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => { closeSideBar(); }}>
          <View style={styles.ContainerIcon1}>
            <Text style={styles.ContainerIconText}>{'<'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const { width, height } = Dimensions.get('window');
const heightSidebar = height;

const styles = StyleSheet.create({
  titreConainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  Container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContainerIcon: {
    position: 'absolute',
    top: heightSidebar / 5,
    zIndex: 2000,
    left: width / 2 + width / 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContainerIcon1: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#0F090C',
    borderColor: '#212121',
    borderWidth: 2,
  },
  ContainerIconText: {
    fontSize: 18,
    color: 'orange',
    textAlign: 'center',
    lineHeight: 30,
    opacity: 0.9,
  },
  container: {
    backgroundColor: 'black',
    width: width / 2 + width / 6,
    height: heightSidebar - heightSidebar / 13,
    zIndex: 1000,
    marginBottom: heightSidebar / 14,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0.96,
    marginTop: 10,
  },
  containerChild11: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChild12: {
    flex: 5,
    justifyContent: 'center',
    padding: 10,
  },
  containerChild1: {
    backgroundColor: '#0F090C',
    display: 'flex',
    flexDirection: 'row',
    height: heightSidebar / 12,
    margin: 'auto',
    width: width / 2 + width / 8,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    opacity: 0.6,
  },
  containerChild2: {
    width: width / 2 + width / 12,
    margin: 'auto',
    height: heightSidebar / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    height: heightSidebar / 5,
    display: 'flex',
    marginTop: 10,
  },
  container2: {
    marginTop: 18,
    height: heightSidebar - heightSidebar / 4 - heightSidebar / 7,
    borderBottomRightRadius: 10,
  },
});

export default SideBar;
