
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/header';
import SideBar from '../../../components/sideBar';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import DeclarationInterface from '@/interfaces/DeclarationInterface';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getDeclaration } from '../../data/declarationStorage';

const DetailsDeclaration = () => {
  function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const idNumber = parseInt(id as string);
  const [Isopen, setOpen] = useState(false);
  const [SeeMoreDescription, setSeeMoreDescription] = useState(false);

  const [SeeMoreReponse, setSeeMoreReponse] = useState(false);

  const [declaration, setDeclaration] = useState<DeclarationInterface>();

  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    const fetchDeclaration = async () => {
      const data = await getDeclaration(idNumber);
      setDeclaration(data);
    };
    fetchDeclaration();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <Header
              isOpen={!Isopen}
              openSideBar={() => {
                setOpen(true);
              }}
              isClosable={true}
              url="/mainPages/home"
            />

            <View style={styles.container1}>
              <View style={styles.container11}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/mainPages/consulterLesDeclarations`);
                  }}
                >
                  <Icon name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.container2}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                  paddingBottom: 20,
                  width: width,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View style={styles.container211}>
                  <View style={styles.container2111}>
                    <View style={styles.container21111}>
                      <Icon name="wifi" size={40} color="white" />
                    </View>
                    <View style={styles.container21112}>
                      <Text style ={styles.container21112Text1} >{capitalizeFirstLetter(declaration?.ville as string)}</Text>
                      <Text style={styles.container21112Text}>{declaration?.date.split(",")[0]}</Text>
                    </View>
                  </View>

                  <View style={styles.container2112}>
                    <Text style={styles.container2112Text1}>
                      {capitalizeFirstLetter(declaration?.titre.replace("_"," ") as string)}
                    </Text>
                    <Text style={styles.container2112Text2}>
                      {declaration?.type}
                    </Text>
                  </View>
                </View>

                <View style={styles.container212}>
                  <View style={styles.container2121}>
                    <View style={styles.container21211}>
                      <Text style={styles.container21211Text}>
                        Adresse sur la carte
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          router.push(`/mainPages/mapPage?Ap=${declaration?.Aptitude}&&At=${declaration?.Attitude}&&id=${declaration?.id}`);
                        }}
                      >
                        <Icon name="map" size={40} color="orange" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.container21212}>
                      <Text style={styles.container21212Text}>Statut</Text>
                      <View style={styles.state}>
                        <Text style={styles.stateText}>
                          {declaration?.status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.container2122}>
                    <Text style={styles.container2122Text1}>Adresse</Text>
                    <Text style={styles.container2122Text2}>
                      {declaration?.adressComplet}.
                    </Text>
                  </View>
                </View>

                <View style={styles.container213}>
                  <Text style={styles.textTitre}>Description</Text>
                  {declaration?.description.trim() === '' ? (
                    <Text
                      style={{
                        margin: 'auto',
                        fontWeight: 'bold',
                        color: '#45474B',
                        opacity: 0.7,
                        fontFamily: 'Poppins-Bold',
                        textAlign: 'center',
                        paddingTop: 8,
                      }}
                    >
                      Aucune Description
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.textMain}>
                        {SeeMoreDescription?declaration?.description:declaration?.description.slice(0,100)}.
                      </Text>
                       {(declaration&&declaration?.description.length>100)&&(SeeMoreDescription?<TouchableOpacity onPress={()=>{setSeeMoreDescription(false)}}><Text style={styles.textMore}>See less</Text></TouchableOpacity>:<TouchableOpacity onPress={()=>{setSeeMoreDescription(true)}}><Text style={styles.textMore}>See more</Text></TouchableOpacity>)}
                    </>
                  )}
                </View>

                <View style={styles.container214}>
                  <Text style={styles.textTitre}>Réponse</Text>
                  <Text style={styles.textMain}>{SeeMoreReponse?declaration?.reponse:declaration?.reponse.slice(0,100)}.</Text>
                  {(declaration&&declaration?.reponse.length>100)&&(SeeMoreReponse?<TouchableOpacity onPress={()=>{setSeeMoreReponse(false)}}><Text style={styles.textMore}>See less</Text></TouchableOpacity>:<TouchableOpacity onPress={()=>{setSeeMoreReponse(true)}}><Text style={styles.textMore}>See more</Text></TouchableOpacity>)}
                  </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      {Isopen && <SideBar namePage="Mes signalements" closeSideBar={() => setOpen(false)} />}
    </>
  );
};

export default DetailsDeclaration;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
    display: 'flex',
  },
  textTitre: {
    color: '#434545',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 10,
    paddingTop: 8,
  },
  textMain: {
    paddingLeft: 10,
    paddingTop: 3,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  textMore: {
    padding: 8,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFA500',
  },
  container211: {
    backgroundColor: '#F7F7F7',
    width: '97%',
    marginBottom: 10,
    height: height / 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  container212: {
    backgroundColor: '#F7F7F7',
    width: '97%',
    marginBottom: 10,
    height: height / 5,
    borderRadius: 5,
  },
  container213: {
    backgroundColor: '#F7F7F7',
    width: '97%',
    marginBottom: 10,
    minHeight: height / 6,
    height:'auto',
    borderRadius: 5,
  },
  container214: {
    backgroundColor: '#F7F7F7',
    width: '97%',
    marginBottom: 10,
    minHeight: height / 6,
    height :'auto',
    borderRadius: 5,
  },
  container1: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  container11: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 18,
    
  },
  container2: {
    flex: 8,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2111: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  container2112: {
    flex: 4,
    padding: 10,
    paddingTop: 20,
  },
  container21111: {
    width: 70,
    height: 70,
    backgroundColor: '#DBDBDB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container21112: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  container21112Text: {
    fontFamily: 'Poppins-Regular',
    color: '#434545',
    paddingLeft :5
  },
  container21112Text1: {
    fontFamily: 'Poppins-SemiBold',
    color: '#434545',
    paddingLeft :5
  },
  container2112Text1: {
    fontFamily: 'Poppins-Bold',
    color: '#434545',
    fontSize: 24,
  },
  container2112Text2: {
    fontFamily: 'Poppins-SemiBold',
    color: '#434545',
  },
  container2121: {
    flex: 1,
    flexDirection: 'row',
  },
  container2122: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container21211: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container21212: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container21211Text: {
    fontFamily: 'Poppins-SemiBold',
  },
  container21212Text: {
    fontFamily: 'Poppins-SemiBold',
  },
  state: {
    width: 100,
    height: 30,
    backgroundColor: 'orange',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  container2122Text1: {
    fontFamily: 'Poppins-SemiBold',
  },
  container2122Text2: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
