import React, { Component,Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  Platform,
  Alert,
  Linking,
  TouchableHighlight
} from "react-native";

//library imports
import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import geolib from 'geolib'


//custom components imports 
import CustomHeader from './Components/CustomHeader'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //title: "Home",
   // headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
   // drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/DrawerIcons/home.png')}
        style={styles.icon}
      />
    ),
  })
   constructor(props) {
   super(props);
   this.state = {
     isLoading: true,
     latitude: true,
     longitude: true
   }
   
  
 }

 GetItem (id) {
  
 this.props.navigation.navigate('Settings',{id:id});

 }
componentDidMount() {
   return fetch('http://52.15.90.227/react/Api.php?action=list&category_id=1')
     .then((response) => response.json())
     .then((responseJson) => {

      navigator.geolocation.getCurrentPosition(
        position => {
         // Alert.alert()
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            cords:position.coords
          })
        });


       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.setState({
         isLoading: false,
         dataSource: ds.cloneWithRows(responseJson),
       }, function() {
        
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
         height: 0,
         margin:5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }



 Mainimage = (data) => {
  return (
    //Alert.alert(data)
    data.split(",")[0]
  );
}

distance = (data1,data2) => {
  var lat = this.state.latitude
  var long = this.state.longitude
  var test = []
 // Alert.alert(typeof test)
  test = this.state.cords
  
 //var test = geolib.getDistance(test,{latitude: 22.672371106250605,longitude: 88.33883762888127})
//return test;
}



  render() {
  
  if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 150}}>
         <ActivityIndicator />
       </View>
     );
   }

  return (
<React.Fragment>
 <CustomHeader 
                    title="Welcome To Famems."
                    drawerOpen={() => this.props.navigation.navigate("DrawerOpen")}
                />
     <View style={styles.MainContainer}>
       <ListView

         dataSource={this.state.dataSource}
         renderSeparator= {this.ListViewItemSeparator}
         renderRow={(rowData) =>

        <View style={{flex:1, flexDirection: 'row',flexWrap: 'wrap'}} onPress={this.GetItem.bind(this, rowData.id)}>

          
          <Text onPress={this.GetItem.bind(this, rowData.id)} style={styles.textViewContainer} >{rowData.name}</Text>
          <Text>{this.distance(rowData.lattitude,rowData.longitude)}</Text>

          <TouchableHighlight onPress={this.GetItem.bind(this, rowData.id)} style={styles.imageViewContainer}>
          <Image   source = {{ uri: this.Mainimage(rowData.images) }} style={styles.imageViewContainer} />
          </TouchableHighlight>
          <Button style={{width:'48%',padding:0,height:35,marginLeft:'1%',borderRadius:10}}
                        full
                        primary
                        onPress={ ()=>{ Linking.openURL('https://google.com'+rowData.directionsUrl)}}>
                        <Text style={{ color: 'white' }}>Get Direction</Text>
                    </Button>
                    <Button style={{width:'48%',padding:0,height:35,marginLeft:'2%',borderRadius:10}}
                        full
                        success
                        onPress={()=>{Linking.openURL('tel:'+rowData.phone);}}>
                        <Text style={{ color: 'white' }}>Call</Text>
                    </Button>
                    <Text>{"\n"}</Text>
          
        </View>
       
         }
       />

     </View>
     </React.Fragment>
   );
  }

}

export default HomeScreen;

const styles = StyleSheet.create({
icon: {
    width: 24,
    height: 24,
  },
MainContainer :{

// Setting up View inside content in Vertically center.
justifyContent: 'center',
flex:1,
margin: 5,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,

},

imageViewContainer: {
width: '100%',
height: 120 ,
marginBottom:2,

borderRadius : 10

},

textViewContainer: {

  textAlignVertical:'center',
  textAlign:'center',
  width:'100%', 
  padding:10,
  fontSize: 20,
  fontWeight: 'bold',

},
textView: {

  textAlignVertical:'center',
  width:'100%', 
  padding:20

}

});