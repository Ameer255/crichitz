import React from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native'
import backgroundImg from './assets/crichitz.jpg'
import Video from './src/components/Video'
import Scores from './src/components/Scores'
import ErrorMessage from './src/components/Error'
import Loader from './src/components/Video'
import codePush from 'react-native-code-push'
import {HomeRouter} from './src/components/Home'

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START }
function App({navigation}) {
  React.useEffect(() => {
    Icon.loadFont()
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    })
  })

  return (
      <App2 />
  )
}

function CustomDrawerContentComponent(props) {
  return (
    <View>
      <SafeAreaView>
        <View style={{ justifyContent: 'center', height: 200 }}>
          <ImageBackground
            source={backgroundImg}
            style={styles.backgroundImage}
          />
          <Text style={styles.imageTxt}>Cric Hitz</Text>
        </View>
        <View>
          <DrawerItems {...props} />
        </View>
      </SafeAreaView>
    </View>
  )
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeRouter,
      navigationOptions: {
        drawerIcon: <Icon name="home" size={24} color="#057" />,
      },
    },
    Video: {
      screen: Video,
      navigationOptions: {
        drawerIcon: <Icon name="cog" size={24} color="#057" />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  imageTxt: {
    padding: 3,
    color: '#fff',
    fontSize: 20,
    fontFamily:'sans-serif',
    position:'absolute',
    top:0
  },
})

const App2 = createAppContainer(DrawerNavigator)

export default codePush(codePushOptions)(App)
