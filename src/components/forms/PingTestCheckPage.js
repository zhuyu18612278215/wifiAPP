/**
 * PingTestCheckPage zhuyu 2018/8/10
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
  TextInput,
  CheckBox,
} from 'react-native';
import {
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/PingTestCheckPageStyle';


const PAGE_WORD = {
  pingTest: 'Ping测试',
  confirm: '确定',
  pleaseInputIP: '请输入IP地址',
  settingTitle: '设置',
  commonUseTitle: '常用地址',
  interval: '间隔时间',
  overtime: '超时时间',
  dataPack: '数据包大小',
  unlimited: '无限Ping',
  timeSuffix: '秒',
  dataPackSuffix: '字节',
  limitedPack: 'Ping次数',
  limitedPackSuffix: '个',
};

@observer
export default class PingTestCheckPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ip: '',
      interval: '1',
      overtime: '1',
      dataPack: '56',
      unlimited: false,
      limitedPack: '3',
    };
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.pingTest,
    };
  };

  flatListData = () => {
    let data = [
      [{
        key: 'gateway',
        icon: 'retweet',
        title: '网关',
        ip: '192.168.1.1',
      }, {
        key: 'DNS',
        icon: 'server',
        title: 'DNS',
        ip: '114.114.114.114',
      }, {
        key: 'baidu',
        icon: 'paw',
        title: '百度',
        ip: 'www.baidu.com',
      }, ],
    ];
    // {
    //     icon: 'plus',
    //     title: '添加',
    //   },
    return data;
  };

  intervalOnChangeText = (text) => {
    this.setState({
      interval: text,
    });
  };
  overtimeOnChangeText = (text) => {
    this.setState({
      overtime: text,
    });
  };
  dataPackOnChangeText = (text) => {
    this.setState({
      dataPack: text,
    });
  };
  unlimitedOnValueChange = (text) => {
    this.setState({
      unlimited: text,
    });
    // console.log(text);
  };
  limitedPackOnChangeText = (text) => {
    this.setState({
      limitedPack: text,
    });
  };

  listHeaderComponent = () => {
    // <View style = { style.settingInputLine }>
    // <View style = { style.settingInputTitle }>
    // <Text style = { style.settingInputTitleText }>
    // { PAGE_WORD.unlimited }
    // </Text>
    // </View>
    // <View style = { style.checkBoxView }>
    // <CheckBox
    // value = { this.state.unlimited }
    // onValueChange = { this.unlimitedOnValueChange.bind(this) }
    // />
    // </View>
    // <View style = { style.settingInputSuffix }>
    // </View>
    // </View>
    // { limitedPackView }


    let limitedPackView = this.state.unlimited === true ? null : (
      <View style = { style.settingInputLine }>
        <View style = { style.settingInputTitle }>
          <Text style = { style.settingInputTitleText }>
            { PAGE_WORD.limitedPack }
          </Text>
        </View>
        <View style = { style.settingInput }>
          <TextInput
            style = { style.setting }
            underlineColorAndroid = 'transparent'
            defaultValue = { this.state.limitedPack }
            keyboardType = { 'numeric' }
            onChangeText = { this.limitedPackOnChangeText.bind(this) }
          />
        </View>
        <View style = { style.settingInputSuffix }>
          <Text style = { style.settingInputSuffixText }>
            { PAGE_WORD.limitedPackSuffix }
          </Text>
        </View>
      </View>
    );
    return (
      <View>
        <View style = { style.listHeaderComponent }>
          <View style = { style.settingTitleView }>
            <Text style = { style.settingTitle }>
              { PAGE_WORD.settingTitle }
            </Text>
          </View>
        </View>
        <View style = { style.settingInputViewComponent }>
          <View style = { style.settingInputView }>
            <View style = { style.settingInputLine }>
              <View style = { style.settingInputTitle }>
                <Text style = { style.settingInputTitleText }>
                  { PAGE_WORD.interval }
                </Text>
              </View>
              <View style = { style.settingInput }>
                <TextInput
                  style = { style.setting }
                  underlineColorAndroid = 'transparent'
                  defaultValue = { this.state.interval }
                  keyboardType = { 'numeric' }
                  onChangeText = { this.intervalOnChangeText.bind(this) }
                />
              </View>
              <View style = { style.settingInputSuffix }>
                <Text style = { style.settingInputSuffixText }>
                  { PAGE_WORD.timeSuffix }
                </Text>
              </View>
            </View>
            <View style = { style.settingInputLine }>
              <View style = { style.settingInputTitle }>
                <Text style = { style.settingInputTitleText }>
                  { PAGE_WORD.overtime }
                </Text>
              </View>
              <View style = { style.settingInput }>
                <TextInput
                  style = { style.setting }
                  underlineColorAndroid = 'transparent'
                  defaultValue = { this.state.overtime }
                  keyboardType = { 'numeric' }
                  onChangeText = { this.overtimeOnChangeText.bind(this) }
                />
              </View>
              <View style = { style.settingInputSuffix }>
                <Text style = { style.settingInputSuffixText }>
                  { PAGE_WORD.timeSuffix }
                </Text>
              </View>
            </View>
            <View style = { style.settingInputLine }>
              <View style = { style.settingInputTitle }>
                <Text style = { style.settingInputTitleText }>
                  { PAGE_WORD.dataPack }
                </Text>
              </View>
              <View style = { style.settingInput }>
                <TextInput
                  style = { style.setting }
                  underlineColorAndroid = 'transparent'
                  defaultValue = { this.state.dataPack }
                  keyboardType = { 'numeric' }
                  onChangeText = { this.dataPackOnChangeText.bind(this) }
                />
              </View>
              <View style = { style.settingInputSuffix }>
                <Text style = { style.settingInputSuffixText }>
                  { PAGE_WORD.dataPackSuffix }
                </Text>
              </View>
            </View>

          </View>
        </View>
        <View style = { style.listHeaderComponent }>
          <View style = { style.commonUseTitleView }>
            <Text style = { style.commonUseTitle }>
              { PAGE_WORD.commonUseTitle }
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderItem = ({
    item
  }) => {
    let oneItem = (
      value
    ) => {
      return (
        <View style = { style.oneItemView }>
          <TouchableOpacity
            style = { style.oneItemButtonComponents }
            onPress = { this.pingInfoJumpEvent.bind(this,value.ip) }
          >
            <View style = { style.oneItemButtonView }>
              <View style = { style.oneItemButtonIconView }>
                <Icon name = { value.icon } style = { style.oneItemButtonIcon }/>
              </View>
              <View style = { style.oneItemButtonTextView }>
                <Text style = { style.oneItemButtonText } >{ value.title }</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    let resultView = [];
    item.forEach((value, index) => {
      resultView.push(oneItem(value));
    });
    return (
      <View style = { style.renderItem }>
        { resultView }
      </View>
    );
  };

  clearButton = () => {
    this.setState({
      ip: '',
    });
    this.refs.ipInput.clear();
  };

  onChangeText = (text) => {
    this.setState({
      mac: text
    });
  };

  confirmButtonOnPress = () => {
    this.pingInfoJumpEvent.call(this, this.state.ip);
  };

  pingInfoJumpEvent = (ip) => {
    let interval = this.state.interval;
    let overtime = this.state.overtime;
    let dataPack = this.state.dataPack;
    let unlimited = this.state.unlimited;
    let limitedPack = this.state.limitedPack;
    this.props.navigation.navigate('PingTestInfoPage', {
      ip: ip,
      interval: interval,
      overtime: overtime,
      dataPack: dataPack,
      unlimited: unlimited,
      limitedPack: limitedPack,
    });
  };



  render() {
    let data = this.flatListData.call(this);
    let listHeaderComponent = this.listHeaderComponent.call(this);
    return (
      <View style = { style.container }>
        <View style = { style.headerInputView }>
          <View style = { style.headerInput }>
            <View style = { style.inputView }>
              <View style = { style.input }>
                <TextInput
                  onChangeText = { this.onChangeText.bind(this) }
                  style = { style.ipInput }
                  underlineColorAndroid = 'transparent'
                  placeholder = { PAGE_WORD.pleaseInputIP }
                  ref = 'ipInput'
                  autoFocus = { true }
                />
              </View>
              <View style = { style.clearIcon }>
                <TouchableOpacity
                  onPress = { this.clearButton.bind(this) }
                >
                  <Icon name = 'close' style = { style.closeIcon }/>
                </TouchableOpacity>
              </View>
            </View>
            <View style = { style.confirmButtonView }>
              <TouchableOpacity
                onPress = { this.confirmButtonOnPress.bind(this) }
              >
                <Text style = { style.confirm }>
                  { PAGE_WORD.confirm }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style = { style.listView }>
          <FlatList
            data = { data }
            renderItem = { this.renderItem.bind(this) }
            ListHeaderComponent = { listHeaderComponent }
          />
        </View>
      </View>
    );
  }
}
