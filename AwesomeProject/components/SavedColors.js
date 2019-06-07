import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, StyleSheet, TouchableOpacity, Button, Alert  } from 'react-native';
import { ListItem, Divider, Switch} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { Title, DropDownMenu, Icon, Tile } from '@shoutem/ui';
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
    flex: 1,
    marginTop: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 200
  },
  leftContent: {
    alignItems: 'flex-end',
    paddingRight: 10,
    marginTop: 18
  },
  itemContainer: {
    height: 50
  },
  squares: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start'
  }
})

class SavedColors extends React.Component {
  state = {
    edit: true,
    view: 'List View'
  }

  deleteAll = () => {
    this.props.deleteAll();
  }

  changeView = (car) => {
    console.log('this car', car);
    this.setState({view: car.filterStyle})
    console.log('view changed to squares');
  }

  render() {
    const colorOptions =
    <TouchableHighlight
      onPress={(e) => console.log(e.value)}
      >
      <Icon name="close" />
    </TouchableHighlight>
    console.log(this.props.savedColors)
    if (this.props.savedColors.length > 0 && this.state.view === 'List View'){
    return (
        <ScrollView
          stickyHeaderIndices={[0]}
          contentContainerStyle={styles.ContentContainer}
          >
          <Button title={'New'} onPress={() => {this.deleteAll()}}/>
          <ColorFilter changeView={this.changeView}/>
          {
            sortColors(this.props.savedColors).map((color, i) => {
              const savedColor =
              <Swipeable
                key={`color ${i}`}
                rightButtons={[
                  <TouchableHighlight>
                    <TouchableOpacity
                      onPress = {() => this.props.deleteColor(color)}
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
              return (
                savedColor
              )
            })
          }
        </ScrollView>
    )}
    else if (this.props.savedColors.length > 0 && this.state.view === 'Squares') {
      console.log('in square view')
      return (
          <ScrollView
            stickyHeaderIndices={[0]}
            contentContainerStyle={styles.ContentContainer}
            >
            <Button title={'New'} onPress={() => {this.deleteAll()}}/>
            <ColorFilter changeView={this.changeView}/>
            <View style={styles.squares}>
            {
              sortColors(this.props.savedColors).map((color, i) => {
                const savedColor =
                  <Tile
                    key={`color ${i}`}
                    style={{height: 80, width: 80, backgroundColor: `#${color}`, margin: 4}}
                    >
                  </Tile>

                return (
                  savedColor
                )
              })
            }
            </View>
          </ScrollView>
      )
    }
    else {
      return (
        <ScrollView
          stickyHeaderIndices={[0]}
          contentContainerStyle={styles.ContentContainer}
          >
          <View style={styles.center2}>
            <Title styleName="line-through" >Aint no colors here</Title>
          </View>
        </ScrollView>
      )
    }
  }
}


export default SavedColors;
