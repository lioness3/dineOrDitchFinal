import * as React from 'react';
import { View, Text} from 'react-native';
import RecipeSuggestions from './RecipeSuggestions';


export default function Output(props) {
  if(props.suggestion == 'recipe'){
    return (
      <View>
        {RecipeSuggestions}
        <Text>Suggestion Info...</Text>
      </View>
    );
  }else{
    return (
      <View>
        <Text>Suggestion Info...</Text>
      </View>
    );
  }
  

}