/**
 * WlanSettingPage zhuyu 2018/8/28
 */

import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  CheckBox,
} from 'react-native';

import {
  observer,
  inject,
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/WlanSettingPageStyle';

const PAGE_WORD = {
  cancelChange: '取消修改',
  cancelAdd: '取消添加',
  save: '保存WLAN',
  delete: '删除WLAN',
  changeWLAN: '修改WLAN',
  addWLAN: '新建WLAN',
  ssid: 'SSID',
  safe: '加密',
  passwd: '密码',
};

@inject('discoverDataStore', )
@observer
export default class WlanSettingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwdSecure: true,
      modalVisible: false,
      modalInfo: '',
      modalType: '',
    };

    this.discoverDataStore = this.props.discoverDataStore;
    this.key = this.props.navigation.getParam('key');
    this.pageType = this.props.navigation.getParam('pageType');
    this.mode = this.props.navigation.getParam('mode');
  }

  static navigationOptions = ({
    navigation
  }) => {
    let title = this.pageType === 'add' ? PAGE_WORD.addWLAN : PAGE_WORD.changeWLAN;
    return {
      headerTitle: title,
    };
  };

  onChangeEventInput = ({
    inputType
  }, value) => {
    this.discoverDataStore.changeoneWifiDataForFixObjectSingleProperty({
      propertyType: inputType,
      data: value
    });
  };

  cancelOnPressEvent = () => {
    this.props.navigation.navigate('APSettingPage');
  };

  wlanSettingOnPressEvent = ({
    buttonType
  }) => {
    let modalInfo = buttonType === 'save' ? '确定保存此次修改么?' : '确定要删除此WLAN?';
    this.setState((state) => ({
      modalType: buttonType,
      modalInfo: modalInfo,
      modalVisible: true,
    }));

  };

  modalButtonOnPress = ({
    buttonType
  }) => {
    this.setState({
      modalVisible: false,
    });
    let modalType = this.state.modalType;
    if (buttonType === 'cancel') {

    } else if (buttonType === 'sure') {
      if (modalType === 'save') {
        let data = JSON.parse(JSON.stringify(this.discoverDataStore.oneWifiDataForFixObject));
        data.passwd = data.safe === false ? '' : data.passwd;
        // console.log(data);
        this.discoverDataStore.wifiDataForFixMap.set(this.key, data);
      } else if (modalType === 'delete') {
        this.discoverDataStore.wifiDataForFixMap.delete(this.key);
      }
      this.props.navigation.navigate('APSettingPage');
    }
  };



  componentWillMount() {
    let wlanData = this.pageType === 'change' ? this.discoverDataStore.wifiDataForFixMap.get(this.key) : {
      key: String(this.key),
      wlanID: this.key,
      ssid: '',
      safe: false,
      passwd: '',
    };
    this.discoverDataStore.changeOneWifiDataForFixObject({
      data: JSON.parse(JSON.stringify(wlanData)),
    });
    // this.discoverDataStore.showAllData();
  };

  onPressEventIcon = ({
    iconType
  }) => {
    this.setState((state) => ({
      [iconType]: !state[iconType],
    }));
  };

  render() {
    let passwdSecureIcon = this.state.passwdSecure === true ? 'eye-slash' : 'eye';
    let oneWifiDataForFixObject = this.discoverDataStore.oneWifiDataForFixObject;
    let wlanSettingPasswdView = oneWifiDataForFixObject.safe === true ? (
      <View style = { style.wlanSettingView }>
        <View style = { style.settingChangeView }>
          <View style = { style.settingTitleView }>
            <Text style = { style.settingTitleText }>{ PAGE_WORD.passwd }</Text>
          </View>
          <View style = { style.settingInputView }>
            <View style = { style.passwdInputPartView }>
              <TextInput
                style = { style.settingInput }
                autoCapitalize = { 'none' }
                onChangeText = { this.onChangeEventInput.bind(this,{ inputType:'passwd' }) }
                defaultValue = { oneWifiDataForFixObject.passwd }
                secureTextEntry = { this.state.passwdSecure }
              />
            </View>
            <View sstyle = { style.passwdIconPartView }>
              <TouchableOpacity
                onPress = { this.onPressEventIcon.bind(this,{ iconType:'passwdSecure' }) }
              >
                <Icon
                  name = { passwdSecureIcon }
                  style = { style.titleIcon }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>) : (<View style = { style.wlanSettingView }/>);

    let deleteWlanButton = !!(this.pageType === 'add' || this.mode === 'fitAP') ? null :
      (<View style = { style.saveSettingButtonView }>
        <TouchableOpacity
          style = { style.saveSettingButton }
          onPress = { this.wlanSettingOnPressEvent.bind(this,{ buttonType:'delete' }) }
        >
          <Text style = { style.saveSettingButtonTextStyle }>
            { PAGE_WORD.delete }
          </Text>
        </TouchableOpacity>
      </View>);
    let cancelText = this.pageType === 'add' ? PAGE_WORD.cancelAdd : PAGE_WORD.cancelChange;
    return (
      <View style = { style.container }>
        <Modal
          visible = { this.state.modalVisible }
          onRequestClose = { this.modalButtonOnPress.bind(this,{ buttonType:'cancel' }) }
          transparent = { true }
          animationType = { 'fade' }
        >
          <View style = { style.modalBackView }>
            <View style = { style.modalView }>
              <View style = { style.modalInfoView }>
                <Text style = { style.modalTextStyle }>
                  { this.state.modalInfo }
                </Text>
              </View>
              <View style = { style.modalButtonAllView }>
                <View style = { style.modalButtonView }>
                </View>
                <View style = { style.modalButtonView }>
                </View>
                <View style = { style.modalButtonView }>
                  <TouchableOpacity
                    style = { style.modalButton }
                    onPress = { this.modalButtonOnPress.bind(this,{ buttonType:'cancel' }) }
                  >
                    <Text style = { style.modalTextStyle }>
                      { '取消' }
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style = { style.modalButtonView }>
                  <TouchableOpacity
                    style = { style.modalButton }
                    onPress = { this.modalButtonOnPress.bind(this,{ buttonType:'sure' }) }
                  >
                    <Text style = { style.modalTextStyle }>
                      { '确定' }
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style = { style.mainView }>
          <View style = { style.allWlanSettingView }>
            <View style = { style.wlanSettingView }>
              <View style = { style.settingChangeView }>
                <View style = { style.settingTitleView }>
                  <Text style = { style.settingTitleText }>{ PAGE_WORD.ssid }</Text>
                </View>
                <View style = { style.settingInputView }>
                  <TextInput
                    style = { style.settingInput }
                    autoCapitalize = { 'none' }
                    onChangeText = { this.onChangeEventInput.bind(this,{ inputType:'ssid' }) }
                    defaultValue = { oneWifiDataForFixObject.ssid }
                  />
                </View>
              </View>
            </View>
            <View style = { style.wlanSettingView }>
              <View style = { style.settingChangeView }>
                <View style = { style.settingTitleView }>
                  <Text style = { style.settingTitleText }>{ PAGE_WORD.safe }</Text>
                </View>
                <View style = { style.settingInputView }>
                  <CheckBox
                    onValueChange = { this.onChangeEventInput.bind(this,{ inputType:'safe' }) }
                    value = { oneWifiDataForFixObject.safe }
                  />
                </View>
              </View>
            </View>
            { wlanSettingPasswdView }
          </View>

        </View>
        <View style = { style.bottomButtonView }>
          <View style = { style.saveSettingButtonView }>
            <TouchableOpacity
              style = { style.saveSettingButton }
              onPress = { this.cancelOnPressEvent.bind(this) }
            >
              <Text style = { style.saveSettingButtonTextStyle }>
                { cancelText }
              </Text>
            </TouchableOpacity>
          </View>
          <View style = { style.saveSettingButtonView }>
            <TouchableOpacity
              style = { style.saveSettingButton }
              onPress = { this.wlanSettingOnPressEvent.bind(this,{ buttonType:'save' }) }
            >
              <Text style = { style.saveSettingButtonTextStyle }>
                { PAGE_WORD.save }
              </Text>
            </TouchableOpacity>
          </View>
          { deleteWlanButton }
        </View>
      </View>
    );
  }
}
