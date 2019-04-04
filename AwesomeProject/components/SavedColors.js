import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, StyleSheet, TouchableOpacity, Button, Alert  } from 'react-native';
import { ListItem, Divider, Switch} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { Title, DropDownMenu, Icon } from '@shoutem/ui';
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
    marginTop: 18,
    marginLeft: 10
  },
  center2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentContainer: {
    paddingTop: 200
  },
  leftContent: {
    alignItems: 'flex-end',
    paddingRight: 10,
    marginTop: 18
  },
  itemContainer: {
    height: 50

  }
})

class SavedColors extends React.Component {
  state = {
    edit: true
  }


  render() {
    const colorOptions =
    <TouchableHighlight
      onPress={(e) => console.log(e.value)}
      >
      <Icon name="close" />
    </TouchableHighlight>
    let leftButton = this.state.edit ? colorOptions : null;
    console.log(this.props.savedColors)
    if (this.props.savedColors.length > 0){
    return (
        <ScrollView
          stickyHeaderIndices={[0]}
          contentContainerStyle={styles.contentContainer}
          >
          <Button onPress={() => this.setState({edit: true})} title={"edit"}/>
          <Button onPress={() => this.setState({edit: false})} title={"done"}/>
          <Button onPress={() =>  {
            Alert.alert(
                   'Alert Title',
                   'My Alert Msg',
                   [
                     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                     {
                       text: 'Cancel',
                       onPress: () => console.log('Cancel Pressed'),
                       style: 'cancel',
                     },
                     {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ],
                   {cancelable: false},
                 );
            }
          } title={"alert"}/>

          {
            sortColors(this.props.savedColors).map((color, i) => {
              const savedColor =
                  <View key={`color ${i}`}>
                    <ListItem
                      leftIcon={leftButton}
                      title={color}
                      titleStyle={{'display': 'none'}}
                      containerStyle={[{'backgroundColor': `#${color}`}, styles.itemContainer]}
                      />
                  </View>
              return (
                savedColor
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
}


export default SavedColors;
