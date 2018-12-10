import React from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, AsyncStorage, TabBarIOS } from 'react-native';
import { Divider, Header, Button } from 'react-native-elements';

const ColorPicker = props => {
  return (
    <View style={[styles.container, props.toggle && {'backgroundColor': props.hex}]}>
      <Button onPress={()=> {
          props.getRandomColor()
      }}
      title='Change!'/>
      <Button onPress={()=> props.saveColor()} title='Save This Color'/>
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
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});
