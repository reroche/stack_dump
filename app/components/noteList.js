import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class NoteList extends React.Component {
  state = {
    list:[]
  }

  componentWillMount(){
  }

  render() {
    console.log(this.props.list);
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          {
            this.props.list.map((item, i) => (
              <ListItem
                title={item.content}
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
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  list:{
    flex:1,
    // height:300,
    backgroundColor:'gray'
  }
});


