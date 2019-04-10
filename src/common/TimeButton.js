/**
 * TimeButton zhuyu 2018/4/18
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class TimeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      event = () => {},
    } = this.props;
    return (
      <Text
        style = { this.props.style }
        onPress = { event }
        >
        { this.props.text }
      </Text>
    );
  }
}
