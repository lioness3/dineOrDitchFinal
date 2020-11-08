import React, {useState} from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import DitchButton from '../components/DitchButton';
import DineButton from '../components/DineButton';
import Output from '../components/Output';
import Instructions from '../components/Instructions';
export default function TabOneScreen() {
  const [recipe, setRecipe] = useState(false)
  if(!recipe){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Restaurant Suggestions</Text>
        <Instructions/>
        <Output/>
        <DitchButton/>
        <DineButton/>
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
