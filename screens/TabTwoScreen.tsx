import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import DitchButton from '../components/DitchButton';
import DineButton from '../components/DineButton';
import Output from '../components/Output';
import Instructions from '../components/Instructions';
import RecipeSuggestions from '../components/RecipeSuggestions';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [restaurant, setRestaurant] = useState(false)
  const [loading, setLoading] = useState(false)

  const [recipe, setRecipe] = React.useState<string[]>()




  const  generateRecipe = ()=>{
 
      let numberOfRecipes = RecipeSuggestions.length
      let num =  Math.floor(Math.random() * numberOfRecipes)
      let idea = RecipeSuggestions.splice(num, 1)
      if(idea.length > 0){
     
        
        setRecipe(idea) 
       setLoading(true)
      }
  
   
  }
  if(!loading){
    generateRecipe()
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Suggestions</Text>
      {/* <Instructions/> */}
      <Output suggestion={recipe}/>
      <DitchButton onChange={()=>{setLoading(false)}}/>
      <DineButton info={recipe} title='recipe'/>
    
    </View>
  );
  
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

});
