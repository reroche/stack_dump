import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TaskList extends React.Component {
  state = {
    list: []
  }

  componentWillMount(){
  }

  render() {
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          {
            this.props.list.map((item, i)=> (
              <ListItem
              title="sample"
              leftIcon={{name:'star'}}
              key={i}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list:{
    flex:1,
    backgroundColor:'gray',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "blue"
  }
});


