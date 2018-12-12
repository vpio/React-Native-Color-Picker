import React from 'react';
import {View, ScrollView} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

function sortColors(hexArr){
  console.log('YOOOOOOOOO')
  let noHash = hexArr.map((hex) => {
    return hex.substr(1)
  })
  let order = noHash.sort()
  return order
}

const SavedColors = props => {
  console.log(props.savedColors)
  return (
    <ScrollView>
        {
          sortColors(props.savedColors).map((color) => {
            console.log("colrs again", color)
            return (
                <ListItem
                key={`${color} color`}
                title={color}
                containerStyle={{'backgroundColor': `#${color}`}}
                />
            )
          })
        }
    </ScrollView>
  )
}

export default SavedColors;
