import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { View, Examples, ImageBackground, Screen, Tile, Overlay, Title, Caption, Button, Text, TextInput } from '@shoutem/ui';

class CreateAcc extends Component{
  state = {
    email: "",
    password: "",
    userName: ""
  }

  handleSubmit = () => {
    const {email, password, userName} = this.state
    // console.log(email, password, userName)

    axios.post('http://192.168.7.228:3000/api/v1/users/create', {
      user: {
        email: email,
        password: password,
        username: userName
      }
    })
    .then((response) => {
     this.props.login(email, password)
     this.props.navigator.popToTop();
     console.log(response);
   })
   .catch((error) => {
     console.log(error);
   });
  }

  render(){
    const {email, password, userName} = this.state
    return (
      <ScrollView
        style = {styles.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps="never"
        >
        <Text>Username:</Text>
        <TextInput
          style={{borderColor: 'gray', borderBottomWidth: 1}}
          autoCapitalize={'none'}
          onChangeText={(userName) => this.setState({userName})}
          value={userName}/>
        <Text>Email:</Text>
        <TextInput
          style={{borderColor: 'gray', borderBottomWidth: 1}}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          onChangeText={(email) => this.setState({email})}
          value={email}/>
        <Text>Password:</Text>
        <TextInput
          style={{borderColor: 'gray', borderBottomWidth: 1}}
          autoCapitalize={'none'}
          secureTextEntry={true}
          textContentType={'password'}
          onChangeText={(password) => this.setState({password})}
          value={password}/>
        <Button
          onPress={() => {this.handleSubmit()}}
          >
          <Text>Sign Up</Text>
        </Button>
        <Button
          onPress={() => {this.props.navigator.pop()}}
          >
          <Text>Back</Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    height: 1000,
    width: 300,
    alignSelf: 'center'
  },
  formContainer: {
    width: 300,
    alignSelf: 'center'
  }
});

export default CreateAcc;
