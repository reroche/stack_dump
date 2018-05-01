import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';

var data = [];

export default class Header extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.horizContainer}>
          {
            this.props.title == "Today"
          ?
            <TouchableOpacity style={styles.info} onPress={() => this.props.navigation.navigate('Info')}>
              <Icon name="info" color="white" size={30}/>
            </TouchableOpacity>
          :
            <Text></Text>
          }
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          {
            this.props.title == "Today"
          ?
            <Text style={styles.counter}>{this.props.count}</Text>
          :
            <Text></Text>
          }
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'red',
  },
  horizContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 8,
    paddingTop: 15
  },
  title:{
    color:'white',
    fontSize: 36
  },
  counter: {
    color: 'white',
    fontSize: 24,
  },
});
