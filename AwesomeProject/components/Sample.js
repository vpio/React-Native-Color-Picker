import React, { Component } from 'react';
import {  StyleSheet, Keyboard, TouchableWithoutFeedback, Easing, ScrollView } from 'react-native';
import axios from 'axios';
import { View, Examples, ImageBackground, Screen, Tile, Overlay, Title, Caption, Button, Text, TextInput } from '@shoutem/ui';
import { TimingDriver, ZoomIn } from '@shoutem/animation';


class Sample extends Component{
  state = {
    email: "",
    password: "",
    user_token: "",
  }

  handleSubmit = () => {
    const {email, password} = this.state

    console.log(email, password)
    this.props.login(email, password)
    // this.props.navigator.pop();
    // console.log("got the right end point")
    //
    // axios.post('http://localhost:3000/api/v1/user_token', {
    //   auth: {
    //     email: this.state.email,
    //     password: this.state.password
    //   }
    // })
    // .then((response) => {
    //   this.setState({user_token: response.data.jwt })
    //   console.log(this.state.user_token)
    // })
    // .catch((e) => { console.log(e) })
    //
    // axios.get('http://localhost:3000/api/v1/auth')
    // .then((response) => {
    //   console.log(response)
    // })
    // .catch((e) => { console.log(e) } )
  }

  render(){
    const {email, password} = this.state
    const driver = new TimingDriver({
      "duration": 400,
      "easing": Easing.inOut,
      "delay": 200,
    });
    return (

        <ScrollView
           style={styles.container}
           scrollEnabled={false}
           keyboardShouldPersistTaps="never"
           >
          <Text>Email:</Text>
          <TextInput
            style={{borderColor: 'gray', borderBottomWidth: 1}}
            autoCapitalize={'none'}
            onChangeText={(email) => this.setState({email})}
            value={email}/>

          <Text>Password:</Text>
          <TextInput
            style={{borderColor: 'gray', borderBottomWidth: 1}}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={password}/>
          <Button
            onPress={() => {this.handleSubmit()}}
            >
            <Text>Log In</Text>
          </Button>
          <Button
            onPress={() => { this.props.createAcc() }}
            >
            <Text>Creat an Account</Text>
          </Button>
          <Button
            onPress={() => { this.props.navigator.pop() }}
            >
            <Text>Back</Text>
          </Button>
        </ScrollView>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    height: 1000,
    width: 330,
    alignSelf: 'center'
  },
});

export default Sample;
