import React, { Component } from 'react'
import { StyleSheet, View, Text, BackHandler, Image, Dimensions, Platform, StatusBar, ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview'
import ErrorMessage from './Error'
import NetInfo from "@react-native-community/netinfo";
import Loader from './loader';
import clear from 'react-native-clear-cache';
import { Actions } from 'react-native-router-flux';
import AnimatedLoader from 'react-native-animated-loader';


class SmartCric extends Component {
  constructor(props) {
    super(props)
  }
  

  state = {
    canGoBack: false,
    ref: null,
    connected : false,
    isLandscape : false,
    unsubscribe : null
  }

 
  onAndroidBackPress = () => {
    if (this.state.canGoBack && this.state.ref) {
      this.state.ref.goBack();
      return true
    }
    else{
      
      Actions.home();
      return true;

    }
    
  }


  
 
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress)
      
    }

    Dimensions.addEventListener('change', () => {
      const dim = Dimensions.get('screen');
      this.setState({
          isLandscape : dim.width >= dim.height ? true : false
      });
  });


   this.state.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      this.setState({connected: state.isInternetReachable});
     });

     clear.runClearCache(()=>{
      console.log('Cache cleared')
    })
}

componentWillUnmount() {
  if (Platform.OS === 'android') {
    BackHandler.removeEventListener('hardwareBackPress')
  }
  if (this.state.unsubscribe != null) this.state.unsubscribe()
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style='light' backgroundColor='#057' hidden={this.state.isLandscape}/>
        {/* <View style={styles.overlay}>
          <Text>
            This is overlay.
          </Text>

        </View> */}
        
        
        <WebView
          ref={(state) => {
            this.state.ref = state
          }}
          onNavigationStateChange={(navState) => {
            this.state.canGoBack = navState.canGoBack
          }}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          style={{ flex: 1, alignSelf: 'stretch', marginTop: -115 }}
          source={{ uri: 'https://smartcric.com' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          renderError={()=>Actions.ErrorMessage()}
          renderLoading={() => (
            <AnimatedLoader visible={true} 
            overlayColor='rgba(0, 0, 0, 0.55)'
            source={require('./loader.json')}
            speed={2.5}
            />
          )}
        />
          <View style={{
            position:'absolute',
            bottom:0,
            height:this.state.isLandscape? 0: 100,
            backgroundColor:'white',
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }}>
          <Text>
            This is overlay.
          </Text>

        </View>
        
      </View> 
    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4c7',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  tabIcon:{
    height:200,
    width:200
  },
  overlay:{
    
    height:100,
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',

  },
  overlay2:{
    position:'absolute',
    bottom:0,
    height:100,
    backgroundColor:'white',
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  }
})


export default SmartCric;