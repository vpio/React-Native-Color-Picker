import React from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, AsyncStorage, TabBarIOS } from 'react-native';

const TabIndex = props => {
  return (
    <TabBarIOS barStyle={'black'}>
      <TabBarIOS.Item
        translucent={true}
        selected={props.selectedTab === 'tab1'}
        systemIcon='search'
        onPress={() => props.changeTabs('tab1')}
        >
        {props._renderColorPicker()}
      </TabBarIOS.Item>
      <TabBarIOS.Item
        translucent={true}
        selected={props.selectedTab === 'tab2'}
        systemIcon='top-rated'
        onPress={() => props.changeTabs('tab2')}
        >
        {props._renderSavedColors()}
      </TabBarIOS.Item>
      <TabBarIOS.Item
        translucent={true}
        selected={props.selectedTab === 'tab3'}
        systemIcon='more'
        onPress={() => props.changeTabs('tab3')}
        >
        {props._renderMenu()}
      </TabBarIOS.Item>
    </TabBarIOS>
  )
}

export default TabIndex;
