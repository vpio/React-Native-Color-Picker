import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { View, ImageBackground, Tile, Overlay, Title, Caption, Button, Text } from '@shoutem/ui';
import { Font, AppLoading, Haptic } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


class StartPage extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  onLoad = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 800,           
      }
    ).start();
  }

  componentDidMount() {
    this.onLoad()
  }

  render(){
    let { fadeAnim } = this.state;
    return(
      <View>
        <ImageBackground
          styleName="featured"
          source={ require('../assets/images/6320.jpg') }
          style={{marginTop: 200}}
          >
          <Animated.View
            style={styles.container, [
              {
                opacity: fadeAnim,

              }
            ]}>
            <View style={{marginTop: 150}}>
              <Tile styleName="clear">
                <Overlay>
                  <Title >Color Picker App 2019</Title>
                  <Caption>Made by Pio M.</Caption>
                </Overlay>
              </Tile>
            </View>
            <View style={{marginTop: 200}}styleName="horizontal flexible">
              <Button
                onPress={() => {
                  this.props.start();
                  Haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
                }}
                styleName="full-width">
                <Text>Start</Text>
              </Button>
            </View>
          </Animated.View >
        </ImageBackground>
      </View>
    );
  }
}

export default StartPage;
