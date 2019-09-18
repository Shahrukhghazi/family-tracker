import React from 'react';
import { Text, View,TouchableOpacity ,Image ,StatusBar,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Button, Divider } from "react-native-elements";
import {NavigationActions} from 'react-navigation'
import firebase from 'firebase';
require("firebase/firestore");


class Drawer extends React.Component {
state={
  imageUri:'',
  activeItemKey:'Home',
}
navigateToScreen( route ){
  this.props.changeNav(route)
    // this.setState({
    //   activeItemKey:route,
    // })
  const navigateAction = NavigationActions.navigate({
      routeName: route
  });
  this.props.navigation.dispatch(navigateAction);
}

render() {
        return (
         
          <View style={styles.container}>
          <Text></Text>
            </View>
        )
}
}


function mapstate(state){
  return({
    
  })
}
function mapdispatch(dispatch){
  return({
    
})
}
export default connect(mapstate,mapdispatch)(Drawer)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
      },
    })