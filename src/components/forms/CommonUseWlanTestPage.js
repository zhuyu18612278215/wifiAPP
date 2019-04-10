/**
 * CommonUseWlanTestPage zhuyu 2018/8/3
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
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/CommonUseWlanTestPageStyle';
import DeviceItemView from '../../common/DeviceItemView';

const PAGE_WORD = {
  commonUseWlanTest: '无线测试',

};

@observer
export default class CommonUseWlanTestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.commonUseWlanTest,
    };
  };

  sectionsData = () => {
    let data = [{
      data: [{
        title: '环境扫描',
        event: null,
      }],
      title: 'environmentalScanning',
    }, {
      data: [{
        title: '漫游测试',
        event: null,
      }],
      title: 'roamingTest',
    }, ];
    return data;
  };

  renderItem = ({
    item
  }) => {
    let store = this.props.navigation.getParam('store');
    let event = item.event !== null ? (() => {
      this.props.navigation.navigate(item.event, {
        store: store,
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
        <SectionList
          sections = { sections }
          renderItem = { this.renderItem.bind(this) }
          renderSectionHeader = { this.renderSectionHeader.bind(this) }
        />
      </View>
    );
  }
}
