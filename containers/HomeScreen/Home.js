import React from "react";
import {Text,View,ActivityIndicator,ScrollView,StyleSheet,Button,TouchableOpacity,TextInput} from "react-native";

import { connect } from "react-redux";
import { Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import MapView from "react-native-maps";
import { getUsers } from "../../redux/actions/action";
import Constants from 'expo-constants';
import { ToastAndroid } from "react-native";

class Home extends React.Component {
  
state={

}
async componentDidMount(){
console.log( "home did mount"+ this.props.uid)

  const users = await getUsers()
  var fetchedUsers= []
  users.forEach(user => {
      console.log("invitation" , user.data());
      fetchedUsers.push(user.data())
    })
    console.log(fetchedUsers)
  this.props.sendUsers(fetchedUsers)

}
  render() {
    return (
      <View style={styles.container}>
       <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{
            text: "Family Tracker",
            style: { color: "#fff", fontSize: 22, fontFamily: "Roboto" }
          }}
          containerStyle={{
            backgroundColor: "#DEB887",
            justifyContent: "space-around",
            position:'relative',top:0,
            zIndex:1
          }}
        />
<MapView  style={{position:'absolute',top:0,bottom:0,left:0,right:0}} 
        region={{
          latitude: 24.8607,
          longitude: 67.0011,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421 
        }}
        />
        <TouchableOpacity style={{position:'absolute' , zIndex:1, top:90}}
        onPress={
          ()=>{
            this.props.navigation.navigate('ChooseUser')
          }
        }
        >
        
        <View style={{width:150,height:50,backgroundColor:'#DEB887', borderRadius:50, alignItems:'center',justifyContent:'center'}}>
        <Text>Invite Users</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapstate(state) {
  return {
    uid:state.basicInfo.uid
  };
}
function mapdispatch(dispatch) {
  return {
       sendUsers:(fetchedUsers)=>{
      dispatch({type:"LIST_USERS",payload:fetchedUsers})
    }
}
}
export default connect(
  mapstate,
  mapdispatch
)(Home);

const styles = StyleSheet.create({
  container: {
   flex:1,
   alignItems:'center'
  }
});
