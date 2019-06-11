import React from 'react';
import axios from 'axios';
import TabIndex from './components/TabIndex';
import ColorPicker from './components/ColorPicker';
import SavedColors from './components/SavedColors';
import Menu from './components/Menu';
import { Font, AppLoading, Asset } from 'expo';
import StartPage from './components/StartPage';
import { AsyncStorage, NavigatorIOS, AlertIOS, Alert, Linking } from 'react-native';
import LoggedInPage from './components/LoggedInPage';


export default class App extends React.Component {
  state = {
    toggle: false,
    hex: '#ffffff',
    colorArr: [],
    selectedTab: 'tab1',
    loggedIn: false,
    user: {},
    user_token: '',
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

    await Asset.fromModule(require('./assets/images/Pio_HQ_Headshot2.jpg')).downloadAsync();
    await Asset.fromModule(require('./assets/images/rainbow7.png')).downloadAsync();
    await Asset.fromModule(require('./assets/images/signature.png')).downloadAsync();

    this.setState({ fontsAreLoaded: true });

    AsyncStorage.getItem("myToken")
           .then((value) => {
             if (value) {
               this.setState({
                 user_token: value,
                 loggedIn: true
                })
                axios.get('https://color-picker-mobile.herokuapp.com/api/v1/users/current', {
                  headers: {
                    "Authorization": `Bearer ${this.state.user_token}`,
                    "Content-Type": `application/json`
                  }
                })
                .then((response) => {
                  this.setState({
                    user: response.data ,
                  })
                })
                .catch((e) => { console.log(e.message) } )
             }
           })
           .catch(error => console.log('error!'))
           .done();

  // If the user has a token, send the following request to get their info
    if (this.state.user_token){
      console.log('doing this')
      axios.get('https://color-picker-mobile.herokuapp.com/api/v1/users/current', {
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
    // console.log(addedColor)
    this.setState({colorArr: addedColor})
    AsyncStorage.setItem("myKey", JSON.stringify(colorArr))
  }

  deleteColor = (hex) => {
    // These console logs are for debugging delete via AsyncStorage

    // console.log("here is the hex that got transmitted: ", hex)
    let {colorArr} = this.state
    // console.log("Array that it is getting removed from: ", colorArr)
    let index = this.state.colorArr.indexOf(`#${hex}`)
    // console.log("this is the index of that hex: ", index)
    let deletedColor = colorArr.splice(index, 1)
    // console.log("deleting this color: ", deletedColor)

    AsyncStorage.setItem("myKey", JSON.stringify(colorArr))
    this.setState({colorArr})
  }

  deleteAll = () => {
    Alert.alert(
      'Are you sure you want to delete your palette?',
      `This action can't be undone!`,
      [
        {text: 'Yes', onPress: () => this.actualDelete() },
        {text: 'Share', onPress: () => this.setState({selectedTab: 'tab3'})},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }
      ],
      {cancelable: false},
    );
  }

  actualDelete = () => {
    this.setState({colorArr: [], selectedTab: 'tab1', hex: '#ffffff'});
    AsyncStorage.setItem("myKey", '')
  }

  showColor = () => {
    AsyncStorage.getItem("myKey").then((value) =>
           JSON.parse(value))
           .then(json => {
             if(json !== null){
               this.setState({colorArr: json})
             }
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
    axios.post('https://color-picker-mobile.herokuapp.com/api/v1/user_token', {
      auth: {
        "email": email,
        "password": password
      }
    })
    .then((response) => {
      this.setState({
        user_token: response.data.jwt
      });

      axios.get('https://color-picker-mobile.herokuapp.com/api/v1/users/current', {
        headers: {
          "Authorization": `Bearer ${this.state.user_token}`,
          "Content-Type": `application/json`
        }
      })
      .then((response) => {
        this.setState({
          user: response.data ,
          loggedIn: true
        })
        AsyncStorage.setItem("myToken", this.state.user_token)
      })
      .catch((e) => {
        console.log(e.message)
      } )
    })
    .catch((e) => {
      Alert.alert(
          'Something Went Wrong',
          `Please check your info and try again`,
          [
            {
              text: 'Okay',
              style: 'cancel',
            }
          ],
          {cancelable: false},
        )
       console.log(e) })
  }

  handleLogOut = () => {
      this.setState({
        loggedIn: false,
        user_token: ''
      })

    AsyncStorage.setItem("myToken", '')
  }

  shareColors = () => {
    const {user, colorArr} = this.state
    let colors = colorArr.join('')
    axios.post('https://color-picker-mobile.herokuapp.com/api/v1/palettes/create', {
      headers: {
        "Authorization": `Bearer ${this.state.user_token}`,
        "Content-Type": `application/json`
      },
      data: {
        user: user.email,
        colors: colors
      }
    }).then(() => {
      console.log('posted')
      Alert.alert(
        'Palette Shared Successfully!',
        `Visit piomolina.com/colorpicker to view your palette`,
        [
          {text: 'Visit', onPress: () => Linking.openURL('http://piomolina.com/colorpicker')},
          {
            text: 'Okay',
            style: 'cancel',
          }
        ],
        {cancelable: false},
      );;
    }).catch(() => {
      Alert.alert(
          'Something Went Wrong',
          `Please try again later`,
          [
            {
              text: 'Okay',
              style: 'cancel',
            }
          ],
          {cancelable: false},
        )
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
    return (
      <SavedColors
        savedColors = {this.state.colorArr}
        deleteColor = {this.deleteColor}
        deleteAll = {this.deleteAll}
        />
    );
  }


  _renderMenu = () => {
    console.log('state.loggedIn ', this.state.loggedIn)
    return(
      <NavigatorIOS
        translucent={ true }
        navigationBarHidden={true}
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
    );
  }

  _renderLogPage = () => {
    return (
      <LoggedInPage user={this.state.user} handleLogOut={this.handleLogOut} shareColors={this.shareColors}/>
    )
  }

  startApp = () => {
    this.setState({ appStart: true });
  }

  render() {
    const {loggedIn, user, appStart} = this.state

    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    else if (!appStart){
      return (
        <StartPage
          start={() => { this.startApp() }}
          appStart={this.state.appStart}
          />
      );
    }
    else if (!loggedIn){
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
    } else {
      return (
        <React.Fragment>
        <TabIndex
          changeTabs = {(item) => this.changeTabs(item)}
          selectedTab = {this.state.selectedTab}
          _renderColorPicker = {() => this._renderColorPicker()}
          _renderSavedColors = {() => this._renderSavedColors()}
          _renderMenu = {() => this._renderLogPage()}
          />
      </React.Fragment>
      );
    }
  }
}
