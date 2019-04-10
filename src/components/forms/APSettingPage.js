/**
 * APSettingPage zhuyu 2018/8/23
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
  ScrollView,
  Picker,
  TextInput,
  Modal,
} from 'react-native';

import {
  observer,
  inject
} from 'mobx-react';

import {
  trace
} from 'mobx';

import Icon from 'react-native-vector-icons/FontAwesome';
import UserDefStatusBar from '../../common/StatusBar';

import style from '../../css/APSettingPageStyle';

const PAGE_WORD = {
  changeHistory: '修改历史',
  saveSetting: '保存配置',
  networkSetting: '网络配置',
  PPPOE: '拨号上网',
  DHCP: '动态分配',
  static: '静态地址',
  networkSettingProtocol: '上网方式',
  PPPOEUsername: '宽带账号',
  PPPOEPasswd: '宽带密码',
  IpAddress: 'IPv4地址',
  netMask: '子网掩码',
  gateWay: '网关',
  mainDNSServer: 'DNS服务器',
  spareDNSServer: '备用DNS(可选)',
  wifiSetting: '无线配置',
  advanceSetting: '高级配置(可选)',
  radioSetting2G: '2G射频卡配置',
  radioSetting5G: '5G射频卡配置',
  modeSetting: '模式配置',
  channel: '信道',
  bandWidth: '频宽',
  power: '功率',
  compatibility: '兼容性',
  modeSwitch: '模式切换',
  acAddress: 'AC地址',
  addWlan: '新建WLAN',
};

const ATTR_NAME = {
  IpAddress: 'IPv4地址',
  PPPOEPasswd: '宽带密码',
  PPPOEUsername: '宽带账号',
  acAddress: 'AC地址',
  bandWidth2G: '2G频宽',
  bandWidth5G: '5G频宽',
  channel2G: '2G信道',
  channel5G: '5G信道',
  compatibility2G: '2G兼容性',
  compatibility5G: '5G兼容性',
  gateWay: '网关',
  mainDNSServer: 'DNS服务器',
  maxPower2G: '2G最大功率',
  maxPower5G: '5G最大功率',
  modeSwitch: '模式',
  netMask: '子网掩码',
  networkSettingProtocol: '上网方式',
  power2G: '2G功率',
  power5G: '5G功率',
  radioMode: '射频卡模式',
  spareDNSServer: '备用DNS',
  wlanDelete: '删除WLAN',
  wlanAdd: '添加WLAN',

  passwd: '密码',
  radiosEnable: 'WLAN频率',
  safe: '加密',
  ssid: 'SSID',
  wlanID: 'ID',
  wlanService: 'WLAN开关',
};

class WifiSettingFlatListRenderItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  wifiSettingFlatListRenderItemOnPressEvent = ({
    item,
  }) => {
    let mode = this.props.navigation.getParam('mode');
    this.props.navigation.navigate('WlanSettingPage', {
      key: item.wlanID,
      pageType: 'change',
      mode: mode,
    });
  };

  render() {
    let item = this.props.item;
    let safe = item.safe === true ? '加密' : '未加密';
    return (
      <View style = { style.wifiSettingFlatListRenderItem }>
        <View style = { style.wifiSettingFlatListRenderItemIconView }>
          <Icon
            name = { 'wifi' }
            style = { style.wifiSettingFlatListRenderItemIcon }
          />
        </View>
        <View style = { style.wifiSettingFlatListRenderItemInfoView }>
          <Text style = { style.wifiSettingFlatListRenderItemInfo }>SSID : { item.ssid }</Text>
          <Text style = { style.wifiSettingFlatListRenderItemInfo }>Safe : { safe }</Text>
        </View>
        <View style = { style.wifiSettingFlatListRenderItemArrowButtonView }>
          <TouchableOpacity
            style = { style.wifiSettingFlatListRenderItemArrowButton }
            onPress = { this.wifiSettingFlatListRenderItemOnPressEvent.bind(this,{ item:item, }) }
          >
            <Icon
              style = { style.wifiSettingFlatListRenderItemArrowIcon }
              name = 'angle-right'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

class WifiSettingListFooterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  wifiSettingListFooterComponentOnPressEvent = () => {
    let store = this.props.store;
    let mode = this.props.navigation.getParam('mode');
    let key = ['0', '1', '2', '3'].filter((key) => {
      let res = store.wifiDataForFixMap.has(key);
      if (!res) {
        return key
      };
    })[0];
    if (key !== undefined) {
      this.props.navigation.navigate('WlanSettingPage', {
        key: key,
        pageType: 'add',
        mode: mode,
      });
    }
  };

  render() {
    return (
      <View style = { style.wifiSettingFlatListRenderItem }>
        <View style = { style.wifiSettingFlatListRenderItemIconView }>
          <Icon
            name = { 'plus' }
            style = { style.wifiSettingFlatListRenderItemIcon }
          />
        </View>
        <View style = { style.wifiSettingFlatListRenderItemInfoView }>
          <Text style = { style.wifiSettingFlatListRenderItemInfo }>{ PAGE_WORD.addWlan }</Text>
        </View>
        <View style = { style.wifiSettingFlatListRenderItemArrowButtonView }>
          <TouchableOpacity
            style = { style.wifiSettingFlatListRenderItemArrowButton }
            onPress = { this.wifiSettingListFooterComponentOnPressEvent.bind(this) }
          >
            <Icon
              style = { style.wifiSettingFlatListRenderItemArrowIcon }
              name = 'angle-right'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

@inject('discoverDataStore', 'userDataStore', 'localDataStore')
@observer
export default class APSettingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      networkSettingHide: false,
      wifiSettingHide: false,
      advanceSettingHide: true,
      PPPOEPasswdSecure: true,

      channel2GDataList: ['auto'].concat([...Array(14).keys()].splice(1).map(val => val.toString())),
      bandWidth2GDataList: ['auto', 'ht20', 'ht40'],
      power2GDataList: [],
      compatibility2GDataList: ['auto', '11ng', '11n', '11g'],
      channel5GDataList: ['auto', '36', '40', '44', '48', '52', '56', '60', '64', '149', '153', '157', '161', '165'],
      bandWidth5GDataList: ['auto', 'ht20', 'ht40', 'ht80'],
      power5GDataList: [],
      compatibility5GDataList: ['auto', '11ac', '11an'],
      modeSwitchDataList: ['fatAP', 'fitAP'],

      enabled: true,
      changeHistoryModalVisible: false,
      changeHistoryData: [],
    };

    this.discoverDataStore = this.props.discoverDataStore;
    this.userDataStore = this.props.userDataStore;

    this.key = this.props.navigation.getParam('key');
    this.keyDevice = this.discoverDataStore.deviceBasicInfoMap.get(this.key);

  }

  componentWillMount() {
    this.fetchAPSetting();
  };

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: navigation.getParam('key'),
    };
  };

  fetchAPSetting = () => {
    // console.log(this.discoverDataStore.deviceBasicInfoMap);
    if (this.keyDevice) {
      // console.log(this.keyDevice);
      let deviceRadiosConfigsUrlObject = {
        deviceRadiosConfigsUrl: this.keyDevice.deviceRadiosConfigs
      };
      let deviceWlanConfigsUrlObjectList = this.keyDevice.deviceWlanConfigs.map((value) => {
        return {
          deviceWlanConfigsUrl: value
        };
      });
      let deviceCommonConfigUrlObject = {
        deviceCommonConfigUrl: this.keyDevice.deviceCommonConfig
      };
      let urlObjectList = [deviceRadiosConfigsUrlObject, deviceCommonConfigUrlObject].concat(deviceWlanConfigsUrlObjectList.slice());

      // console.log(urlObjectList);

      let fetchDeviceConfig = (urlObject) => {
        let configKey = Object.keys(urlObject)[0];
        let url = urlObject[configKey];
        if (url) {
          return fetch(url, {
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
            return {
              [configKey]: data
            };
          }).catch((error) => {
            console.log(error);
            return Promise.reject();
          });
        } else {
          return Promise.reject();
        }
      };

      Promise.all(urlObjectList.map((urlObject) => {
        return fetchDeviceConfig(urlObject);
      })).then((data) => {
        // console.log(data);
        let deviceRadiosConfigs = {};
        let deviceCommonConfig = {};
        let deviceWlanConfigsList = [];

        data.forEach((obj) => {
          let configKey = Object.keys(obj)[0];
          let configValue = obj[configKey];
          switch (configKey) {
            case 'deviceRadiosConfigsUrl':
              deviceRadiosConfigs = configValue;
              break;
            case 'deviceCommonConfigUrl':
              deviceCommonConfig = configValue;
              break;
            case 'deviceWlanConfigsUrl':
              deviceWlanConfigsList.push(configValue);
          }
        });

        let deviceHyperlinkUrl = deviceRadiosConfigs.device || deviceCommonConfig.device;

        let netSetting = {
          [this.key]: {
            networkSettingProtocol: deviceCommonConfig.networkSettingProtocol || 'DHCP',
            PPPOEUsername: deviceCommonConfig.PPPOEUsername || '',
            PPPOEPasswd: deviceCommonConfig.PPPOEPasswd || '',
            IpAddress: deviceCommonConfig.IpAddress || '',
            netMask: deviceCommonConfig.netMask || '',
            gateWay: deviceCommonConfig.gateWay || '',
            mainDNSServer: deviceCommonConfig.mainDNSServer || '',
            spareDNSServer: deviceCommonConfig.spareDNSServer || '',
            channel2G: deviceRadiosConfigs.radios2Channel || 'auto',
            bandWidth2G: deviceRadiosConfigs.radios2Ht || 'auto',
            power2G: deviceRadiosConfigs.radios2Power || 'auto',
            compatibility2G: deviceRadiosConfigs.radios2Com || 'auto',
            channel5G: deviceRadiosConfigs.radios5Channel || 'auto',
            bandWidth5G: deviceRadiosConfigs.radios5Ht || 'auto',
            power5G: deviceRadiosConfigs.radios5Power || 'auto',
            compatibility5G: deviceRadiosConfigs.radios5Com || 'auto',
            modeSwitch: this.keyDevice.mode,
            acAddress: deviceCommonConfig.acAddress || '',
            radioMode: deviceRadiosConfigs.radiosType || 'both',
            maxPower2G: 20,
            maxPower5G: 25,
          },
        };

        let wifiData = new Map();
        deviceWlanConfigsList.forEach((data) => {
          let wifiDetail = {
            key: data.wlanID,
            wlanID: data.wlanID,
            ssid: data.wlanSSID,
            safe: data.passPhrase !== '' ? true : false,
            passwd: data.passPhrase,
            radiosEnable: data.radiosEnable,
            wlanService: data.wlanService,
          };
          wifiData.set(data.wlanID, wifiDetail);
        });


        this.discoverDataStore.changeDeviceNetSetingObject({
          data: netSetting,
        });
        this.discoverDataStore.deviceWifiDataMap.set(this.key, wifiData);

        this.discoverDataStore.changeDeviceHyperlinkUrl({
          data: deviceHyperlinkUrl,
        })
        // console.log(netSetting);
        // console.log(wifiData);
        // console.log(this.discoverDataStore.deviceNetSetingObject);
        // console.log(this.discoverDataStore.deviceWifiDataMap);


        let item = JSON.parse(JSON.stringify(this.discoverDataStore.deviceNetSetingObject[this.key]));
        let maxPower2G = item.hasOwnProperty('maxPower2G') && item.maxPower2G !== undefined ? parseInt(item.maxPower2G) : 20;
        let maxPower5G = item.hasOwnProperty('maxPower5G') && item.maxPower5G !== undefined ? parseInt(item.maxPower5G) : 20;

        let wifiList = new Map();
        this.discoverDataStore.deviceWifiDataMap.get(this.key).forEach((value, key) => {
          wifiList.set(key, JSON.parse(JSON.stringify(value)));
        });

        this.discoverDataStore.changeNetSetingForFixObject({
          data: item
        });
        this.discoverDataStore.changeWifiDataForFixMap({
          data: wifiList
        });
        // console.log(this.discoverDataStore.netSetingForFixObject);
        // console.log(this.discoverDataStore.wifiDataForFixMap);

        let mode = this.props.navigation.getParam('mode');
        let enabled = mode === 'fatAP' ? true : false;
        this.setState({
          power2GDataList: ['auto'].concat([...Array(maxPower2G + 1).keys()].splice(1).map(val => val.toString())),
          power5GDataList: ['auto'].concat([...Array(maxPower5G + 1).keys()].splice(1).map(val => val.toString())),
          enabled: enabled,
        });
      }).catch((error) => {
        console.log(error)
      });

    }
  }

  settingIconOnPressEvent = ({
    iconType
  }) => {
    this.setState((state) => ({
      [iconType]: !state[iconType],
    }));
  };

  wifiSettingFlatListRenderItem = ({
    item
  }) => {
    return (
      <WifiSettingFlatListRenderItemComponent
        key = { item.key }
        item = { item }
        navigation = { this.props.navigation }
      />
    );
  };

  wifiSettingListFooterComponent = () => {
    let footerView = !!(this.discoverDataStore.wifiDataForFixMap.size === 4 || this.state.enabled === false) ? null :
      (<WifiSettingListFooterComponent
      store = { this.discoverDataStore }
      navigation = { this.props.navigation }
      />);
    return footerView;
  };

  pickerItemList = ({
    data,
  }) => {
    return data.map((value) => {
      let name = value === 'auto' ? '自动' : value.toString();
      return (<Picker.Item label={ name.toUpperCase() } value={ value } key = { value }/>);
    });
  };

  radioSettingOnChangeEvent = ({
    pickerType
  }, itemValue, itemPosition, ) => {
    this.discoverDataStore.changeNetSetingForFixObjectSingleProperty({
      propertyType: pickerType,
      data: itemValue
    });
  };

  onChangeEventTextInput = ({
    inputType
  }, value) => {
    this.discoverDataStore.changeNetSetingForFixObjectSingleProperty({
      propertyType: inputType,
      data: value
    });
  };

  changeHistoryOnPressEvent = () => {
    let data = this.changeHistoryData();
    this.setState({
      changeHistoryData: data,
      changeHistoryModalVisible: true,
    });
  };

  changeHistoryModalButton = ({
    buttonType
  }) => {
    this.setState({
      changeHistoryModalVisible: false,
    });
  };

  changeHistoryListEmptyComponent = () => {
    return (
      <View style = { style.changeHistoryListEmptyComponentView }>

      </View>
    );
  };
  changeHistoryItemSeparatorComponent = () => {
    return (
      <View style = { style.changeHistoryItemSeparatorComponentView } ></View>
    );
  };

  changeHistoryRenderItem = ({
    item
  }) => {
    let changeDetail;
    switch (item.attr) {
      case 'wlanDelete':
        changeDetail = `删除WLAN ${ item.attrOldValue }`;
      case 'wlanAdd':
        changeDetail = `添加WLAN ${ item.attrNewValue }`;
      default:
        changeDetail = `由 ${ item.attrOldValue } 修改为 ${ item.attrNewValue }`;
    };

    return (
      <View style = { style.changeHistoryRenderItemView }>
        <View style = { style.attrNameView }>
          <Text style = { style.modalTextStyle }>
            { item.attrName }
          </Text>
        </View>
        <View style = { style.attrChangeDetailView }>
          <Text style = { style.modalTextStyle }>
            { changeDetail }
          </Text>
        </View>
      </View>
    );
  };

  changeHistoryData = () => {
    let netSetingForFixObject = this.discoverDataStore.netSetingForFixObject;
    let wifiDataForFixMap = this.discoverDataStore.wifiDataForFixMap;
    let netSeting = this.discoverDataStore.deviceNetSetingObject[this.key];
    let wifiList = this.discoverDataStore.deviceWifiDataMap.get(this.key);
    let data = [];

    let netSetDifference = [];
    Object.keys(netSeting).forEach((value) => {
      if (netSeting[value] !== netSetingForFixObject[value]) {
        netSetDifference.push({
          mac: this.key,
          attr: value,
          attrOldValue: netSeting[value],
          attrNewValue: netSetingForFixObject[value],
          attrName: ATTR_NAME[value],
        });
      }
    });
    // console.log(netSetDifference);
    // let oldWlanID = Array.from(wifiList.keys());
    // let newWlanID = Array.from(wifiDataForFixMap.keys());

    let wlanDelete = [];
    wifiList.forEach((value, index) => {
      if (!wifiDataForFixMap.has(index)) {
        wlanDelete.push({
          mac: this.key,
          attr: 'wlanDelete',
          attrOldValue: value.ssid,
          attrNewValue: '',
          attrName: ATTR_NAME['wlanDelete'],
          wlanID: value.wlanID,
        });
      }
    });
    let wlanAdd = [];
    wifiDataForFixMap.forEach((value, index) => {
      if (!wifiList.has(index)) {
        wlanAdd.push({
          mac: this.key,
          attr: 'wlanAdd',
          attrOldValue: '',
          attrNewValue: value.ssid,
          attrName: ATTR_NAME['wlanAdd'],
          wlanID: value.wlanID,
        });
      }
    });

    let wlanChange = [];
    wifiList.forEach((value, key) => {
      let fixValue = wifiDataForFixMap.get(key);
      Object.keys(value).forEach((objKey) => {
        if (objKey !== 'key' && (value[objKey] !== fixValue[objKey])) {
          wlanChange.push({
            mac: this.key,
            attr: 'wlanChange',
            attrOldValue: value[objKey],
            attrNewValue: fixValue[objKey],
            attrName: `WLAN${value.wlanID} ${ATTR_NAME[objKey]}`,
            wlanID: value.wlanID,
          });
        }
      });

    });

    data = data.concat(netSetDifference, wlanDelete, wlanAdd, wlanChange);

    return data;
  };

  saveSettingOnPressEvent = ({
    mode
  }) => {
    // this.discoverDataStore.showAllData();
    let netSetingForFixObject = this.discoverDataStore.netSetingForFixObject;
    let wifiDataForFixMap = this.discoverDataStore.wifiDataForFixMap;
    let jwtToken = this.userDataStore.jwtToken;
    let deviceHyperlinkUrl = this.discoverDataStore.deviceHyperlinkUrl;
    // console.log(netSetingForFixObject);
    // console.log(wifiDataForFixMap);
    if (mode === 'fitAP') {
      let deviceRadiosConfigsUrl = this.keyDevice.deviceRadiosConfigs;
      let deviceWlanConfigsUrlList = this.keyDevice.deviceWlanConfigs;
      let deviceCommonConfigUrl = this.keyDevice.deviceCommonConfig;

      let fetchRadiosConfigs = (() => {
        if (deviceRadiosConfigsUrl) {
          return fetch(deviceRadiosConfigsUrl, {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ jwtToken }`,
            },
            credentials: 'include',
            body: JSON.stringify({
              // device: deviceHyperlinkUrl,
              radiosType: netSetingForFixObject.radioMode,
              radios2Channel: netSetingForFixObject.channel2G,
              radios2Ht: netSetingForFixObject.bandWidth2G,
              radios2Power: netSetingForFixObject.power2G,
              radios2Com: netSetingForFixObject.compatibility2G,
              radios5Channel: netSetingForFixObject.channel5G,
              radios5Ht: netSetingForFixObject.bandWidth5G,
              radios5Power: netSetingForFixObject.power5G,
              radios5Com: netSetingForFixObject.compatibility5G,
            }),
          }).then((response) => {
            // console.log(response);
            if (response.ok) {
              // console.log(response.json());
              return Promise.resolve();
            } else {
              // console.log(response.json());
              throw new Error('Request Error');
            }
          }).catch((error) => {
            // console.log(error);
            return Promise.reject();
          });
        } else {
          return Promise.reject();
        }
      })();

      let fetchCommonConfig = (() => {
        if (deviceCommonConfigUrl) {
          return fetch(deviceCommonConfigUrl, {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ jwtToken }`,
            },
            credentials: 'include',
            body: JSON.stringify({
              acAddress: netSetingForFixObject.acAddress,
              networkSettingProtocol: netSetingForFixObject.networkSettingProtocol,
              PPPOEUsername: netSetingForFixObject.PPPOEUsername,
              PPPOEPasswd: netSetingForFixObject.PPPOEPasswd,
              IpAddress: netSetingForFixObject.IpAddress,
              netMask: netSetingForFixObject.netMask,
              gateWay: netSetingForFixObject.gateWay,
              mainDNSServer: netSetingForFixObject.mainDNSServer,
              spareDNSServer: netSetingForFixObject.spareDNSServer,
            }),
          }).then((response) => {
            // console.log(response);
            if (response.ok) {
              // console.log(response.json());
              return Promise.resolve();
            } else {
              // console.log(response.json());
              throw new Error('Request Error');
            }
          }).catch((error) => {
            // console.log(error);
            return Promise.reject();
          });
        } else {
          return Promise.reject();
        }
      })();
      let fetchWlanConfigsList = deviceWlanConfigsUrlList.map((url, indexInt) => {
        if (url) {
          let index = indexInt.toString();
          return fetch(url, {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ jwtToken }`,
            },
            credentials: 'include',
            body: JSON.stringify({
              wlanID: wifiDataForFixMap.get(index).wlanID,
              wlanSSID: wifiDataForFixMap.get(index).ssid,
              wlanService: wifiDataForFixMap.get(index).wlanService,
              passPhrase: wifiDataForFixMap.get(index).passwd,
              radiosEnable: wifiDataForFixMap.get(index).radiosEnable,
            }),
          }).then((response) => {
            // console.log(response);
            if (response.ok) {
              // console.log(response.json());
              return Promise.resolve();
            } else {
              // console.log(response.json());
              throw new Error('Request Error');
            }
          }).catch((error) => {
            // console.log(error);
            return Promise.reject();
          });
        } else {
          return Promise.reject();
        }
      });

      Promise.all([fetchRadiosConfigs, fetchCommonConfig, ...fetchWlanConfigsList]).then(() => {
        alert('ok');
      }).catch((error) => {
        console.log(error);
        alert('error');
      });

    }



  };

  render() {
    // trace();
    let netSetingForFixObject = this.discoverDataStore.netSetingForFixObject;
    let wifiDataForFixMap = this.discoverDataStore.wifiDataForFixMap;
    // console.log(netSetingForFixObject);
    // console.log(wifiDataForFixMap);
    let networkSettingIcon = this.state.networkSettingHide === false ? 'angle-down' : 'angle-up';
    let wifiSettingIcon = this.state.wifiSettingHide === false ? 'angle-down' : 'angle-up';
    let advanceSettingIcon = this.state.advanceSettingHide === false ? 'angle-down' : 'angle-up';
    let PPPOEPasswdSecureIcon = this.state.PPPOEPasswdSecure === true ? 'eye-slash' : 'eye';
    let networkSettingDetailView = null;
    let networkSettingHeight = 70;
    switch (netSetingForFixObject.networkSettingProtocol) {
      case 'PPPOE':
        networkSettingHeight = 150;
        networkSettingDetailView = (
          <View style = { style.networkSettingDetailPPPOEView }>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.PPPOEUsername }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <TextInput
                  style = { style.networkSettingDetailInputStyle }
                  autoCapitalize = { 'none' }
                  onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'PPPOEUsername' }) }
                  defaultValue = { netSetingForFixObject.PPPOEUsername }
                  editable = { this.state.enabled }
                />
              </View>
            </View>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.PPPOEPasswd }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <View style = { style.passwdInputPartView }>
                  <TextInput
                    style = { style.networkSettingDetailInputStyle }
                    autoCapitalize = { 'none' }
                    onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'PPPOEPasswd' }) }
                    defaultValue = { netSetingForFixObject.PPPOEPasswd }
                    secureTextEntry = { this.state.PPPOEPasswdSecure }
                    editable = { this.state.enabled }
                  />
                </View>
                <View style = { style.passwdIconPartView }>
                  <TouchableOpacity
                    onPress = { this.settingIconOnPressEvent.bind(this,{ iconType:'PPPOEPasswdSecure' }) }
                  >
                    <Icon
                      name = { PPPOEPasswdSecureIcon }
                      style = { style.titleIcon }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        );
        break;
      case 'DHCP':
        networkSettingHeight = 70;
        break;
      case 'static':
        networkSettingHeight = 270;
        networkSettingDetailView = (
          <View style = { style.networkSettingDetailStaticView }>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.IpAddress }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <TextInput
                  style = { style.networkSettingDetailInputStyle }
                  autoCapitalize = { 'none' }
                  onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'IpAddress' }) }
                  defaultValue = { netSetingForFixObject.IPAddress }
                  editable = { this.state.enabled }
                />
              </View>
            </View>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.netMask }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <TextInput
                  style = { style.networkSettingDetailInputStyle }
                  autoCapitalize = { 'none' }
                  onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'netMask' }) }
                  defaultValue = { netSetingForFixObject.netMask }
                  editable = { this.state.enabled }
                />
              </View>
            </View>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.gateWay }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <TextInput
                  style = { style.networkSettingDetailInputStyle }
                  autoCapitalize = { 'none' }
                  onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'gateWay' }) }
                  defaultValue = { netSetingForFixObject.gateWay }
                  editable = { this.state.enabled }
                />
              </View>
            </View>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.mainDNSServer }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <TextInput
                  style = { style.networkSettingDetailInputStyle }
                  autoCapitalize = { 'none' }
                  onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'mainDNSServer' }) }
                  defaultValue = { netSetingForFixObject.mainDNSServer }
                  editable = { this.state.enabled }
                />
              </View>
            </View>
            <View style = { style.networkSettingDetailInputView }>
              <View style = { style.networkSettingDetailInputTitle }>
                <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.spareDNSServer }</Text>
              </View>
              <View style = { style.networkSettingDetailInput }>
                <TextInput
                  style = { style.networkSettingDetailInputStyle }
                  autoCapitalize = { 'none' }
                  onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'spareDNSServer' }) }
                  defaultValue = { netSetingForFixObject.spareDNSServer }
                  editable = { this.state.enabled }
                />
              </View>
            </View>

          </View>
        );
        break;
    };
    let networkSettingView = this.state.networkSettingHide === false ? (
      <View style = { [style.networkSettingView,{ height:networkSettingHeight }] }>
        <View style = { style.networkSettingProtocolView }>
          <View style = { style.networkSettingDetailInputTitle }>
            <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.networkSettingProtocol }</Text>
          </View>
          <View style = { style.networkSettingDetailInput }>
            <Picker
              onValueChange = { this.radioSettingOnChangeEvent.bind(this,{ pickerType:'networkSettingProtocol' }) }
              selectedValue = { netSetingForFixObject.networkSettingProtocol }
              style = { style.networkSettingProtocolPicker }
              enabled = { this.state.enabled }
            >
              <Picker.Item label = { PAGE_WORD.PPPOE } value = { 'PPPOE' } key = { 'PPPOE' }/>
              <Picker.Item label = { PAGE_WORD.DHCP } value = { 'DHCP' } key = { 'DHCP' }/>
              <Picker.Item label = { PAGE_WORD.static } value = { 'static' } key = { 'DHCP' }/>
            </Picker>
          </View>
        </View>
        { networkSettingDetailView }
      </View>) : null;
    let wifiSettingHeight = 90;
    switch (wifiDataForFixMap.size) {
      case 0:
        break;
      case 1:
        wifiSettingHeight = 150;
        break;
      case 2:
        wifiSettingHeight = 210;
        break;
      case 3:
        wifiSettingHeight = 270;
        break;
      case 4:
        wifiSettingHeight = 270;
        break;
    };
    // console.log(wifiDataForFixMap);
    // console.log(Array.from(wifiDataForFixMap.values()));
    let wifiSettingView = this.state.wifiSettingHide === false ? (
      <View style = { [style.wifiSettingView,{ height:wifiSettingHeight }] }>
        <FlatList
          renderItem = { this.wifiSettingFlatListRenderItem.bind(this) }
          data = { Array.from(wifiDataForFixMap.values()) }
          ListFooterComponent = { this.wifiSettingListFooterComponent.bind(this) }
        />
      </View>
    ) : null;
    let acAddressView = netSetingForFixObject.modeSwitch === 'fitAP' ? (
      <View style = { style.networkSettingDetailInputView }>
        <View style = { style.networkSettingDetailInputTitle }>
          <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.acAddress }</Text>
        </View>
        <View style = { style.networkSettingDetailInput }>
          <TextInput
            style = { style.networkSettingDetailInputStyle }
            autoCapitalize = { 'none' }
            onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'acAddress' }) }
            defaultValue = { netSetingForFixObject.acAddress }
            editable = { this.state.enabled }
          />
        </View>
      </View>) : null;
    let advanceSettingView = this.state.advanceSettingHide === false ? (
      <View style = { [style.advanceSettingView,{ height:600 }] }>
        <View style = { style.advanceSettingTitleView }>
          <Text style = { style.advanceSettingTitle }>{ PAGE_WORD.radioSetting2G }</Text>
        </View>
        <View style = { style.radioSettingView }>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.channel }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'channel2G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.channel2G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.channel2GDataList}) }
              </Picker>
            </View>
          </View>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.bandWidth }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'bandWidth2G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.bandWidth2G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.bandWidth2GDataList}) }
              </Picker>
            </View>
          </View>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.power }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'power2G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.power2G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.power2GDataList}) }
              </Picker>
            </View>
          </View>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.compatibility }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'compatibility2G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.compatibility2G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.compatibility2GDataList}) }
              </Picker>
            </View>
          </View>

        </View>
        <View style = { style.advanceSettingTitleView }>
          <Text style = { style.advanceSettingTitle }>{ PAGE_WORD.radioSetting5G }</Text>
        </View>
        <View style = { style.radioSettingView }>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.channel }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'channel5G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.channel5G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.channel5GDataList}) }
              </Picker>
            </View>
          </View>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.bandWidth }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'bandWidth5G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.bandWidth5G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.bandWidth5GDataList}) }
              </Picker>
            </View>
          </View>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.power }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'power5G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.power5G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.power5GDataList}) }
              </Picker>
            </View>
          </View>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.compatibility }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'compatibility5G'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.compatibility5G }
                // enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.compatibility5GDataList}) }
              </Picker>
            </View>
          </View>

        </View>
        <View style = { style.advanceSettingTitleView }>
          <Text style = { style.advanceSettingTitle }>{ PAGE_WORD.modeSetting }</Text>
        </View>
        <View style = { style.radioSettingModeView }>
          <View style = { style.networkSettingDetailInputView }>
            <View style = { style.networkSettingDetailInputTitle }>
              <Text style = { style.networkSettingDetailInputTitleText }>{ PAGE_WORD.modeSwitch }</Text>
            </View>
            <View style = { style.networkSettingDetailInput }>
              <Picker
                onValueChange = { this.radioSettingOnChangeEvent.bind(this,{pickerType:'modeSwitch'}) }
                style = { style.radioPicker }
                selectedValue = { netSetingForFixObject.modeSwitch }
                enabled = { this.state.enabled }
              >
                { this.pickerItemList.call(this,{ data:this.state.modeSwitchDataList}) }
              </Picker>
            </View>
          </View>
          { acAddressView }
        </View>
      </View>

    ) : null;
    return (
      <View style = { style.container }>
        <Modal
          visible = { this.state.changeHistoryModalVisible }
          onRequestClose = { this.changeHistoryModalButton.bind(this,{ buttonType:'cancel' }) }
          transparent = { true }
          animationType = { 'fade' }
        >
          <View style = { style.modalBackView }>
            <View style = { style.changeHistoryModalView }>
              <View style = { style.changeHistoryModalListHeaderComponentView }>
                <Text style = { style.modalTextStyle }>
                  { '修改历史' }
                </Text>
              </View>
              <View style = { style.changeHistoryModalInfoView }>
                <FlatList
                  ListEmptyComponent = { this.changeHistoryListEmptyComponent.bind(this) }
                  renderItem = { this.changeHistoryRenderItem.bind(this) }
                  ItemSeparatorComponent = { this.changeHistoryItemSeparatorComponent.bind(this) }
                  data = { this.state.changeHistoryData }
                />
              </View>
              <View style = { style.changeHistoryModalListFooterComponentView }>
                <TouchableOpacity
                  style = { style.changeHistoryModalListFooterComponentButton }
                  onPress = { this.changeHistoryModalButton.bind(this,{ buttonType:'cancel' }) }
                >
                  <Text style = { style.modalTextStyle }>
                    { '关闭' }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style = { style.mainView }>
          <ScrollView>
            <View style = { style.titleView }>
              <View style = { style.titleTextView }>
                <Text style = { style.titleText }>{ PAGE_WORD.networkSetting }</Text>
              </View>
              <View style = { style.titleButtonView }>
                <TouchableOpacity
                  style = { style.titleButton }
                  onPress = { this.settingIconOnPressEvent.bind(this,{ iconType:'networkSettingHide' }) }
                >
                  <Icon
                    name = { networkSettingIcon }
                    style = { style.titleIcon }
                  />
                </TouchableOpacity>
              </View>
            </View>
            { networkSettingView }
            <View style = { style.titleView }>
              <View style = { style.titleTextView }>
                <Text style = { style.titleText }>{ PAGE_WORD.wifiSetting }</Text>
              </View>
              <View style = { style.titleButtonView }>
                <TouchableOpacity
                  style = { style.titleButton }
                  onPress = { this.settingIconOnPressEvent.bind(this,{ iconType:'wifiSettingHide' }) }
                >
                  <Icon
                    name = { wifiSettingIcon }
                    style = { style.titleIcon }
                  />
                </TouchableOpacity>
              </View>
            </View>
            { wifiSettingView }
            <View style = { style.titleView }>
              <View style = { style.titleTextView }>
                <Text style = { style.titleText }>{ PAGE_WORD.advanceSetting }</Text>
              </View>
              <View style = { style.titleButtonView }>
                <TouchableOpacity
                  style = { style.titleButton }
                  onPress = { this.settingIconOnPressEvent.bind(this,{ iconType:'advanceSettingHide' }) }
                >
                  <Icon
                    name = { advanceSettingIcon }
                    style = { style.titleIcon }
                  />
                </TouchableOpacity>
              </View>
            </View>
            { advanceSettingView }
          </ScrollView>
        </View>
        <View style = { style.bottomButtonView }>
          <View style = { style.saveSettingButtonView }>
            <TouchableOpacity
              style = { style.saveSettingButton }
              onPress = { this.changeHistoryOnPressEvent.bind(this) }
            >
              <Text style = { style.saveSettingButtonTextStyle }>
                { PAGE_WORD.changeHistory }
              </Text>
            </TouchableOpacity>
          </View>
          <View style = { style.saveSettingButtonView }>
            <TouchableOpacity
              style = { style.saveSettingButton }
              onPress = { this.saveSettingOnPressEvent.bind(this,{ mode:netSetingForFixObject.modeSwitch }) }
            >
              <Text style = { style.saveSettingButtonTextStyle }>
                { PAGE_WORD.saveSetting }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
