import React from 'react';
import {Image, Text, View,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons, Ionicons} from "@expo/vector-icons";
import {Header} from 'react-native-elements'
import {inviteUsers} from '../../redux/actions/action'

class ChooseUser extends React.Component {

state={
  selected:[],
  notUsers:[],
  docref:''
} 
componentDidMount(){
  
console.log(this.props.uid+"choose did mount")

    //    await this.props.getUsers()
//   var notUsers = this.props.allUsers.filter((user)=>{
//     return(members.indexOf(user.uid) === -1)
//   })

//   this.setState({
//     notUsers,
//   })
}
render() {
  
 return (

        <View style={styles.container}>
            
            <Header
            leftComponent={<Ionicons name='md-arrow-round-back' size={30} color='white' onPress={()=>this.props.navigation.navigate('Home')}/>}
            centerComponent={{ text:'Select Users', style: { color: '#fff',fontSize:28,fontFamily: 'Roboto', } }}
            containerStyle={{
              backgroundColor: '#DEB887',
              justifyContent: 'space-around',
            }}
            />
            <ScrollView style={{flex:1, alignSelf:'stretch'}}>
             
          {this.props.allUsers.map((item,i)=>{
            var backgroundColor = (this.state.selected.indexOf(item.uid) !== -1)?'#7cfc00':null
            return(<TouchableOpacity
            key={i}
              style={{backgroundColor}} 
            onPress={()=>{
              var a = this.state.selected.indexOf(item.uid)
              if (a === -1)
              {this.setState({
                selected:[...this.state.selected,item.uid]
              })}
              else{
                var temp = this.state.selected
                temp.splice(a,1)
                this.setState({
                  selected:temp
                })
              }
          }}
            ><View style={{flexDirection:'row', alignItems:'center',marginTop:7,marginBottom:7}}>
              <Text style={{marginLeft:20}}>{item.name}</Text>
              
            </View><View style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            /></TouchableOpacity>
            )
          })}
          </ScrollView>


          {(this.state.selected.length)?(<TouchableOpacity style={styles.floater}
          onPress={()=>{
            console.log("Inviting...")
            console.log(this.state.selected,this.props.uid)
            this.props.inviteUsers(this.state.selected,this.props.uid,this.props.navigation)
          }}
          >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              height: 50,
              width: 50,
              backgroundColor: "#7CFC00",
              elevation:2
            }}
          >
            <MaterialIcons name="done" size={40} color="white" />
          </View>
        </TouchableOpacity>)
        :null}
          </View>
        )
    }
}



function mapstate(state){
  return{
    
    uid:state.basicInfo.uid,
    allUsers:state.basicInfo.allUsers,
  }
}
function mapdispatch(dispatch){
  return({
    inviteUsers:(selected,uid,nav)=>{
      dispatch(inviteUsers(selected,uid,nav))
    },
    sendUsers:(fetchedUsers)=>{
      dispatch({type:"LIST_USERS",payload:fetchedUsers})
    }
  })
}
export default connect(mapstate,mapdispatch)(ChooseUser);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
    
    },
    floater: {
      //Here is the trick
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 30,
      bottom: 30
    },
})
















