/**
 * CommonUseNetTestPage zhuyu 2018/8/3
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
import style from '../../css/CommonUseNetTestPageStyle';
import DeviceItemView from '../../common/DeviceItemView';

const PAGE_WORD = {
  commonUseNetTest: '网络检测',

};

@observer
export default class CommonUseNetTestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.commonUseNetTest,
    };
  };

  sectionsData = () => {
    let data = [{
      data: [{
        title: 'Ping测试',
        event: 'PingTestCheckPage',
      }],
      title: 'ping',
    }, {
      data: [{
        title: '路由追踪',
        event: null,
      }],
      title: 'routeTracking',
    }, {
      data: [{
        title: '网络测速',
        event: null,
      }, ],
      title: 'networkSpeedtest',
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
