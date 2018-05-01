// TodoApp

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Today from './app/screens/Today'
import Tasks from './app/screens/Tasks'
import Notes from './app/screens/Notes'
import Info from './app/screens/Info'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBcLIzTxHFPfVwGMLM81VkuC0JVrrEw2eE",
  authDomain: "todoapp-3612f.firebaseapp.com",
  databaseURL: "https://todoapp-3612f.firebaseio.com",
  projectId: "todoapp-3612f",
  storageBucket: "todoapp-3612f.appspot.com",
  messagingSenderId: "204799637214"
};
firebase.initializeApp(config);

// Today Nav
const TodayNav = StackNavigator({
  Today: {
    screen: Today
  },
  Info: {
    screen: Info
  },
}, {
  headerMode: "none",
  mode: "modal"
});

// App Nav
const AppNav = TabNavigator({
  Today: {
    screen: TodayNav,
    navigationOptions:{
      tabBarIcon: <Icon name="wb-sunny" size={30}j/>
    }
  },
  Tasks: {
    screen: Tasks,
    navigationOptions: {
      tabBarIcon: <Icon name="list" size={30}/>
    }
  },
  Notes: {
    screen: Notes,
    navigationOptions: {
      tabBarIcon: <Icon name="book" size={30}/>
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: "black",
    inactiveTintColor: "black",
    activeBackgroundColor: '#DDDDDD'
  },
  headerMode: "none",
  swipeEnabled: false
})

// Render App
export default class App extends React.Component {
  render() {
    return(
      <AppNav/>
    )
  }
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    color: "red",
    alignItems: "center"
  },
  title: {
    justifyContent: "space-between",
    color: "white",
    fontSize: 25
  }
});
