/**
 * Input zhuyu 2018/4/04
 */

import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

export default class UserDefInput extends Component {
  render() {
    return (
      <TextInput
        { ...this.props }
        autoCapitalize={ 'none' }
        // clearButtonMode={ 'while-editing' }
      />
    );
  }
}
