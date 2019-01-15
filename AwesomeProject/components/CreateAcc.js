import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

class CreateAcc extends Component{
  state = {
    email: "",
    password: "",
    userName: ""
  }

  handleSubmit = () => {
    // axios.get('http://localhost:3000/users').then((response) => {
    //   console.log(response.data)
    // })
    console.log(this.state.password)

    axios.post('http://localhost:3000/api/v1/users/create', {
      user: {
        email: this.state.email,
        password: this.state.password,
        username: this.state.userName
      }
    })
    .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render(){
    const {email, password, userName} = this.state
    return (
      <View style = {styles.container}>
        <Text>Username:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          autoCapitalize={'none'}
          onChangeText={(userName) => this.setState({userName})}
          value={userName}/>
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
