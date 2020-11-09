import * as React from 'react';
import { TouchableHighlight, Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';


export default function DineButton(props) {
  const openGoogle = (recipe)=>{
    Linking.openURL('https://www.google.com/search?q='+`${props.info}`+'+recipe')
  }
  
  return (
    <TouchableHighlight underlayColor='#58E80B' activeOpacity={.8} onPress={() =>
      openGoogle(props.info)
      }>
        <Text>
          {props.title}
          <FontAwesome name='list-alt' size={50} color="black" />
        </Text>
    </TouchableHighlight>
  );
}