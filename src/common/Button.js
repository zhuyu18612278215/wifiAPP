/**
 * Button zhuyu 2018/3/30
 */

import React, {
  Component
} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import style from '../css/ButtonStyle';

export default class UserDefButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 1,
    };
  }

  onPressEvent = () => {
    const {
      event = () => {
        alert('OK');
      },
    } = this.props;
    event();
  };

  render() {
    const {
      text = 'OK',
        buttonStyle = {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(255, 255, 255, 0.8)',
        },
        buttonTextStyle = {
          color: 'rgba(255, 255, 255, 0.8)',
        },
    } = this.props;

    return (
      <View style = { style.container }>
        <TouchableOpacity style = { [style.button,buttonStyle] }>
          <Text
            style = { [style.buttonText,buttonTextStyle] }
            onPress = { this.onPressEvent }
          >
            { text }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}
