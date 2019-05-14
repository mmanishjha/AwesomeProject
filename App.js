import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert
} from "react-native";

//library imports 
import { Container, Content, Icon, Header, Body } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'

//custom files 
global.catData=["Cats", "Dogs", "Lions", "Tions"];
global.dState=1;
global.dynamicData=[];

import HomeScreen from "./HomeScreen"
import SettingsScreen from './SettingsScreen'


export default class App extends Component {
  componentDidMount() { 
    global.dState=0;
    global.dynamicData = ["Cats", "Dogs", "Lions"]
    return fetch('http://52.15.90.227/react/Api.php?action=category')
      .then((response) => response.json())
      .then((responseJson) => { 
        this.dataSource = responseJson





      })
  }
  /*
render() {
    //this.findCoordinates();
  //Alert.alert(this.state.location);
  if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 150}}>
      </View>
    );
  }

    return (
      <MyApp />
    )
  }
  */
  render() {

    return (
      <MyApp />
    )
  }
}

const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('./assets/DrawerIcons/Logo.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);


/*

var temp ="";
const DD=[];
var something = global.catData

for(var d=0;d<4;d++){
  let dd=d;
  let temp = something[dd]
  
 DD.push({
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: temp
  })
  });
}

*/


const MyApp = DrawerNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home'
  })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: () => null
  })
  }
},
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

  //export default App;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 25
  }

})

