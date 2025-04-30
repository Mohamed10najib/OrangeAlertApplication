import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

interface HeaderProps {
  isOpen: boolean;
  openSideBar: Function;
  isClosable:boolean;
  url:any;
  titre:string;
  ispage:boolean;
}

const Header: React.FC<HeaderProps> = ({ isOpen, openSideBar,isClosable,url,titre,ispage}) => {
      const router = useRouter();
   const [fontsLoaded] = useFonts({
         
          'Poppins-Bold': require('../assets/fonts/InriaSans-Bold.ttf'),
        });
  return (
    <View style={styles.container}>

      {isOpen && (
        <View style={styles.container1}>
          <TouchableOpacity onPress={() => openSideBar()}>
            <View style={styles.container11}>
              <Text style={styles.containerText1}>{'>'}</Text>
            </View>
          </TouchableOpacity>
                 </View>
      )}

      {/* Title container */}
      <View style={styles.container2}>
        
        {!ispage?<View style={styles.titleContainer}>
          <Text style={styles.orangeText}>Orange</Text>
          <Text style={styles.alertText}>Alert</Text>
        </View>:
        <View style={styles.titleContainerPage}>
          <Text style={styles.TextTitle}>{titre}</Text>
          
        </View>}
      </View>

      {/* User icon container */}
      <View style={styles.container3}>
        <TouchableOpacity onPress={() => {router.push(url)}}>
         { !isClosable? <View style={styles.container31}>
            <Icon name="user" size={30} color="black" />
           </View>:
           <Icon name="x" size={30} color="red"  />}
           
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainerPage :{

  },
  TextTitle :{
    fontSize: 20,
    textAlign: 'center',
  padding :10,
  fontFamily :'Poppins-Bold',
  marginTop :10,
  paddingLeft :10,
  paddingRight:10

  },
  container11: {
    width: 30,
    height: 30,
    backgroundColor: '#6B6B6B',
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
  },
  container31: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  container2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    color: '#000000',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orangeText: {
    color: '#FF9B17',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerText1: {
    fontSize: 18,
    color: 'white',
  },
});
