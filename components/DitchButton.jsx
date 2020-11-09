import * as React from 'react';
import { TouchableHighlight, Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

// onchange setnew option to true

export default function DitchButton(props) {
  
  
  return (
    <TouchableHighlight underlayColor='red'activeOpacity={.8} onPress={() => {props.onChange()}}>
     <Text >
      Ditch
      <FontAwesome name='close' size={50} color="black" />
     </Text>
 
    </TouchableHighlight>

  );
}

