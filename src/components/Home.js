// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, StatusBar, Alert} from 'react-native';
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
import Ad from './ads';
import admob, { MaxAdContentRating, BannerAd, AdEventType, InterstitialAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';

let adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export function Home({navigation}) {
  let [loaded, setLoaded] = React.useState(false)

let netInfor = useNetInfo();

// const clearCache = ()=>{
//   clearCache.claerAppCache(()=>{
// console.log("cache cleared");
//   })
// }

  React.useEffect(()=>{

    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });
    interstitial.load();
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
      
      admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
      
})

    return(()=>{
      BackHandler.removeEventListener('hardwareBackPress')

      eventListener();
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
      
      if(loaded){
      interstitial.show();
      Actions.smartcric();
      }
      else{
        Alert.alert("Ad not loaded")
        Actions.smartcric();
      }
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
      <BannerAd
          size={BannerAdSize.LARGE_BANNER}
          unitId={TestIds.BANNER}
        />
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
      <Scene key='home' component={Home} hideNavBar />
      <Scene key='video' component={VideoPlayer}  hideNavBar/>
      <Scene key='smartcric' component={SmartCric}  hideNavBar/>
      <Scene key='ErrorMessage' component={ErrorMessage}  hideNavBar/>
    </Stack>
  </Router>
  </React.Fragment>
  )
}


