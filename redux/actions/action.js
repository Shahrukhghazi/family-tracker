console.disableYellowBox = true;

import firebase from "firebase";
require("firebase/firestore");
import { ToastAndroid } from "react-native";
var firebaseConfig = {
  apiKey: "AIzaSyBuyCRk62aBAb10rUzm2-Q9d34wZnb-XfQ",
    authDomain: "family-tracker-82b10.firebaseapp.com",
    databaseURL: "https://family-tracker-82b10.firebaseio.com",
    projectId: "family-tracker-82b10",
    storageBucket: "family-tracker-82b10.appspot.com",
    messagingSenderId: "430698794904",
    appId: "1:430698794904:web:9c7daac7b85cd1cc7325ed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export const getUsers = () => {
  return firebase.firestore().collection("users").get();
}


export function inviteUsers(selected,myUid,nav){
  return dispatch => {
    for(var i =0 ; i<selected.length;i++){
      firebase
      .firestore()
      .collection("users")
      .where("uid", "==", selected[i])
      .get()
          .then(function(userSnapshot) {
            userSnapshot.forEach(function(userDoc) {
             
              db.collection("users").doc(userDoc.id)
              .set({
                inviteBy: firebase.firestore.FieldValue.arrayUnion(myUid) 
              },{merge:true})
              .then((a)=>{
                console.log(a)
                nav.navigate('Home')
              })
              .catch((e)=>{
                alert(e)
              })
              
              
            })})}
            
          }
        }

export function signup(email, password, name, nav) {
  return dispatch => {
   
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);

        db.collection("users").doc(user.user.uid)
          .set({
            email,
            password,
            name,
            uid: user.user.uid
          })
          .then(function(docRef) {
            nav.navigate("Home");
            dispatch({
              type: "LOGGEDIN_USER",
              payload: { name, email, uid: user.user.uid, }
            });
            dispatch({ type: "LOADER" });
          })
          .catch(e => {
            alert(e);
            console.log("catched");
            dispatch({ type: "LOADER" });
          });
      })
      .catch(e => {
        alert(e);
        console.log("catched");
        dispatch({ type: "LOADER" });
      })
    }
}

export function signin(email, password, nav) {
  return dispatch => {
    dispatch({ type: "LOADER" });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        db.collection("users")
          .where("uid", "==", user.user.uid)
          .get()
          .then(function(userSnapshot) {
            userSnapshot.forEach(function(userDoc) {
              dispatch({ type: "LOADER" });
              var { name, email, uid } = userDoc.data();
              dispatch({
                type: "LOGGEDIN_USER",
                payload: { name, email, uid }
              });
              nav.navigate("Home");
            });
          })
          .catch(e => {
            console.log("catched");
            dispatch({ type: "LOADER" });
            alert(e);
          });
      })
      .catch(e => {
        console.log("catched");
        dispatch({ type: "LOADER" });
        alert(e);
      });
  };
}
export const getUsername = (uid) =>{
  return firebase.firestore().collection("users").where
}

export function signOut() {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        dispatch({ type: "LOGOUT"})
        dispatch({ type: "LIST_GROUPS", payload: [] });
        dispatch({ type: "MYTODOS" });
      })
      .catch(function(error) {
        console.log("signout", error);
      });
  };
}
export function createGroup(
  title,
  uid,
  navigation
) {
  return dispatch => {
    db.collection("Groups")
      .add({
        createdByUid: uid,
        members: [uid],
        groupTitle: title,
        dateCreated: new Date()
      })
      .then(() => {
        alert("Group Created");
      });
  };
}
  
    
            
   
        