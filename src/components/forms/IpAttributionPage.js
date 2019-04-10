/**
 * IpAttributionPage zhuyu 2018/8/8
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
} from 'react-native';
import {
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/IpAttributionPageStyle';

const PAGE_WORD = {
  ipAttribution: 'IP归属地',
  confirm: '确定',
  pleaseInputIP: '请输入IP地址',
};

@observer
export default class IpAttributionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ip: '',
      dataHide: true,
    };
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.ipAttribution,
    };
  };

  flatListData = () => {
    let data = this.state.dataHide === true ? [] : [{
      image: require('../img/test.jpg'),
      address: '北京市北京市',
      operator: '联通',
    }, ];
    return data;
  };

  listHeaderComponent = () => {
    let ipText = `您输入的IP地址为 ${ this.state.ip }`;
    let prompt = `根据您输入的IP地址查询出的匹配结果为`;
    let emptyPrompt = `输入IP地址后点击确定,即可获得归属地信息`;
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
        <View style = { style.imgView }>
          <Image
            style = { style.devImg }
            source = { item.image }
          />
        </View>
        <View style = { style.devInfoView }>
          <Text style = { style.devInfo }>IP: { this.state.ip }</Text>
          <Text style = { style.devInfo }>归属地: { item.address }</Text>
          <Text style = { style.devInfo }>运营商: { item.operator }</Text>
        </View>
        <View style = { style.arrowButtonView }>

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

  confirmButtonOnPress = () => {
    let ip = this.state.ip;
    if (ip === '') {
      this.setState({
        dataHide: true,
      });
      alert(PAGE_WORD.pleaseInputIP);
    } else {
      this.setState({
        dataHide: false,
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
                  style = { style.macInput }
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
