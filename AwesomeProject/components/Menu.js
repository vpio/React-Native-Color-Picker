import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS, Text, TouchableHighlight, ScrollView, StyleSheet, View } from 'react-native';
import Sample from './Sample.js'



class Menu extends React.Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const nextRoute = {
      component: Sample,
      title: 'Bar That',
    };
    return(
      <ScrollView>
      <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)}>
        <View style={styles.cell}>
          <Text style={{/*{marginTop: 200, alignSelf: 'center'}*/}}>
            Log in boi {this.props.myProp}!
          </Text>
        </View>
      </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center'
  }
})

export default Menu;
