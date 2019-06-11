import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS, TouchableHighlight, ScrollView, StyleSheet, AsyncStorage, YellowBox } from 'react-native';
import LoginMenu from './LoginMenu.js';
import CreateAcc from './CreateAcc.js';
import axios from 'axios';
import { View, Examples, ImageBackground, Screen, Tile, Overlay, Title, Caption, Button, Text } from '@shoutem/ui';
import { Font, AppLoading, Haptic } from 'expo';
import AboutPio from './AboutPio.js';

YellowBox.ignoreWarnings([
  'Require cycle:',
]);



class Menu extends React.Component {
  state = {
    fontsAreLoaded: false
  };

  async componentWillMount() {
    console.log("hello")
      await Font.loadAsync({
        'Rubik-Black': require('../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
        'Rubik-BlackItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
        'Rubik-Bold': require('../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
        'Rubik-BoldItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
        'Rubik-Italic': require('../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
        'Rubik-Light': require('../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
        'Rubik-LightItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Medium': require('../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
        'Rubik-MediumItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
        'Rubik-Regular': require('../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
        'rubicon-icon-font': require('../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
      });

      this.setState({ fontsAreLoaded: true });
  }

  handleLogOut = () => {
    this.props.logOut();
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }


  render() {
    const {user, appStart, loggedIn} = this.props;
    console.log('rendered!', loggedIn)
    const nextRoute = {
      component: LoginMenu,
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
    const aboutPio = {
      component: AboutPio,
      title: 'About',
      passProps: {
        userName: this.props.user.username,
        login: this.props.login
       }
    };


    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    else if (loggedIn){
      return(
        <View style={styles.container}>
          <Text>{`You are currently Logged-in as ${user.username}`}</Text>
            <Button
              onPress={() => {this.handleLogOut()}}
              >
              <Text>Log Out</Text>
            </Button>
        </View>
      );
    }
    return (

      <View style={styles.container}>
        <Button
          onPress={() => {
            this._handleNextPress(nextRoute);
            Haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
          }}
          >
          <Text>Login</Text>
        </Button>
        <Button
          onPress={() => {
            this._handleNextPress(createAcc)
            Haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
          }}
          >
          <Text>Sign Up</Text>
        </Button>
        <Button
          onPress={() => {
            this._handleNextPress(aboutPio)
            Haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
          }}
          >
          <Text>About</Text>
        </Button>
      </View>
    );
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
  },
  design: {
    backgroundColor: '#32bcfc',
    height: "100%"
  }
})

export default Menu;
