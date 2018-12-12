import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Divider, Switch, Button } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';

function sortColors(hexArr){
  let noHash = hexArr.map((hex) => {
    return hex.substr(1)
  })
  let order = noHash.sort()
  return order
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginLeft: 10
  }
})

const SavedColors = props => {
  console.log(props.savedColors)
  return (
    <ScrollView>
        {
          sortColors(props.savedColors).map((color, i) => {
            return (
              <Swipeable
                key={`color ${i}`}
                rightButtons={[
                  <TouchableHighlight>
                    <TouchableOpacity
                      onPress = {() => props.deleteColor(color)}
                      >
                      <View style={styles.container}><Text style={{'color':'white'}}>Delete</Text></View>
                    </TouchableOpacity>
                  </TouchableHighlight>
                ]}
                rightButtonWidth={60}
                rightButtonContainerStyle={{'backgroundColor': 'red'}}
                >
                <ListItem
                title={color}
                containerStyle={{'backgroundColor': `#${color}`}}
                />
              </Swipeable>
            )
          })
        }
    </ScrollView>
  )
}

export default SavedColors;
