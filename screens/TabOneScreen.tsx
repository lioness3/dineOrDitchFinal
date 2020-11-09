import React, {useState} from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { openSettings } from 'expo-linking';
import { Text, View } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';


import { RootStackParamList } from '../types';
import DitchButton from '../components/DitchButton';
import DineButton from '../components/DineButton';
import Output from '../components/Output';
import Instructions from '../components/Instructions';

export default function TabOneScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const [lat, setLat]= useState< Number | null >(null);
  const [lng, setLng]= useState< Number | null >(null);
  const [located, setLocated] = useState(false);
  const [recipe, setRecipe] = useState(false);
  const [typeOfCuisine, setTypeOfCuisine] = useState('');
  const [data, setData] = useState<Array<string | number | undefined>>([]);
  const [restaurant, setRestaurant] = useState<string[]>()
  const [loading, setLoading] = useState<Boolean>(false)
  const[startFrom, setStartFrom] = useState('0')
  const [radius, setRadius] = useState('8000')

 
    const handleLocationPermission = async ()=>{
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
    
      if (status !== "granted") {
        Alert.alert(
          "Location Unavailable",
          "Your location is needed to find a restaurant close to you",
          [
            {
              text: "Cancel",
              onPress: () => navigation.navigate('Root'),
              style: "cancel"
            },
            { text: "Open Settings", onPress: () => openSettings() }
          ],
          { cancelable: false }
        );  
      }else if(!located){
        console.log('locating');
        const position = await Location.getCurrentPositionAsync()
        let lat =  position.coords.latitude
        let lng = position.coords.longitude
        setLat(lat),
        setLng(lng),
        setLocated(true)
        console.log('located');
      }
  }
  const handleRandomNumber = (data:string[] | any):string[] | any=>{
    console.log(startFrom, radius);
    
 if (data.length > 0){ 
   let newList = data
   let numberOfRestaurants = newList.length
   let num =  Math.floor(Math.random() * numberOfRestaurants)
   let restaurantInfo = newList.splice(num, 1)
   let type =  restaurantInfo[0].restaurant.cuisines
   if (type){
     if(type.includes('Fast Food')){
      return(      
        setLoading(true),
        handleRandomNumber(data)
        )
      }
    }
    let typeOfCuisine = 'serves' + ' ' + type.toLowerCase()
    setTypeOfCuisine(typeOfCuisine)
   }
  }

  async function  generateRestaurants(startFrom: any, radius: any) {
    let startNum = startFrom.toString()
    let radiusNum = radius.toString()
      setStartFrom(startNum)
      setRadius(radiusNum)
    
     
      //MAYBE CHANGE TO IF NOT LOCATED
       if(!lat){
         handleLocationPermission()
       }
    if(located){
      await axios.get(`https://developers.zomato.com/api/v2.1/search?`, {
           headers: {
             'Content-Type': 'application/json',
             'user-key': 'a31bd76da32396a27b6906bf0ca707a2'
           },
           params: {
             'lat':`${lat}`,
             'lon': `${lng}`,
             'start':`${startFrom}`,
             'radius':`${radius}`,
             'sort': 'real_distance'
           }
         }).then(res => {
          let data = res.data.restaurants
         
     
            setData(data),
          handleRandomNumber(data)
    
    
         
        
    
         }).catch(err => {
           console.log('error',err.message)
         })
    }
      
        }    
//   const  generateRestaurant = ()=>{
//  setLoading()
// }
  if(!loading){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Restaurant Suggestions</Text>
        <Instructions/>
        <Output suggestion={restaurant}/>
        <DitchButton onChange={()=>{setLoading(true)}}/>
        <DineButton info={restaurant} title='Dine'/>
      </View>
    );
    
  }else if(loading){
    return(
      <View style={styles.container}>
      <Text style={styles.title}>Restaurant Suggestions</Text>
     <Text>LOADING...</Text>
    </View>
    )
  }else if(!recipe){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Restaurant Suggestions</Text>
        <Instructions/>
        <Output suggestion={restaurant}/>
        <DitchButton onChange={()=>{setLoading(false)}}/>
        <DineButton info={restaurant} title='Dine'/>
      </View>
    );
  }else if(recipe){

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
