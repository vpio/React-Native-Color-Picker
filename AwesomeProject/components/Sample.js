import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

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
    this.props.navigator.pop();
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
          title="Log In"
          />
        <Button
          onPress={() => { this.props.createAcc() }}
          title="Create an Account"
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
