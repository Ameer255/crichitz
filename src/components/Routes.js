import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Channels from './channels.js'
import Home from './Home'
import Scores from './Scores'
import Smartcric from './Smartcric'
import ErrorMessage from './Error'
import { View, Text, StyleSheet } from 'react-native'
import Loader from './loader.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Nav from './SideNav';

const Navigator = createStackNavigator({
   Home: Home,
   channels: Channels,
   scores: Scores,
   loader:Loader,
   ErrorMessage : ErrorMessage
},
{
   initialRouteName : 'Home',
   defaultNavigationOptions : {
      headerShown : false
   }
});


export default createAppContainer(Navigator);
