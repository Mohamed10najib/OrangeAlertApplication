import { StyleSheet, Text, TextInput, TouchableOpacity, View,Animated  ,Dimensions} from 'react-native'
import React, { useState ,useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';

const SearchInput = () => {
    const [isTyping,setIsTyping] = useState(false);
    const [isOpenSearch,setOpenSearch] = useState(false);
    const slideAnim = useRef(new Animated.Value(100)).current;
    const slideAnim1 = useRef(new Animated.Value(100)).current;
    const  [searchText , setTextSearch] = useState('');
    
    React.useEffect(() => {
        Animated.timing(slideAnim, {
          toValue: isOpenSearch ? 0 : 100, // 0 = visible, 100 = caché (slide vers le bas)
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(slideAnim1, {
            toValue: !isOpenSearch ? 0 : 100, // 0 = visible, 100 = caché (slide vers le bas)
            duration: 300,
            useNativeDriver: true,
          }).start();
      }, [isOpenSearch]);
     function  handleChange (){
       
         setTextSearch(searchText);
         console.log(searchText);
     }
      const [fontsLoaded] = useFonts({
                   
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      
      
      if (!fontsLoaded) {
        return null; 
      }
  return (
   <> 
   {isOpenSearch?<Animated.View
          style={[
            styles.container,
            isTyping ? styles.isTypingStyle : styles.isNotTypingStyle,
            { transform: [{ translateY: slideAnim }] },
          ]}>
      <View style ={styles.container1}><Icon name="search" size={24} color="white" /></View>
      <View style ={styles.container2}>
        <TextInput style ={styles.container2Input} value={searchText}
        onChangeText={(text)=>{setTextSearch(text)}} placeholder='Rechercher une déclaration...' placeholderTextColor="white" onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}  ></TextInput>
      </View>
      <View style ={styles.container3}>
      <TouchableOpacity onPress={()=>{setOpenSearch(false)}}> 
        <Icon style={styles.iconX} name="x" size={28} color="white" />
        </TouchableOpacity>
      </View>
      
    </Animated.View> :<TouchableOpacity onPress={()=>{setOpenSearch(true)}}><Animated.View style = {[styles.searchView ,    { transform: [{ translateY: slideAnim1 }] },]}><Icon name="search" size={24} color="white" /></Animated.View></TouchableOpacity> }
    
    </>
  )
}

export default SearchInput;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container : {
        width :"90%",
       
       
        height :60,
        backgroundColor :'#FFA500',
        borderRadius :50,
        
        justifyContent :'space-around',
        alignItems :'center',
        borderColor :'#FCB454',
        borderWidth :2,
       display :'flex',
       flexDirection :'row',
       
        
    
    
    },
    iconX : {
        borderLeftWidth :1.4,
        borderLeftColor :'white',
        padding :6
    },
    isTypingStyle : {
        position :'absolute',
        bottom:350,
        left :20,
    },
    isNotTypingStyle : {
        position :'absolute',
        bottom:20,
        left :20,
    },
    container1 : {
flex :1,

height :'100%',
borderBottomLeftRadius:'50%',
borderTopLeftRadius:'50%',
borderRightWidth :0,
borderRightColor :'white',
justifyContent :'center',
alignItems :'center'
    },
    container2 : {
        flex :4
    },
    container3 : {
        flex :1,
        borderBottomRightRadius:'50%',
borderTopRightRadius:'50%',
height :'100%',

justifyContent :'center',
alignItems :'center'
    },
    container2Input :{
        color :'white',
        paddingLeft :10,
        fontFamily :'Poppins-SemiBold',
        fontSize :13
    },
    searchView :{
        width :60,
        height :60,
        backgroundColor :'#FFA500',
        position :'relative',
        left : width/2+ width/3-10 ,
        bottom : height/16,
        justifyContent :'center',
        alignItems :'center',
        borderRadius :'50%',
    }
})