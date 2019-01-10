import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

class Sample extends Component{
  state = {
    email: "Email: ",
    password: "Password: "
  }

  handleSubmit = () => {
    // axios.get('http://localhost:3000/users').then((response) => {
    //   console.log(response.data)
    // })

    axios.post('http://localhost:3000/users', {
      email: this.state.email,
      password: this.state.password
    })

    // fetch("/users", {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password,
    //   })
    // })
  }

  render(){
    const {email, password} = this.state
    return (
      <View style = {styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={email}/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={password}/>
        <Button
          onPress={() => {this.handleSubmit()}}
          title="submit"

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

export default Sample;
