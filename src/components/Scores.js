import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {WebView} from 'react-native-webview';

export default function Scores() {
  return (
    <View style={styles.container}>
      
     
      <WebView
// originWhitelist={['*']} 
// source={{ html : "<video controls height='100%' width='100%'> <source src='http://42.201.228.226:8678/PTVSPORT_NOC_MOMILE/tracks-v1a1/mono.m3u8'> </video>"  }}   
  style={{ flex:1, alignSelf: 'stretch'}}
  source={{uri: "https://m.cricbuzz.com"}}
         />
     
      <StatusBar  hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    
  },
});
