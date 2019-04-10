/**
 * StatusBar zhuyu 2018/7/26
 */


import React, {
  Component
} from 'react';
import {
  StatusBar,
  View,
} from 'react-native';

export default class UserDefStatusBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      backgroundColor = '#464646',
        translucent = false,
        barStyle = 'light-content',
    } = this.props;
    return (
      <StatusBar
        backgroundColor = { backgroundColor }
        translucent = { translucent }
        barStyle = { barStyle }
        { ...this.props }
      />
    );
  }
}
