/**
 * PromptIconText zhuyu 2018/4/18
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class PromptIconText extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      iconSize = 18,
        iconName = 'exclamation-circle',
    } = this.props;
    return (
      <Text style = { this.props.style }>
        <Icon
          name = { iconName }
          size = { iconSize }
        />
        { this.props.text }
      </Text>
    );
  }
}
