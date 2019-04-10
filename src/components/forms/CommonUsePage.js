/**
 * CommonUsePage zhuyu 2018/4/28
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  inject,
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/CommonUsePageStyle';
import UserDefStatusBar from '../../common/StatusBar';


const PAGE_WORD = {
  // title: '常用',
};

@inject('discoverDataStore')
@observer
export default class CommonUsePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    // title: PAGE_WORD.title,
  };

  sectionsData = () => {
    let data = [{
      data: [{
        title: '常用设备',
        event: 'CommonUseDevPage',
      }],
      title: 'showDevs',
    }, {
      data: [{
        title: '常用工具',
        event: 'CommonUseToolPage',
      }],
      title: 'showTools',
    }, {
      data: [{
        title: '网络检测',
        event: 'CommonUseNetTestPage',
      }, {
        title: '无线测试',
        event: 'CommonUseWlanTestPage',
      }],
      title: 'showTest',
    }, ];
    return data;
  };

  renderItem = ({
    item
  }) => {
    let event = item.event !== null ? (() => {
      this.props.navigation.navigate(item.event, {
        store: discoverDataStore,
      });
    }) : (() => {
      alert('ok');
    });
    return (
      <View style = { style.renderItemView }>
        <TouchableOpacity
          onPress = { event }
          style = { style.renderItemButton }
        >
          <View style = { style.renderItemViewTitleView }>
            <Text style = { style.renderItemViewTitle }>
              { item.title }
            </Text>
          </View>
          <View style = { style.renderItemViewInfoView }>
            <Icon name = 'angle-right' style = { style.infoIcon } />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderSectionHeader = ({
    section
  }) => {
    return (
      <View style = { style.renderSectionHeader }/>
    );
  };

  render() {
    let sections = this.sectionsData.call(this);
    return (
      <View style = { style.container }>
        <UserDefStatusBar/>
        <SectionList
          sections = { sections }
          renderItem = { this.renderItem.bind(this) }
          renderSectionHeader = { this.renderSectionHeader.bind(this) }
        />
      </View>
    );
  }
}
