import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, BackHandler, StatusBar, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default function ErrorMessage(props) {

  React.useEffect(()=>{
    
      BackHandler.addEventListener('hardwareBackPress', () =>{
        Actions.home();
        return  true;

      });

      return(
        BackHandler.removeEventListener('hardwareBackPress')
      )
 
  },[])
  return (
    
    <View style={styles.container}>
      <StatusBar style='auto' />
    <Text style={{color: '#057', fontSize:25}}>No Internet Connection</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
