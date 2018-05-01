import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, ListView, StatusBar } from 'react-native';
import { Container, Content, Form, Icon, Input, Item, Button, Label, List, ListItem } from 'native-base'
import * as firebase from 'firebase';
import AppHeader from '../components/header'

var data = [];

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2})

    this.state = {
      listViewData: data,
      newTask: ""
    }
  }

  componentDidMount() {
    var that = this
    firebase.database().ref('/tasks').on('child_added', function (data) {
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({listViewData: newData})
    })

  }

  addRow(data) {
    var key = firebase.database().ref('/tasks').push().key
    firebase.database().ref('/tasks').child(key).set({name: data})
  }

  async deleteRow(secId, rowId, rowMap, data) {
    // await firebase.database().ref('/tasks' + data.key).set(null)
    await firebase.database().ref('/tasks').child(data.key).remove()
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });
  }

  async addToToday(secId, rowId, rowMap, data) {
    var key2 = firebase.database().ref('/today').push().key
    await firebase.database().ref('/today').child(key2).set({name: data.val().name})
    this.deleteRow(secId, rowId, rowMap, data)
  }

 render() {
    return (
      <Container style={styles.container}>
        <AppHeader title="Tasks" navigation={this.props.navigation}/>
        <Item>
          <Input
            onChangeText={(newTask) => this.setState({ newTask })}
            placeholder="Add Task"
          />
          <Button light style={styles.btn} onPress={() => this.addRow(this.state.newTask)}>
            <Icon name="add" />
          </Button>
        </Item>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data, secId, rowId, rowMap) =>
              <ListItem onPress={() => this.addToToday(secId, rowId, rowMap, data)}>
                <Text> {data.val().name}</Text>
              </ListItem>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name="trash" />
              </Button>
            }
            leftOpenValue={-50}
            rightOpenValue={-50}
          />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

  // -------------

//   componentWillMount(){
//     this.fetchData()
//   }
//
//   fetchData() {
//     var that = this;
//     that.setState({loading: true})
//     var tempList = []
//     firebase.database().ref('tasks/').once('value', (snap)=> {
//       snap.forEach(function(data) {
//         let result = data.val();
//         tempList.push(result);
//       })
//     }).then(function() {
//       that.setState({list: tempList}, ()=> that.setState({loading: false}));
//     })
//   };
//
//   render() {
//     return (
//       <View styles={styles.container}>
//         <Header title="Tasks" navigation={this.props.navigation}/>
//         <Text>Sample</Text>
//         <View style={styles.body}>
//           {this.state.loading ?
//             <ActivityIndicator style={styles.loadIcon} color="red" size="large"/>
//             :
//             <ScrollView style={styles.scroll}>
//               <TaskList list={this.state.list}/>
//             </ScrollView>}
//         </View>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   fetchContainer:{
//     // flex:2,
//     justifyContent:'center',
//     alignItems:'center',
//     backgroundColor: 'white'
//   },
//   body:{
//     flex:1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   fetchButton:{
//     width:200,
//     backgroundColor:'#aea8d3',
//     alignItems:'center',
//   },
//   goToLogin:{
//     width:200,
//     backgroundColor:'red',
//     alignItems:'center',
//   },
//   scroll:{
//     flex:1,
//     backgroundColor:'white',
//   },
//   loadIcon:{
//     flex:1,
//   }
// });
