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
  } from "react-native";

import { Container, Content, Icon, Button } from 'native-base'
import CustomHeader from './Components/CustomHeader'
import ImageSlider from 'react-native-image-slider';
class SettingsScreen extends Component {

static navigationOptions = ({ navigation }) => ({
        //title: "Settings",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerIcon:null

    })
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        },
        this.id = this.props.navigation.state.params.id;
      }
      GetItem (id) {
       
      this.props.navigation.navigate('Settings',{id:id});
     
      }
     componentDidMount() {
        return fetch('http://52.15.90.227/react/Api.php?action=details&id='+this.id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              name:responseJson.name,
              images:responseJson.images,
              reviewSummary:responseJson.reviewSummary,
              rating:responseJson.rating,
              reviews:responseJson.reviews,
              address:responseJson.address,
              phone:responseJson.phone,
              directionsUrl:responseJson.directionsUrl,
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
      Mainimage = (data) => {
        return (
          //Alert.alert(data)
          data.split(",")[0]
        );
      }
      imageList = (data) => {
        other_images = data.split(',')
           var arr2 = Object.keys(other_images).map(function (i) {
           return other_images[i];
         });
         return (
            arr2
        //Alert.alert()
       );
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
                         //title="Details"
                         drawerOpen={() => this.props.navigation.navigate("DrawerOpen")}
                     />
                      <ImageSlider  
          loopBothSides
  autoPlayWithInterval={3000}
  images={this.imageList(this.state.images)}/>
          <View style={styles.MainContainer}>
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
          <Text  style={styles.textViewContainer} >{this.state.name}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>

          <Text  style={styles.textViewContaineradd} >{'Review Summary : '}~{"\n"}{this.state.reviewSummary}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>

          <Text  style={styles.textViewContaineradd} >{'Rating : '}~{"\n"}{this.state.rating}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>

          <Text  style={styles.textViewContaineradd} >{'Review : '}~{"\n"}{this.state.reviews}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>

          <Text onPress={()=>{Linking.openURL('tel:'+this.state.phone);}} style={styles.textViewContaineradd} >{'Phone : '}~{"\n"}{this.state.phone}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>

          <Text  style={styles.textViewContaineradd} >{'Address : '}~{"\n"}{this.state.address}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
 
          <Button
                        full
                        primary
                        onPress={ ()=>{ Linking.openURL('https://google.com'+{directionsUrl})}}>
                        <Text style={{ color: 'white' }}>Get Direction</Text>
                    </Button>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          <Button
                         full
                         success
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ color: 'white' }}>Back to Home.</Text>
                    </Button>
                   
          </View>
          </React.Fragment>
        );
}

}

export default SettingsScreen

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
      },
    MainContainer :{
    
    // Setting up View inside content in Vertically center.
    //justifyContent: 'center',
    flex:2,
    },
    
    imageViewContainer: {
    width: '100%',
    height: 20 ,
    margin: 0,
    borderRadius : 10
    
    },
    
    textViewContainer: {
    
      textAlignVertical:'center',
      width:'100%', 
      paddingTop:10,
      
      fontSize: 20,
      fontWeight: 'bold',
    },textViewContaineradd: {
    
      textAlignVertical:'center',
      width:'100%', 
      paddingTop:10,
      
      fontSize: 15,
      fontWeight: 'bold',
    },
    textView: {
    
      textAlignVertical:'center',
      width:'100%', 
      padding:20
    
    }
    
    });