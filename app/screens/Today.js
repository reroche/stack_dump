import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, ListView, StatusBar } from 'react-native';
import { Container, Content, Form, Icon, Input, Item, Button, Label, List, ListItem } from 'native-base'
import * as firebase from 'firebase';
import AppHeader from '../components/header'

var data = [];
var counter = 0;

export default class Today extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2})

    this.state = {
      listViewData: data,
      newToday: ""
    }
  }

  componentDidMount() {
    var that = this
    firebase.database().ref('/today').on('child_added', function (data) {
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({listViewData: newData})
    })

  }

  addRow(data) {
    var key = firebase.database().ref('/today').push().key
    firebase.database().ref('/today').child(key).set({name: data})
  }

  async deleteRow(secId, rowId, rowMap, data) {
    await firebase.database().ref('/today').child(data.key).remove()
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  markCompleted(secId, rowId, rowMap, data) {
    counter = counter + 1;
    this.deleteRow(secId, rowId, rowMap, data);
    this.forceUpdate();
  }

 render() {
    return (
      <Container style={styles.container}>
        <AppHeader title="Today" count={counter} navigation={this.props.navigation}/>
        <Item>
          <Input
            onChangeText={(newToday) => this.setState({ newToday })}
            placeholder="Add Task for Today"
          />
          <Button light style={styles.btn} onPress={() => this.addRow(this.state.newToday)}>
            <Icon name="add" />
          </Button>
        </Item>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data, secId, rowId, rowMap) =>
              <ListItem onPress={() => this.markCompleted(secId, rowId, rowMap, data)}>
                <Text> {data.val().name} </Text>
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


// export default class Today extends React.Component {
//   state={
//     loading: true,
//     list: []
//   }
//
//   componentWillMount(){
//     // this.fetchData();
//   }
//
//   componentDidMount(){
//   }
//
//   // fetchData(){
//   //   var that = this;
//   //   that.setState({loading:true})
//   //   var tempList = []
//   //   firebase.database().ref(`projects/`).once('value', (snap)=> {
//   //     snap.forEach(function(data) {
//   //       let result = data.val();
//   //       tempList.push(result);
//   //       //console.log(data.key,"reg reg init")
//   //     })
//   //   }).then(function(){
//   //     that.setState({list:tempList}, ()=>that.setState({loading:false}))
//   //   })
//   // };
//
//   // deleteItem(i){
//   //   var newList = this.state.list
//   //   newList.splice(i,1)
//   //   this.setState({list:newList})
//   // }
//
//   // goToLogin(){
//   //   this.props.navigation.navigate('login')
//   // }
//
//   // goToDetails(item){
//   //   console.log(item);
//   //   this.props.navigation.navigate('Details', {...item})
//
//
//   //   //Push to firebase
//   //   // firebase.database().ref(`users/${item.name}`).update({
//   //   //   data: item
//   //   // });
//
//
//   // }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Header navigation={this.props.navigation} title="Today" />
//         <View style={styles.body}>
//           {
//             this.state.loading
//             ?
//             <ActivityIndicator style={styles.loadIcon}
//               color='#f92222' size='large'
//             />
//             :
//             <Text>Sample Text</Text>
//           }
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
//     backgroundColor: 'white',
//     // alignItems: 'center',
//     // justifyContent: 'center',
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
//   }
// });
