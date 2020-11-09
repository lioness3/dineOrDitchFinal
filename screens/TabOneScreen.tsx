import React, {useState} from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Text, View } from '../components/Themed';
import DitchButton from '../components/DitchButton';
import DineButton from '../components/DineButton';
import Output from '../components/Output';
import * as Permissions from 'expo-permissions';
import Instructions from '../components/Instructions';
export default function TabOneScreen({navigation}) {
  const [lat, setLat]= useState(null);
  const [lng, setLng]= useState(null);
  const [located, setLocated] = useState(false);
  const [recipe, setRecipe] = useState(false)
  const [restaurant, setRestaurant] = React.useState<string[]>()
  const [loading, setLoading] = useState(false)
  const  generateRestaurant = ()=>{
 
    const handleLocationPermission = async ()=>{
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
    
      if (status !== "granted") {
        Alert.alert(
          "Location Unavailable",
          "Your location is needed to find a restaurant close to you",
          [
            {
              text: "Cancel",
              onPress: () => navigation.navigate('Home'),
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


 
}
  if(!loading){
    generateRestaurant()
    
  }
  if(!recipe){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Restaurant Suggestions</Text>
        <Instructions/>
        <Output suggestion={restaurant}/>
        <DitchButton onChange={()=>{setLoading(false)}}/>
      <DineButton info={restaurant} title='Dine'/>
      </View>
    );
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
