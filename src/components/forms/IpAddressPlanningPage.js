/**
 * IpAddressPlanningPage zhuyu 2018/8/6
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  // Image,
  TextInput,
} from 'react-native';
import {
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/IpAddressPlanningPageStyle';

const PAGE_WORD = {
  ipAddressPlanning: 'IP地址规划',
  confirm: '确定',
  pleaseInputIP: '请输入IP地址',
  pleaseInputMask: '请输入掩码位',
  pleaseInputRightIP: '请输入正确的IP地址',
  pleaseInputRightMask: '请输入正确的掩码位',
};

@observer
export default class IpAddressPlanningPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ip: '',
      dataHide: true,
      mask: '24',
      result: [{}],
    };
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.ipAddressPlanning,
    };
  };

  flatListData = () => {

    let data = this.state.dataHide === true ? [] : this.state.result;
    return data;
  };

  listHeaderComponent = () => {
    let ipText = `您输入的IP地址为 ${ this.state.ip }/${ this.state.mask }`;
    let prompt = `根据您输入的IP地址计算出的结果为`;
    let emptyPrompt = `输入IP地址及掩码位后点击确定,即可获得计算结果`;
    let textView = this.state.dataHide === true ? (
      <View style = { style.listHeaderComponentHide }>
        <Text style = { style.listHeaderComponentText }>
          { emptyPrompt }
        </Text>
      </View>) : (
      <View style = { style.listHeaderComponentShow }>
        <Text style = { style.listHeaderComponentText }>
          { ipText }
        </Text>
        <Text style = { style.listHeaderComponentText }>
          { prompt }
        </Text>
      </View>);
    return (
      <View style = { style.listHeaderComponent }>
        { textView }
      </View>
    );
  };

  renderItem = ({
    item
  }) => {
    return (
      <View style = { style.renderItemView }>
        <View style = { style.devInfoView }>
          <Text style = { style.devInfo }>可用IP:     { item.num }</Text>
          <Text style = { style.devInfo }>掩码:       { item.mask }</Text>
          <Text style = { style.devInfo }>网段:       { item.networkSegment }</Text>
          <Text style = { style.devInfo }>第一可用:   { item.first }</Text>
          <Text style = { style.devInfo }>最后可用:   { item.end }</Text>
          <Text style = { style.devInfo }>广播地址:   { item.broadcast }</Text>
        </View>
      </View>
    );

  };

  clearButton = () => {
    this.setState({
      ip: '',
      dataHide: true,
    });
    this.refs.ipInput.clear();
  };

  onChangeText = (text) => {
    this.setState({
      ip: text
    });
  };
  maskOnChangeText = (text) => {
    this.setState({
      mask: text
    });
  };


  confirmButtonOnPress = () => {
    let ip = this.state.ip;
    let ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let maskBit = this.state.mask;
    let maskReg = /^[0-9]|[12][0-9]|3[0-2]$/;
    if (!ipReg.test(ip)) {
      this.setState({
        dataHide: true,
      });
      alert(PAGE_WORD.pleaseInputRightIP);
    } else if (!maskReg.test(maskBit)) {
      this.setState({
        dataHide: true,
      });
      alert(PAGE_WORD.pleaseInputRightMask);
    } else {
      let num = Math.pow(2, 32 - parseInt(maskBit)) - 2;
      let binIP = '';
      (ip.split('.')).forEach((value, index) => {
        let bin = (Array(8).join(0) + parseInt(value).toString(2)).slice(-8);
        binIP = `${ binIP }${ bin }`;
      });
      let maskBin = ((Array(32).join(1)).slice(0, parseInt(maskBit)) + Array(32).join(0)).slice(0, 32);
      let mask = `${ parseInt(maskBin.slice(8*0,8*1),2) }.${ parseInt(maskBin.slice(8*1,8*2),2) }.${ parseInt(maskBin.slice(8*2,8*3),2) }.${ parseInt(maskBin.slice(8*3,8*4),2) }`;
      let ipList = ip.split('.');
      let maskList = mask.split('.');
      let networkSegment = '';
      let first = '';
      let firstBin = '';
      let end = '';
      let endBin = '';
      let broadcast = '';
      let broadcastBin = '';
      let networkSegmentBin = '';
      ipList.forEach((value, index) => {
        let point = index === 3 ? '' : '.';
        let result = parseInt(value) & parseInt(maskList[index]);
        networkSegment = `${ networkSegment }${ result }${ point }`;
      });
      (networkSegment.split('.')).forEach((value, index) => {
        networkSegmentBin = `${ networkSegmentBin }${ (Array(8).join(0) + parseInt(value).toString(2)).slice(-8) }`;
      });
      firstBin = (networkSegmentBin.slice(0, parseInt(maskBit)) + Array(32).join(0)).slice(0, 31) + '1';
      broadcastBin = (networkSegmentBin.slice(0, parseInt(maskBit)) + Array(32).join(1)).slice(0, 32);
      endBin = (networkSegmentBin.slice(0, parseInt(maskBit)) + Array(32).join(1)).slice(0, 31) + '0';
      first = `${ parseInt(firstBin.slice(8*0,8*1),2) }.${ parseInt(firstBin.slice(8*1,8*2),2) }.${ parseInt(firstBin.slice(8*2,8*3),2) }.${ parseInt(firstBin.slice(8*3,8*4),2) }`;
      broadcast = `${ parseInt(broadcastBin.slice(8*0,8*1),2) }.${ parseInt(broadcastBin.slice(8*1,8*2),2) }.${ parseInt(broadcastBin.slice(8*2,8*3),2) }.${ parseInt(broadcastBin.slice(8*3,8*4),2) }`;
      end = `${ parseInt(endBin.slice(8*0,8*1),2) }.${ parseInt(endBin.slice(8*1,8*2),2) }.${ parseInt(endBin.slice(8*2,8*3),2) }.${ parseInt(endBin.slice(8*3,8*4),2) }`;
      this.setState({
        dataHide: false,
        result: [{
          num: num,
          mask: mask,
          networkSegment: networkSegment,
          first: first,
          end: end,
          broadcast: broadcast,
        }],
      });
    };
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
                  maxLength = { 15 }
                />
              </View>
              <Text style = { style.confirm }>{ '/' }</Text>
              <View style = { style.inputMaskView }>
                <TextInput
                  onChangeText = { this.maskOnChangeText.bind(this) }
                  style = { style.maskInput }
                  underlineColorAndroid = 'transparent'
                  // placeholder = { PAGE_WORD.pleaseInputMask }
                  ref = 'maskInput'
                  defaultValue = { this.state.mask }
                  keyboardType = { 'numeric' }
                  maxLength = { 2 }
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
