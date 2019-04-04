import React from 'react';
import { StyleSheet } from 'react-native';
import { View, ImageBackground, Tile, Overlay, Title, Caption, Button, Text } from '@shoutem/ui';
import { Font, AppLoading, Haptic } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


const StartPage = props => {
  return(
    <View>
      <ImageBackground
        styleName="featured"
        source={ require('../assets/images/6320.jpg') }

        style={{marginTop: 200}}
        >
        <View style={styles.container}>
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
                props.start();
                Haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
              }}
              styleName="full-width">
              <Text>Start</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default StartPage;
