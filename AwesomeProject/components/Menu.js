import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS, Text, TouchableHighlight, ScrollView, StyleSheet, View, AsyncStorage, Button } from 'react-native';
import Sample from './Sample.js';
import CreateAcc from './CreateAcc.js';
import axios from 'axios';



class Menu extends React.Component {
  state = {
    userName: '',
    user_token: '',
    user: {},
    loggedIn: false
  }

  handleLogOut = () => {

      this.setState({
        loggedIn: false,
        user_token: ''
      })

    AsyncStorage.setItem("myToken", '')
  }

  handleSubmit = (email, password) => {
    console.log("got the right end point", email)

    axios.post('http://192.168.7.228:3000/api/v1/user_token', {
      auth: {
        "email": email,
        "password": password
      }
    })
    .then((response) => {
      this.setState({user_token: response.data.jwt })
      console.log("user token", response.data.jwt)

      axios.get('http://192.168.7.228:3000/api/v1/auth', {
        headers: {
          "Authorization": `Bearer ${this.state.user_token}`,
          "Content-Type": `application/json`
        }
      })
      .then((response) => {
        this.setState({
          user: response.data ,
          loggedIn: true
        })
        AsyncStorage.setItem("myToken", this.state.user_token)
        console.log(response.data)
      })
      .catch((e) => { console.log(e.message) } )
    })
    .catch((e) => { console.log(e) })
  }

  componentDidMount(){
    console.log("test")
    AsyncStorage.getItem("myToken")
           .then((value) => {
             if (value) {
               console.log("intercepted")
               this.setState({
                 user_token: value,
                 loggedIn: true
                })
                axios.get('http://192.168.7.228:3000/api/v1/auth', {
                  headers: {
                    "Authorization": `Bearer ${this.state.user_token}`,
                    "Content-Type": `application/json`
                  }
                })
                .then((response) => {
                  this.setState({
                    user: response.data ,
                  })
                })
                .catch((e) => { console.log(e.message) } )
               console.log(this.state.user_token)
             }
           })
           .catch(error => console.log('error!'))
           .done();
  // If the user has a token, send the following request to get their info
    if (this.state.user_token){
      axios.get('/users/current', {
        headers: {
          "Authorization": `Bearer ${this.state.user_token}`,
          "Content-Type": `application/json`
        }
      })
      .then((response) => { console.log(response) })
      .catch((e) => { console.log(e) } )
    }

  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

// , createAccount: this.
  render() {
    const {loggedIn, user} = this.state
    const nextRoute = {
      component: Sample,
      title: 'Login',
      passProps: {
        userName: this.state.userName,
        createAcc: () => this._handleNextPress(createAcc),
        login: this.handleSubmit
       }
    };
    const createAcc = {
      component: CreateAcc,
      title: 'Sign Up',
      passProps: {
        userName: this.state.userName,
        login: this.handleSubmit
       }
    };

    if (loggedIn){
      return(
        <View style={styles.container}>
          <Text>{user.msg}</Text>
            <Button
              onPress={() => {this.handleLogOut()}}
              title="Log Out"
              />
        </View>
      )
    }
    else {
      return(
        <ScrollView>
        <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)}>
          <View style={styles.cell}>
            <Text >
              Log in boi!
            </Text>
          </View>
        </TouchableHighlight>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    marginTop: 200,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Menu;
