import React from "react";
import { signup } from "../../redux/actions/action";
import { connect } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { Header } from "react-native-elements";


class Login extends React.Component {
  goToSignin() {
    this.props.navigation.navigate("Login");
  }

  signup() {
    const { email, password, name } = this.state;
    const { navigation } = this.props;
    if (email !== "" && password !== "" && name !== "")
      this.props.signup(email, password, name, navigation);
    else alert("Please enter Credentials!");
  }

  state = {
    email: "",
    password: "",
    name: ""
  };
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
            text: "Todo App",
            style: { color: "#fff", fontSize: 28, fontFamily: "Roboto" }
          }}
          containerStyle={{
            backgroundColor: "#DEB887",
            justifyContent: "space-around"
          }}
        />
       
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="rename-box" size={30} />
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            keyboardType="email-address"
            underlineColorAndroid="#DEB887"
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={30} />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="#DEB887"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="onepassword" size={30} />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="#DEB887"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={this.signup.bind(this)}
        >
          {(this.props.isLoading) ? (
            <ActivityIndicator styles={{ height: 26 }} color="black" />
          ) : (
            <Text style={styles.signUpText}>Sign Up</Text>
          )}
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.goToSignin()}>
          <Text>Already a Member?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

function mapStateToProps(states) {
  return {
    isLoading: states.basicInfo.isLoading,
    imgUri: states.basicInfo.imgUri
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signup: (email, pass, name, nav) => {
      dispatch(signup(email, pass, name, nav));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: 250,
    height: 45,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  signupButton: {
    backgroundColor: "#DEB887"
  },
  signUpText: {
    color: "white"
  }
});
