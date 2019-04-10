/**
 * MinePage zhuyu 2018/4/28
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Image,
} from 'react-native';

import {
  inject,
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';


import style from '../../css/MinePageStyle';

const PAGE_WORD = {
  // title: '我的',
  userPrompt: '点击头像登录',
};

@inject('userDataStore', 'localDataStore')
@observer
export default class MinePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.userDataStore = this.props.userDataStore;
    this.localDataStore = this.props.localDataStore;
  }

  static navigationOptions = {
    // tabBarLabel: PAGE_WORD.title,
  };

  sectionsData = () => {
    let showData = [{
      key: 0,
      title: '语言',
      info: this.localDataStore.language,
      event: null,
    }, {
      key: 1,
      title: '版本号',
      info: this.localDataStore.version,
      event: null,
    }, {
      key: 2,
      title: '版本更新',
      info: this.userDataStore.updateVersion,
      event: null,
    }, {
      key: 3,
      title: 'QQ群号',
      info: this.localDataStore.qq,
      event: null,
    }, ];
    // let showArrow = [{
    //   key: 0,
    //   title: '用户反馈',
    //   info: null,
    //   event: null,
    // }, {
    //   key: 1,
    //   title: '特别鸣谢',
    //   info: null,
    //   event: null,
    // }, ];
    let showArrow = this.userDataStore.jwtToken === '' ? [] : [{
      key: 0,
      title: 'AC相关',
      info: null,
      event: () => {
        this.props.navigation.navigate('ACInfoPage');
      },
    }];

    let userData = this.userDataStore.userData;
    let data = [{
      title: 'showDataButton',
      data: showData,
    }, {
      title: 'showArrowButton',
      data: showArrow,
    }, ]
    return data
  };

  renderItem = ({
    item
  }) => {
    // let event = item.event !== null ? item.event : (() => {
    //   alert('ok');
    // });
    let event = item.event;
    let infoView = item.info !== null ? (<Text style = { style.infoText }>{ item.info }</Text>) : (<Icon name = 'angle-right' style = { style.infoIcon } />);
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
            { infoView }
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  listHeaderComponent = () => {
    let userData = this.userDataStore.userData;
    let infoText = this.userDataStore.jwtToken === '' ? PAGE_WORD.userPrompt : (userData.name === '' ? userData.username : userData.name);
    let event = this.userDataStore.jwtToken !== '' ? () => {
      // alert('ok');
    } : () => {
      this.props.navigation.navigate('Login');
    };
    return (
      <View style = { style.userRenderItemView }>
        <TouchableOpacity
          onPress = { event }
          style = { style.userButton }
        >
          <View style = { style.headImageView }>
            <Image
              style = { style.headImage }
              source = { userData.headImage }
            />
          </View>
          <View style = { style.userInfoView }>
            <Text style = { style.userInfoText }>
              { infoText }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderSectionHeader = () => {
    return (
      <View style = { style.renderSectionHeader }/>
    );
  };


  render() {
    let data = this.sectionsData.call(this);
    return (
      <View style = { style.container }>
        <SectionList
          sections = { data }
          renderItem = { this.renderItem.bind(this) }
          renderSectionHeader = { this.renderSectionHeader }
          ListHeaderComponent = { this.listHeaderComponent }
        />
      </View>
    );
  }
}
