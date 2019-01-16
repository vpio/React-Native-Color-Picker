import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS, Text, TouchableHighlight, ScrollView, StyleSheet, View, AsyncStorage, Button } from 'react-native';
import Sample from './Sample.js';
import CreateAcc from './CreateAcc.js';
import axios from 'axios';



class Menu extends React.Component {

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }


  render() {
    const {loggedIn, user} = this.props
    const nextRoute = {
      component: Sample,
      title: 'Login',
      passProps: {
        userName: this.props.user.username,
        createAcc: () => this._handleNextPress(createAcc),
        login: this.props.login
       }
    };
    const createAcc = {
      component: CreateAcc,
      title: 'Sign Up',
      passProps: {
        userName: this.props.user.username,
        login: this.props.login
       }
    };

    if (loggedIn){
      return(
        <View style={styles.container}>
          <Text>{user.msg}</Text>
            <Button
              onPress={() => {this.props.logOut()}}
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
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Menu;
