import React from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, AsyncStorage, TabBarIOS } from 'react-native';
import { Divider, Header, Button } from 'react-native-elements';
import axios from 'axios';
import TabIndex from './components/TabIndex';
import ColorPicker from './components/ColorPicker';
import SavedColors from './components/SavedColors';

export default class App extends React.Component {
  state = {
    toggle: false,
    pan: new Animated.ValueXY(),
    hex: '',
    colorArr: [],
    selectedTab: 'tab1'
  }

  componentDidMount(){
    this.showColor()
  }

  componentWillMount(){
    axios.get('http://localhost:3001/api/v1/colors.json')
          .then(response => {
              console.log("hello it worked *******", response)
              // this.setState({
              //     lists: response.data
              // })
          })
          .catch(error => console.log("hello please work **********", error))

    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderRelease: (e, gesture) => {
         // this.state.pan.flattenOffset();
       Animated.spring(this.state.pan, {
         toValue: { x: 0, y: 0 },
         friction: 5
       }).start();
     }
    });
    this.state.pan.setValue({ x:0, y:0})
  }

  getRandomColor = () => {
    if (this.state.toggle === false){
      this.setState({toggle: true})
    }
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setState({hex: color})
    console.log("here is the hex: ", this.state.hex)
    return color;
  }

  saveColor = () => {
    let {hex} = this.state
    let {colorArr} = this.state
    let addedColor = this.state.colorArr.concat(hex)
    this.setState({colorArr: addedColor})
    AsyncStorage.setItem("myKey", JSON.stringify(colorArr))
        // this.setState({"myKey": hex});
    // console.log("hi")
    // axios.post('http://localhost:3001/api/v1/colors.json', {color: {hex_code: hex}})
  }

  showColor = () => {
    AsyncStorage.getItem("myKey").then((value) =>
           JSON.parse(value))
           .then(json => {
             this.setState({colorArr: json})
           })
           .catch(error => console.log('error!'))
           .done();
  }

  changeTabs = (tabId) => {
    this.setState({
      selectedTab: tabId
    })
  }

  _renderColorPicker = () => {
    return(
        <ColorPicker
          colorArr = {this.state.colorArr}
          saveColor = {this.saveColor}
          showColor = {this.showColor}
          getRandomColor = {this.getRandomColor}
          toggle = {this.state.toggle}
          hex = {this.state.hex}
          />
    )
  }

  _renderSavedColors = () => {
    return(
      <SavedColors
        savedColors = {this.state.colorArr}
        />
    )
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <React.Fragment>
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: `Pio's Dope app`, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          />
      </View>
      <TabIndex
        changeTabs = {(item) => this.changeTabs(item)}
        selectedTab = {this.state.selectedTab}
        _renderColorPicker = {() => this._renderColorPicker()}
        _renderSavedColors = {() => this._renderSavedColors()}
        />
    </React.Fragment>
    );
  }
}
