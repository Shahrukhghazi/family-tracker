import React from 'react';
import { TextInput,Text, View,TouchableOpacity ,Image ,StatusBar,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Button, Divider } from "react-native-elements";
import {Header} from 'react-native-elements'

import { createGroup } from "../../redux/actions/action";


class CreateGroup extends React.Component {

state={
    title:''
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
            text: "Create Group",
            style: { color: "#fff", fontSize: 22, fontFamily: "Roboto" }
          }}
          containerStyle={{
            backgroundColor: "#DEB887",
            justifyContent: "space-around"
          }}
        />
        <View style={{flexDirection:'row', padding:20}}>
        <AntDesign name="addusergroup" size={30}/>
         <TextInput
            style={styles.inputs}
            placeholder="Group Name"
            underlineColorAndroid="#DEB887"
            onChangeText={title => this.setState({ title })}
            />
        </View>
           <TouchableOpacity
        onPress={
          ()=>{
              const {title} = this.state;
              const {uid,navigation} = this.props;
            this.props.createGroup(title,uid,navigation)
          }
        }
        >
        
        <View style={{width:150,height:50,backgroundColor:'#DEB887', borderRadius:50, alignItems:'center',justifyContent:'center'}}>
        <Text>Create Group</Text>
        </View>
        </TouchableOpacity>
            </View>
        )
}
}


function mapstate(state){
  return({
    uid:state.basicInfo.uid
  })
}
function mapdispatch(dispatch){
  return({
    
    createGroup:(title,uid,nav)=>{
        // alert(uid)
        dispatch(createGroup(title,uid,nav))
      }
})
}
export default connect(mapstate,mapdispatch)(CreateGroup)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
      },
      inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: "#FFFFFF",
        flex: 1
      },
    })