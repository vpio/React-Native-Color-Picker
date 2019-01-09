import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

class Sample extends Component{
  state = {
    text: "Nobody"
  }

  render(){
    const {text} = this.state
    return (
      <View style = {styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={text}/>
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
