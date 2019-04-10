/**
 * DeviceItemView zhuyu 2018/8/2
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

import style from '../css/DeviceItemViewStyle';

export default class DeviceItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {
      image = require('../components/img/test.jpg'),
        model = '',
        mac = '',
        ip = '',
        mode = '',
    } = this.props.device;
    let {
      onPressEvent = () => {
        alert('ok');
      },
    } = this.props;
    return (
      <View style = { style.renderItemView }>
        <View style = { style.imgView }>
          <Image
            style = { style.devImg }
            source = { image }
          />
        </View>
        <View style = { style.devInfoView }>
          <Text style = { style.devInfo }>Name : { model }</Text>
          <Text style = { style.devInfo }>MAC : { mac }</Text>
          <Text style = { style.devInfo }>IP : { ip }</Text>
          <Text style = { style.devInfo }>Mode : { mode }</Text>
        </View>
        <View style = { style.arrowButtonView }>
          <TouchableOpacity
            style = { style.arrowButton }
            onPress = { onPressEvent }
          >
            <Icon
              style = { style.arrowIcon }
              name = 'angle-right'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
