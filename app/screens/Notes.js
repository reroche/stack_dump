import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, ListView, StatusBar } from 'react-native';
import { Container, Content, Form, Icon, Input, Item, Button, Label, List, ListItem } from 'native-base'
import * as firebase from 'firebase';
import AppHeader from '../components/header'

var data = [];

export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2})

    this.state = {
      listViewData: data,
      newNote: ""
    }
  }

  componentDidMount() {
    var that = this
    firebase.database().ref('/notes').on('child_added', function (data) {
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({listViewData: newData})
    })

  }

  addRow(data) {
    var key = firebase.database().ref('/notes').push().key
    firebase.database().ref('/notes').child(key).set({content: data})
  }

  async deleteRow(secId, rowId, rowMap, data) {
    await firebase.database().ref('/notes').child(data.key).remove()
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  addToToday() {
    console.log("works");
  }

 render() {
    return (
      <Container style={styles.container}>
        <AppHeader title="Notes" navigation={this.props.navigation}/>
        <Item>
          <Input
            onChangeText={(newNote) => this.setState({ newNote })}
            placeholder="Add Note"
          />
          <Button light style={styles.btn} onPress={() => this.addRow(this.state.newNote)}>
            <Icon name="add" />
          </Button>
        </Item>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem onPress={() => this.addToToday()}>
                <Text> {data.val().content} </Text>
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


// --------
// export default class Notes extends React.Component {
//   state = {
//     loading: true,
//     list: []
//   }
//
//   componentWillMount(){
//     this.fetchData()
//   }
//
//   fetchData() {
//     var that = this;
//     that.setState({loading: true})
//     var tempList = []
//     firebase.database().ref('notes/').once('value', (snap)=> {
//       snap.forEach(function(data) {
//         let result = data.val();
//         tempList.push(result);
//       })
//     }).then(function() {
//       that.setState({list: tempList}, ()=> that.setState({loading: false}))
//     })
//   };
//
//   render() {
//     console.log(this.state.list);
//     return (
//       <View styles={styles.container}>
//         <Header title="Notes" navigation={this.props.navigation}/>
//         <View style={styles.body}>
//           {this.state.loading ?
//             <ActivityIndicator style={styles.loadIcon} color="red" size="large"/>
//             :
//             <ScrollView style={styles.scroll}>
//               <NoteList list={this.state.list}/>
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
//     // alignItems: 'center',
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
//     backgroundColor: 'red',
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
//     backgroundColor:'white'
//   },
//   loadIcon:{
//     flex:1,
//     alignItems:'center',
//     justifyContent: 'center',
//   }
// });
