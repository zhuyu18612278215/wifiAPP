/**
 * VendorInquiryPage zhuyu 2018/8/6
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
import style from '../../css/VendorInquiryPageStyle';

const PAGE_WORD = {
  vendorInquiry: '厂商查询',
  confirm: '确定',
  pleaseInputMac: '请输入MAC地址',
};

@observer
export default class VendorInquiryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mac: '',
      dataHide: true,
    };
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.vendorInquiry,
    };
  };

  flatListData = () => {
    let data = this.state.dataHide === true ? [] : [{
      image: require('../img/test.jpg'),
      title: 'Beijing Autelan Technology Co.,Ltd',
    }, ];
    return data;
  };

  listHeaderComponent = () => {
    let macText = `您输入的MAC地址为 ${ this.state.mac }`;
    let prompt = `根据您输入的MAC地址查询出的匹配结果为`;
    let emptyPrompt = `输入MAC地址后点击确定,即可获得厂商信息`;
    let textView = this.state.dataHide === true ? (
      <View style = { style.listHeaderComponentHide }>
        <Text style = { style.listHeaderComponentText }>
          { emptyPrompt }
        </Text>
      </View>) : (
      <View style = { style.listHeaderComponentShow }>
        <Text style = { style.listHeaderComponentText }>
          { macText }
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
          <Text style = { style.devInfo }>{ item.title }</Text>
        </View>
        <View style = { style.arrowButtonView }>

        </View>
      </View>
    );

  };

  clearButton = () => {
    this.setState({
      mac: '',
      dataHide: true,
    });
    this.refs.macInput.clear();
  };

  onChangeText = (text) => {
    this.setState({
      mac: text
    });
  };

  confirmButtonOnPress = () => {
    let mac = this.state.mac;
    if (mac === '') {
      this.setState({
        dataHide: true,
      });
      alert(PAGE_WORD.pleaseInputMac);
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
                  placeholder = { PAGE_WORD.pleaseInputMac }
                  ref = 'macInput'
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
