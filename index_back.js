import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert,Image, Platform} from 'react-native';
import {DrawNavigator} from 'react-navigation';

class AwesomeProject extends Component {
 
 constructor(props) {
   super(props);
   this.state = {
     isLoading: true
   }
 }
 
GetItem (flower_name) {
  
 Alert.alert(flower_name);

 }


 componentDidMount() {

   return fetch('http://52.15.90.227/react/FlowersList.php')
     .then((response) => response.json())
     .then((responseJson) => {
       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.setState({
         isLoading: false,
         dataSource: ds.cloneWithRows(responseJson),
       }, function() {
         // In this block you can do something with new state.
       });
     })
     .catch((error) => {
       console.error(error);
     });
 }

 ListViewItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }


 render() {
   if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }

   return (

     <View style={styles.MainContainer}>
    <Text style={styles.textView}>Welcome to FamesMs!</Text>
       <ListView

         dataSource={this.state.dataSource}

         renderSeparator= {this.ListViewItemSeparator}

         renderRow={(rowData) =>

        <View style={{flex:1, flexDirection: 'row'}}>

          <Image source = {{ uri: rowData.flower_image_url }} style={styles.imageViewContainer} />
        
          <Text onPress={this.GetItem.bind(this, rowData.flower_name)} style={styles.textViewContainer} >{rowData.flower_name}</Text>

        </View>
         }
       />

     </View>
   );
 }
}
const myApp = DrawerNavigator({
Home:{ screen: HomeScreen},
Settings:{screen:SettingsScreen}


});
const styles = StyleSheet.create({

MainContainer :{

// Setting up View inside content in Vertically center.
justifyContent: 'center',
flex:1,
margin: 5,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,

},

imageViewContainer: {
width: '50%',
height: 100 ,
margin: 10,
borderRadius : 10

},

textViewContainer: {

  textAlignVertical:'center',
  width:'50%', 
  padding:20

},
textView: {

  textAlignVertical:'center',
  width:'100%', 
  padding:20

}

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);