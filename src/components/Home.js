// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, StatusBar} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import { DrawerActions } from 'react-navigation-drawer';
import clear from 'react-native-clear-cache';
import { createAppContainer } from 'react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hamb from './SideNav';
import VideoPlayer from './Video';
import ErrorMessage from './Error';
import SmartCric from './SmartCric';

export function Home({navigation}) {

let netInfor = useNetInfo();

// const clearCache = ()=>{
//   clearCache.claerAppCache(()=>{
// console.log("cache cleared");
//   })
// }

  React.useEffect(()=>{
    clear.runClearCache(()=>{
      console.log('Cache cleared')
    })
    Icon.loadFont();
 BackHandler.addEventListener('hardwareBackPress',  () =>{
      
      
      if(Actions.currentScene === 'home'){
        // clearCache.claerAppCache(()=>{

        //   console.log("cache cleared");
      
        // })
      BackHandler.exitApp();
      }

      else{
        Actions.pop()
      }
      

})

    return(()=>{
      BackHandler.removeEventListener('hardwareBackPress')


   
    })
  
  },[])

  console.log(netInfor.isInternetReachable);

    const goToChannels = () => {
      
      // if(netInfor.isInternetReachable){
        // clearCache.claerAppCache(()=>{

        //   console.log("cache cleared");
      
        // })
        Actions.channels();
        
      }
      // else{
      //   navigation.navigate('ErrorMessage');
      // }
      // }
      

     const goToVideoPak = () => {
      Actions.video({uri:'http://stream.tvtap.live:8081/live/ptvsports.stream/playlist.m3u8'});
     }

     const goToVideoHundred = () => {
      Actions.video({uri:'http://51.210.227.143/hls/stream.m3u8'});
     }

     const goToSmartcric = () => {
      Actions.smartcric();
     }

  return (
    <SafeAreaProvider>
     <View>
     <StatusBar backgroundColor='#057' style='light'  />
     {/* <View style={{display:'flex', justifyContent:'center'}}>
     <TouchableOpacity style={{margin:16}} onPress={()=>navigation.openDrawer()}>
         <Icon name='bars' size={30} color='#c50' />
       </TouchableOpacity>
       </View> */}
       {/* <Hamb onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}/> */}
    <View style={styles.container}> 
       
       
      <TouchableOpacity onPress={goToSmartcric} style={styles.box}>
          <Text style={styles.text}>Smart Cric</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToVideoPak} style={styles.box}>
          <Text style={styles.text}>Pak vs Wi</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToVideoHundred} style={styles.box}>
          <Text style={styles.text}>The Hundred</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={goToSmartcric} style={styles.box}>
          <Text style={styles.text}>Touch Cric</Text>
          
      
      </TouchableOpacity>
  </View>

  
    </View>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection:'row',
    // 
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap : 'wrap',
    //  marginTop:25,
    zIndex:-1,
  
    height:'100%'
    
  },
  box:{
      width: 160,
      height: 100,
      borderWidth: 2, 
      borderColor:'#000',
      marginRight: 5,
      marginTop: 5,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
      
     
  },
  text:{
    fontWeight: 'bold',
    fontSize: 18,
    color:"#000",
    
  },
  tabIcon:{
    height:200,
    width:200
  }
});


export const HomeRouter =({navigation})=>{
  
  return (
    <React.Fragment>
        <Hamb  onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}/>
  <Router>
    <Stack key='root'>
      <Scene key='home' component={Home} initial hideNavBar />
      <Scene key='video' component={VideoPlayer}  hideNavBar/>
      <Scene key='smartcric' component={SmartCric}  hideNavBar/>
      <Scene key='ErrorMessage' component={ErrorMessage}  hideNavBar/>
    </Stack>
  </Router>
  </React.Fragment>
  )
}


