import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, ListView, StatusBar } from 'react-native';
import { Container, Content, Form, Icon, Input, Item, Button, Label, List, ListItem } from 'native-base'
import AppHeader from '../components/header'

export default class Info extends React.Component {

 render() {
    return (
      <Container style={styles.container}>
        <AppHeader title="Information" navigation={this.props.navigation} closes="true" />
        <Content>
          <Text style={styles.info}>
            Welcome to StackDump!{"\n"}{"\n"}This app was developed for the React Native StuCo at CMU. Add tasks or notes on the go.{"\n"}{"\n"}Tap on tasks to add them to the Today stack.{"\n"}{"\n"}Swipe down on the header to close this page.
          </Text>
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
  info: {
    fontSize: 30,
    color: "#030303"
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
