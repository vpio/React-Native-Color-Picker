import React from 'react';
import Alert from 'react-native';
import { Divider, Header, Button } from 'react-native-elements';
import axios from 'axios';
import TabIndex from './components/TabIndex';
import ColorPicker from './components/ColorPicker';
import SavedColors from './components/SavedColors';
import Menu from './components/Menu';
import { Font, AppLoading } from 'expo';
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
    modalVisible: false,
    fontsAreLoaded: false,
    appStart: false
  }


  async componentWillMount(){
    this.showColor()

    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({ fontsAreLoaded: true });
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
                axios.get('http://10.1.10.211:3000/api/v1/users/current', {
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
      axios.get('http://10.1.10.211:3000/api/v1/users/current', {
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
    let {hex, colorArr} = this.state
    // uncomment this if saved data gets deleted in order to set an initial value
    // AsyncStorage.setItem("myKey", hex)``
    let addedColor = this.state.colorArr.concat(hex)
    console.log(addedColor)
    this.setState({colorArr: addedColor})
    AsyncStorage.setItem("myKey", JSON.stringify(colorArr))
        // this.setState({"myKey": hex});
    // console.log("hi")
    // axios.post('http://localhost:3001/api/v1/colors.json', {color: {hex_code: hex}})
  }

  deleteColor = (hex) => {
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
    console.log("doing what were supposed to here")
    AsyncStorage.getItem("myKey").then((value) =>
           JSON.parse(value))
           .then(json => {
             console.log("dont be null ", json)
             if(json !== null){
               this.setState({colorArr: json})
             }
             console.log("what has this become ", this.state.colorArr)
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

    axios.post('http://10.1.10.211:3000/api/v1/user_token', {
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

      axios.get('http://10.1.10.211:3000/api/v1/users/current', {
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
    console.log("should also be gucci", this.state.colorArr)
    return(
      <SavedColors
        savedColors = {this.state.colorArr}
        deleteColor = {this.deleteColor}
        />
    )
  }

  onLogOutMenu = () => {
    if (this.state.selectedTab === 'tab1' || this.state.selectedTab === 'tab2'){
      return true
    }
    else{
      return false
    }
  }

  _renderMenu = () => {
    return(
      <NavigatorIOS
      translucent={ true }
      navigationBarHidden={true}
      initialRoute={{
           component: Menu,
           title: 'Menu',
           passProps: {
             start: () => { this.setState({ appStart: true }) },
             login: this.handleSubmit,
             user: this.state.user,
             loggedIn: this.state.loggedIn,
             logOut: this.handleLogOut,
             onTab: this.onLogOutMenu(),
             appStart: this.state.appStart

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
    const {loggedIn, user, modalVisible, appStart} = this.state

    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    else if (!appStart){
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
