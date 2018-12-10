import React from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, AsyncStorage, TabBarIOS } from 'react-native';
import { Divider, Header, Button } from 'react-native-elements';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    toggle: false,
    pan: new Animated.ValueXY(),
    hex: '',
    colorArr: [],
    selectedTab: ''
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

  render() {
    let {hex} = this.state
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
      <View style={[styles.container, this.state.toggle && {'backgroundColor': hex}]} >
        {/*<Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle]}
          />*/}
        <Button onPress={()=> {
            this.setState({toggle: true})
            this.getRandomColor()
        }}
        title='Change!'/>
        <Button onPress={()=> this.saveColor()} title='Save This Color'/>
        <Button onPress={()=> this.showColor()} title='Show Last Saved'/>
        <Divider style={{ backgroundColor: 'blue' }} />
        <Text>
          {this.state.colorArr}
        </Text>
      </View>
      <TabBarIOS>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tab1'}
          systemIcon='top-rated'
          onPress={() => this.changeTabs('tab1')}
          >
          <View>
            <Text>Tab 1</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tab2'}
          systemIcon='top-rated'
          onPress={() => this.changeTabs('tab2')}
          >
          <View>
            <Text>Tab 2</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tab3'}
          systemIcon='top-rated'
          onPress={() => this.changeTabs('tab3')}
          >
          <View>
            <Text>Tab 3</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    </React.Fragment>
    );
  }
}

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
  // altColor: {
  //   backgroundColor: getRandomColor()
  // },
});
