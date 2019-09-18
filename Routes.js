
import React from "react";
import {createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from './containers/HomeScreen/Home'
import {createStackNavigator} from 'react-navigation-stack'

import {createDrawerNavigator} from 'react-navigation-drawer'
import  Drawer from "./containers/HomeScreen/Drawer";
import  ChooseUser from "./containers/HomeScreen/ChooseUser";
import Login from './containers/HomeScreen/Login'
import createGroup from './containers/HomeScreen/CreateGroup'
import Signup from './containers/HomeScreen/Signup'

const stackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    ChooseUser: {
        screen: ChooseUser,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null
        }
    },
    createGroup: {
        screen: createGroup,
        navigationOptions: {
            header: null
        }
    },
    
    
},
    { initialRouteName: 'Login', }
);

const AppNavigator = createDrawerNavigator({
    stackNavigator
    
    
},
    { initialRouteName: 'stackNavigator',contentComponent:({navigation})=><Drawer navigation={navigation}/> }
);


export default createAppContainer(createSwitchNavigator(
    {
        App: AppNavigator,
    },
    {
        initialRouteName: 'App',
    }
));