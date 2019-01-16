import React from 'react';
import { Divider, Header, Button } from 'react-native-elements';
import axios from 'axios';
import TabIndex from './components/TabIndex';
import ColorPicker from './components/ColorPicker';
import SavedColors from './components/SavedColors';
import Menu from './components/Menu';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  AsyncStorage,
  TabBarIOS,
  NavigatorIOS,
  Modal,
  TouchableHighlight
} from 'react-native';

export default class App extends React.Component {
  state = {
    toggle: false,
    pan: new Animated.ValueXY(),
    hex: '#ffffff',
    colorArr: [],
    selectedTab: 'tab1',
    loggedIn: false,
    user: {},
    user_token: '',
    modalVisible: false
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

    // this._val = { x:0, y:0 }
    // this.state.pan.addListener((value) => this._val = value);
    //
    // this.panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: (e, gesture) => true,
    //   onPanResponderMove: Animated.event([
    //     null, { dx: this.state.pan.x, dy: this.state.pan.y }
    //   ]),
    //   onPanResponderGrant: (e, gestureState) => {
    //     // Set the initial value to the current state
    //     this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
    //     this.state.pan.setValue({x: 0, y: 0});
    //   },
    //   onPanResponderRelease: (e, gesture) => {
    //      // this.state.pan.flattenOffset();
    //    Animated.spring(this.state.pan, {
    //      toValue: { x: 0, y: 0 },
    //      friction: 5
    //    }).start();
    //  }
    // });
    // this.state.pan.setValue({ x:0, y:0})

    AsyncStorage.getItem("myToken")
           .then((value) => {
             if (value) {
               console.log("intercepted")
               this.setState({
                 user_token: value,
                 loggedIn: true
                })
                axios.get('http://192.168.7.228:3000/api/v1/users/current', {
                  headers: {
                    "Authorization": `Bearer ${this.state.user_token}`,
                    "Content-Type": `application/json`
                  }
                })
                .then((response) => {
                  console.log("option 1")
                  this.setState({
                    user: response.data ,
                  })
                })
                .catch((e) => { console.log(e.message) } )
               console.log(this.state.user_token)
             }
           })
           .catch(error => console.log('error!'))
           .done();
  // If the user has a token, send the following request to get their info
    if (this.state.user_token){
      console.log('doing this')
      axios.get('http://192.168.7.228:3000/api/v1/users/current', {
        headers: {
          "Authorization": `Bearer ${this.state.user_token}`,
          "Content-Type": `application/json`
        }
      })
      .then((response) => {
        console.log("option 2")
        console.log("current user", response) })
      .catch((e) => { console.log(e) } )
    }
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
    // uncomment this if saved data gets deleted in order to set an initial value
    // AsyncStorage.setItem("myKey", hex)
    let {colorArr} = this.state
    let addedColor = this.state.colorArr.concat(hex)
    console.log(addedColor)
    this.setState({colorArr: addedColor})
    AsyncStorage.setItem("myKey", JSON.stringify(colorArr))
        // this.setState({"myKey": hex});
    // console.log("hi")
    // axios.post('http://localhost:3001/api/v1/colors.json', {color: {hex_code: hex}})
  }

  deleteColor = (hex) => {
    console.log("here is the hex that got transmitted: ", hex)
    let {colorArr} = this.state
    console.log("Array that it is getting removed from: ", colorArr)
    let index = this.state.colorArr.indexOf(`#${hex}`)
    console.log("this is the index of that hex: ", index)
    let deletedColor = colorArr.splice(index, 1)
    console.log("deleting this color: ", deletedColor)

    AsyncStorage.setItem("myKey", JSON.stringify(colorArr))
    this.setState({colorArr})

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

  handleSubmit = (email, password) => {
    console.log("got the right end point", email)

    axios.post('http://192.168.7.228:3000/api/v1/user_token', {
      auth: {
        "email": email,
        "password": password
      }
    })
    .then((response) => {
      this.setState({
        user_token: response.data.jwt,
        selectedTab: 'tab1'
       })
      console.log("user token", response.data.jwt)

      axios.get('http://192.168.7.228:3000/api/v1/users/current', {
        headers: {
          "Authorization": `Bearer ${this.state.user_token}`,
          "Content-Type": `application/json`
        }
      })
      .then((response) => {
        this.setState({
          user: response.data ,
          loggedIn: true,
          modalVisible: true
        })
        AsyncStorage.setItem("myToken", this.state.user_token)
        console.log(response.data)
      })
      .catch((e) => { console.log(e.message) } )
    })
    .catch((e) => { console.log(e) })
  }

  handleLogOut = () => {

      this.setState({
        loggedIn: false,
        user_token: ''
      })

    AsyncStorage.setItem("myToken", '')
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible})
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
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          />
    )
  }

  _renderSavedColors = () => {
    return(
      <SavedColors
        savedColors = {this.state.colorArr}
        deleteColor = {this.deleteColor}
        />
    )
  }

  _renderMenu = () => {
    return(
      <NavigatorIOS
      translucent={ false }
      initialRoute={{
           component: Menu,
           title: 'Menu',
           passProps: {
             login: this.handleSubmit,
             user: this.state.user,
             loggedIn: this.state.loggedIn,
             logOut: this.handleLogOut
           }
         }}
         style={{flex: 1}}
      />
    )
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    const {loggedIn, user, modalVisible} = this.state

    if (!loggedIn){
      return (
        <React.Fragment>
          {this._renderMenu()}
        </React.Fragment>
      )
    }
    else {
      console.log("user info: ", user)
      return (
        <React.Fragment>
        <View>
          <Header
            centerComponent={{ text: `Palette Picker`, style: { color: '#fff' } }}
            />
        </View>
        <TabIndex
          changeTabs = {(item) => this.changeTabs(item)}
          selectedTab = {this.state.selectedTab}
          _renderColorPicker = {() => this._renderColorPicker()}
          _renderSavedColors = {() => this._renderSavedColors()}
          _renderMenu = {() => this._renderMenu()}
          />
      </React.Fragment>
      );
    }

  }
}
