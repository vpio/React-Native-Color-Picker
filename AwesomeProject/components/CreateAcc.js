import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

class CreateAcc extends Component{
  state = {
    email: "",
    password: ""
  }

  handleSubmit = () => {
    // axios.get('http://localhost:3000/users').then((response) => {
    //   console.log(response.data)
    // })

    axios.post('http://localhost:3000/api/v1/users', {
      email: this.state.email,
      password: this.state.password
    })
  }

  render(){
    const {email, password} = this.state
    return (
      <View style = {styles.container}>
        <Text>Email:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          autoCapitalize={'none'}
          onChangeText={(email) => this.setState({email})}
          value={email}/>
        <Text>Password:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          autoCapitalize={'none'}
          onChangeText={(password) => this.setState({password})}
          value={password}/>
        <Button
          onPress={() => {this.handleSubmit()}}
          title="Sign Up"
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
});

export default CreateAcc;
