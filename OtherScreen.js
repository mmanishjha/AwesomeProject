import React, { Component,Fragment } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    Alert
} from "react-native";

import { Container, Content, Icon, Button } from 'native-base'
import CustomHeader from './Components/CustomHeader'
import ImageSlider from 'react-native-image-slider';
//import console = require("console");
class OtherScreen extends Component {

static navigationOptions = ({ navigation }) => ({
        title: "SeOtherScreenttings",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerIcon:
            <Image
                source={require('./assets/DrawerIcons/settings.png')}
                style={[styles.icon]}
            />

    })
    
render() {

var other_images = this.props.navigation.state.params.other_images;
 other_images = other_images.split(',');

//other_images = other_images.join(",");
//const newvalue = other_images;
var arr2 = Object.keys(other_images).map(function (i) {
  return other_images[i];
});
//Alert.alert(arr2);

return (
  
  <React.Fragment>
  <CustomHeader
                    title="Details"
                    drawerOpen={() => this.props.navigation.navigate("DrawerOpen")}
                /> 
  <ImageSlider 
  loopBothSides
  autoPlayWithInterval={3000}
  images={arr2}/>
  
   <Container>
                 <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 1 }}>
  
                    <Button
                        full
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ color: 'white' }}>Back to Home.</Text>
                    </Button>
                </Content>
            </Container>
  </React.Fragment>
  )//return
}

}

export default OtherScreen

const styles = StyleSheet.create({
    icon: {
        height: 24,
        width: 24
    }
})