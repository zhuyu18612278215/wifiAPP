/**
 * HeaderBackImage zhuyu 2018/8/2
 */


import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  iconStyle: {
    fontSize: 30,
    color: '#fff',
    // marginLeft: 20,
    // backgroundColor: 'green',
    // flex: 1,
  },
});

export default class HeaderBackImage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View >
        <Icon name="angle-left" style={ style.iconStyle }/>
      </View>
    );
  }

};
