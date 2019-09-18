import React from "react";
import { signin } from "../../redux/actions/action";
import { connect } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { Header } from "react-native-elements";

class Login extends React.Component {
  goToSignup() {
    this.props.navigation.navigate("Signup");
  }

  signin() {
    const { email, password } = this.state;
    this.props.signinn(email, password, this.props.navigation);
  }
  state = {
    email: "a@g.com",
    password: "123456"
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
            text: "Family Tracker",
            style: { color: "#fff", fontSize: 28, fontFamily: "Roboto" }
          }}
          containerStyle={{
            backgroundColor: "#DEB887",
            justifyContent: "space-around"
          }}
        />

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 30
          }}
        >
          Sign In
        </Text>
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
          onPress={this.signin.bind(this)}
        >
          {this.props.isLoading ? (
            <ActivityIndicator styles={{ height: 26 }} color="black" />
          ) : (
            <Text style={styles.signUpText}>Sign In</Text>
          )}
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.goToSignup()}>
          <Text>New here? Signup!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.basicInfo.isLoading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signinn: (email, pass, nav) => {
      dispatch(signin(email, pass, nav));
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
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#DEB887",
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
