import { StyleSheet, Text, View, TouchableOpacity, BackHandler, StatusBar} from 'react-native';
import React from 'react';


function Hamb(props){

    return(
        <View style={styles.container}>
            <View>
            <TouchableOpacity style={{width:60}} onPress={props.onPress}>
                <View style={styles.menu}></View>
                <View style={styles.menu}></View>
                <View style={styles.menu}></View>
            </TouchableOpacity>
            </View>
            <View>
            <Text style={styles.txt}>Cric Hitz</Text>
            </View>
        </View>
    )

}

  const styles = StyleSheet.create({
      container:{
          backgroundColor:'#057',
          width:'100%',
          paddingVertical:13,
          paddingLeft:12,
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:8,
          alignItems:'center'
      },
      menu:{
          backgroundColor:'white',
          width:24,
          height:3,
          marginBottom:3,
          borderRadius:5
      },
      txt:{
          color:'white',
        
          fontSize:22,
          fontFamily:'Roboto'
      }
  })
  
  export default Hamb;
