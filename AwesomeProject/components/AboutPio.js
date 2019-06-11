import React, { Component } from 'react';
import { StyleSheet, Linking} from 'react-native';
import { View, Screen, Tile, Overlay, Title, Caption, Button, Text, Image } from '@shoutem/ui';
import headshot from '../assets/images/Pio_HQ_Headshot2.jpg';
import signature from '../assets/images/signature.png';

const AboutPio = props => {
  return (
    <React.Fragment>
    <View style={styles.container3}>
    <Image
    style={styles.image}
    styleName="medium-avatar"
    source={headshot}
    />
    </View>
    <View style={styles.container}>
    <View style={{marginRight: 50}}>
    <Text>The Ultimate Color Picker is an application built by Pio Molina, a Developer and Musician based in Miami, FL.</Text>

    <Text style={styles.buttons}>Pio has been writing code for about a year and is actively seeking full-time employment in IT.</Text>
    <Image
    styleName="medium"
    source={signature}
    />

    </View>
    </View>
    <View style={styles.container2}>
    <Button
    styleName={'secondary'}
      onPress={() => {Linking.openURL('http://piomolina.com/')}}
      >
      <Text>Pio's Portfolio</Text>
    </Button>
    <Button
    style={{marginTop: 15}}
      onPress={() => { props.navigator.pop() }}
      >
      <Text>Back</Text>
    </Button>
    </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
    marginTop: -40,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  buttons: {
    marginTop: 10
  },
  container3: {
    flex: 1,
    marginTop: 150,
    alignItems: 'center',
  },
  image: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
  }
});

export default AboutPio;
