import React from 'react';
import { View, StyleSheet, PanResponder, Animated, AsyncStorage, TabBarIOS, Modal, TouchableHighlight } from 'react-native';
import { Divider, Header } from 'react-native-elements';
import { Button, Text } from '@shoutem/ui';
import { Haptic } from 'expo';

const ColorPicker = props => {
  return (
    <View style={[styles.container, props.toggle && {'backgroundColor': props.hex}]}>
      <Button
        styleName="clear"
        onPress={()=> {
          props.getRandomColor()
          Haptic.selection()
        }}
      >
        <Text>Change!</Text>
      </Button>

      <Button
        onPress={()=> {
          props.saveColor()
          Haptic.selection()
        }}
        style={styles.button}
        >
        <Text>Save This Color</Text>
      </Button>
      <Divider style={{ backgroundColor: 'blue' }} />
    </View>
  )
}

export default ColorPicker;

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: "black",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  button: {
    marginTop: 30
  }
});
