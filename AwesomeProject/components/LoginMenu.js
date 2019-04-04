import React, { Component } from 'react';
import {  StyleSheet, ScrollView } from 'react-native';
import { Button, Text, TextInput } from '@shoutem/ui';

class LoginMenu extends Component{
  state = {
    email: "",
    password: "",
    user_token: "",
  }

  handleSubmit = () => {
    const {email, password} = this.state

    console.log(email, password)
    this.props.login(email, password)
    this.props.navigator.pop();
  }

  render(){
    const {email, password} = this.state
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
            <Text>Create an Account</Text>
          </Button>
          <Button
            onPress={() => { this.props.navigator.pop() }}
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

export default LoginMenu;
