import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Divider, Switch, Button } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { Title, NavigationBar, DropDownMenu } from '@shoutem/ui';
import ColorFilter from './ColorFilter.js';

function sortColors(hexArr){
  let noHash = hexArr.map((hex) => {
    return hex.substr(1)
  })
  let order = noHash.sort()
  return order
}

const styles = StyleSheet.create({
  container2: {
    marginTop: 20,
    marginLeft: 10
  },
  center2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentContainer: {
    paddingTop: 200
  }
})

const SavedColors = props => {
  console.log(props.savedColors)
  if (props.savedColors.length > 0){
  return (
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
        >
        <ColorFilter />
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
                      <View style={styles.container2}><Text style={{'color':'white'}}>Delete</Text></View>
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
  )}
  else {
    return (
      <View style={styles.center2}>
        <Title styleName="line-through" >Aint no colors here</Title>
      </View>
    )
  }
}


export default SavedColors;
