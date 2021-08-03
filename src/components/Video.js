import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  BackHandler,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { WebView } from 'react-native-webview'
import { Video, AVPlaybackStatus } from 'expo-av'
import { StackActions } from '@react-navigation/routers'
import AnimatedLoader from 'react-native-animated-loader'

export default function VideoPlayer({ navigation, uri }) {
  let [loading, setLoading] = React.useState(false)
  let [status, setStatus] = React.useState({})
  const video = React.useRef(null)

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      video.current.pauseAsync()
      Actions.home()
      return true
    })
    return BackHandler.removeEventListener('hardwareBackPress')
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
      }}
    >
      <Video
        ref={video}
        source={{
          uri: uri,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        isLooping
        onLoadStart={() => setLoading(true)}
        onReadyForDisplay={() => setLoading(false)}
        useNativeControls={true}
        style={styles.video}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255, 255, 255, 0.15)"
        source={require('./loader.json')}
        speed={2.5}
        animationStyle={{ height: 100, width: 100 }}
      />

      <StatusBar backgroundColor="#057" style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  video: {
    flex: 1,
    width: '100%',
  },
})
