import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS, TouchableHighlight, ScrollView, StyleSheet, AsyncStorage, YellowBox } from 'react-native';
import LoginMenu from './LoginMenu.js';
import CreateAcc from './CreateAcc.js';
import axios from 'axios';
import { View, Examples, ImageBackground, Screen, Tile, Overlay, Title, Caption, Button, Text } from '@shoutem/ui';
import { Font, AppLoading, Haptic } from 'expo';

const LoggedInPage = props => {
  return(
    <View style={styles.container}>
      <Text>{`You are currently Logged-in as ${props.user.username}`}</Text>
        <Button
          onPress={() => {props.handleLogOut()}}
          >
          <Text>Log Out</Text>
        </Button>
    </View>
  );
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

export default LoggedInPage;
