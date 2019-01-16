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
    const {email, password, userName} = this.state
    // this.props.login(email, password)
    // axios.get('http://localhost:3000/users').then((response) => {
    //   console.log(response.data)
    // })
    console.log(email, password, userName)

    axios.post('http://192.168.7.228:3000/api/v1/users/create', {
      user: {
        email: email,
        password: password,
        username: userName
      }
    })
    .then((response) => {
      // console.log("yo", this.props)
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
      <View style = {styles.container}>
        <View style={styles.formContainer}>
          <Text>Username:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            returnKeyType={'next'}
            autoCapitalize={'none'}
            onChangeText={(userName) => this.setState({userName})}
            value={userName}/>
          <Text>Email:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            onChangeText={(email) => this.setState({email})}
            value={email}/>
          <Text>Password:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            autoCapitalize={'none'}
            secureTextEntry={true}
            textContentType={'password'}
            onChangeText={(password) => this.setState({password})}
            value={password}/>
        </View>
        <Button
          style={{
            color: 'red'
          }}
          onPress={() => {this.handleSubmit()}}
          title="Sign Up"
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 50,
    justifyContent: 'center',
  },
  formContainer: {
    width: 300,
    alignSelf: 'center'
  }
});

export default CreateAcc;
