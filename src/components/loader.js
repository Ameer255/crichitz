import React,{useEffect}from 'react';
import {View, StyleSheet, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default function Loader (props){
    let timer;

    const time =()=>{
        timer = setTimeout(function(){
            props.navigation.navigate('ErrorMessage');

        }, 5000)

    }

    useEffect(()=>{
        time();
        
      return()=>clearTimeout(timer)

    },[])
    return(
        <View style={{flex: 1, alignItems:'center', justifyContent: 'center', backgroundColor : props.bg ? props.bg : '#213' }}>
            <StatusBar style='auto' backgroundColor='#213' barStyle='light-content'/>
        <ActivityIndicator color={props.color ? props.color : '#ff2'} size={80} />
       
        </View>
    )
}

