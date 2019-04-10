/**
 * DiscoverPage zhuyu 2018/4/28
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  observer,
  inject,
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceItemView from '../../common/DeviceItemView';
import UserDefStatusBar from '../../common/StatusBar';

import style from '../../css/DiscoverPageStyle';

const PAGE_WORD = {
  // title: '发现',
  search: '扫描设备',
  pleaseLogin: '请先登录',
};
@inject('discoverDataStore', 'localDataStore', 'userDataStore')
@observer
export default class DiscoverPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.discoverDataStore = this.props.discoverDataStore;
    this.localDataStore = this.props.localDataStore;
    this.userDataStore = this.props.userDataStore;
  }

  static navigationOptions = {
    // tabBarLabel: PAGE_WORD.title,
  };

  searchDeviceEvent = async () => {

    if (this.userDataStore.jwtToken !== '') {
      fetch(`${this.localDataStore.url}/Device`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ this.userDataStore.jwtToken }`,
        },
        // body
      }).then((response) => {
        // console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request Error');
        }
      }).then((data) => {
        // console.log(data);
        data.forEach((value, index) => {
          let key = value.mac;
          let val = {
            key: value.mac,
            pk: value.pk,
            mac: value.mac,
            model: value.model,
            ip: value.lastIP,
            mode: value.deviceMode,
            accountName: value.accountName,
            apUserNum: value.apUserNum,
            download: value.download,
            guestsNum: value.guestsNum,
            lastHeartTime: value.lastHeartTime,
            name: value.name,
            ownModel: value.ownModel,
            privateIP: value.privateIP,
            sn: value.sn,
            state: value.state,
            supportMode: value.supportMode,
            upload: value.upload,
            version: value.version,
            deviceRadiosConfigs: value.deviceRadiosConfigs,
            deviceCommonConfig: value.deviceCommonConfig,
            deviceWlanConfigs: value.deviceWlanConfigs,
          };
          this.discoverDataStore.deviceBasicInfoMap.set(key, val);
        });
        // console.log(basicData);
      }).catch((error) => {
        console.log(error)
      });
    } else {
      alert(PAGE_WORD.pleaseLogin);
      this.props.navigation.navigate('Login');
    }

  };

  listHeaderComponent = () => {
    return (
      <View style = { style.listHeaderComponentView }>
        <View style = { style.listHeaderComponent }>
          <View style = { style.infoView }>
            <View style = { style.wifiInfoView }>
              <Text style = { style.wifi }>
                WIFI : { this.localDataStore.wifi }
              </Text>
            </View>
            <View style = { style.ipInfoView }>
              <Text style = { style.ip }>
                IP : { this.localDataStore.ip }
              </Text>
            </View>
          </View>
          <View style = { style.buttonView }>
            <TouchableOpacity
              style = { style.searchButton }
              onPress = { this.searchDeviceEvent.bind(this) }
            >
              <Icon
                name = 'search'
                style = { style.searchIcon }
              />
            </TouchableOpacity>
            <Text style = { style.buttonText }>
              { PAGE_WORD.search }
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderItem = ({
    item,
  }) => {
    let onPressEvent = null;
    switch (item.mode) {
      case 'fatAP':
        onPressEvent = () => {
          this.props.navigation.navigate('APSettingPage', {
            key: item.mac,
            mode: item.mode,
          });
        };
        break;
      case 'bridge':
        onPressEvent = () => {
          this.props.navigation.navigate('BridgeSettingPage', {
            key: item.mac,
            mode: item.mode,
          });
        };
        break;
      case 'client':
        onPressEvent = () => {
          this.props.navigation.navigate('ClientSettingPage', {
            key: item.mac,
            mode: item.mode,
          });
        };
        break;
      case 'fitAP':
        onPressEvent = () => {
          this.props.navigation.navigate('APSettingPage', {
            key: item.mac,
            mode: item.mode,
          });
        };
        break;
      default:
        onPressEvent = () => {
          alert('ok');
        };
        break;
    }
    return (
      <View>
        <DeviceItemView
          device = { item }
          onPressEvent = { onPressEvent }
        />
      </View>
    );
  };


  render() {
    let listHeaderComponent = this.listHeaderComponent.call(this);
    return (
      <View style={ style.container }>
        <UserDefStatusBar/>
        <FlatList
          data = { Array.from(this.discoverDataStore.deviceBasicInfoMap.values()) }
          ListHeaderComponent = { listHeaderComponent }
          renderItem = { this.renderItem.bind(this) }
        />
      </View>
    );
  }
}
