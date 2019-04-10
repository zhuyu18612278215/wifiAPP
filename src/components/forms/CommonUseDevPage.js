/**
 * CommonUseDevPage zhuyu 2018/4/28
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
import style from '../../css/CommonUseDevPageStyle';
import DeviceItemView from '../../common/DeviceItemView';

const PAGE_WORD = {
  commonUseDev: '常用设备',
  bindDev: '绑定设备',
  historyDev: '历史设备',
};

@observer
export default class CommonUseDevPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.commonUseDev,
    };
  };

  renderItem = ({
    item
  }) => {
    return (
      <View>
        <DeviceItemView
          // image = {}
          model = { item.model }
          mac = { item.mac }
          ip = { item.ip }
          // onPressEvent = {}
        />
      </View>
    );

  };

  sectionsData = () => {
    let store = this.props.navigation.getParam('store');
    let data = [{
      data: store.bindDeviceList,
      title: PAGE_WORD.bindDev,
    }, {
      data: store.historyDeviceList,
      title: PAGE_WORD.historyDev,
    }];
    return data;
  };

  renderSectionHeader = ({
    section
  }) => {
    return (
      <View>
        <View style = { style.renderSectionHeader }/>
        <View style = { style.renderSectionHeaderView }>
          <View style = { style.renderSectionHeaderTitleView }>
            <Text style = { style.renderSectionHeaderTitle }>
              { section.title }
            </Text>
          </View>
        </View>
      </View>
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
