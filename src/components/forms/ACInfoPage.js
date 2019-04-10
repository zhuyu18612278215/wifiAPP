/**
 * ACInfoPage zhuyu 2018/11/1
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput
} from 'react-native';

import {
  inject,
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import UserDefButton from '../../common/Button';


import style from '../../css/ACInfoPageStyle';

const PAGE_WORD = {
  title: 'AC信息',
  bindACUsername: '绑定的AC用户',
  bindACAddress: '绑定的AC地址',
  unbind: '解除绑定',
  listEmptyComponent: '您尚未绑定AC账户,点击此处绑定AC',
  requsetError: '网络错误',
  ACAddress: 'AC地址',
  ACUsername: 'AC用户账号',
  ACUserPassword: 'AC用户密码',
  bindInfoError: '请输入正确的AC信息',
  bindFail: '绑定失败',
  bindSuccess: '绑定成功',
};

@inject('userDataStore', 'localDataStore')
@observer
export default class ACInfoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bindModalVisible: false,
      ACAddress: '',
      ACUsername: '',
      ACUserPassword: '',
    };
    this.userDataStore = this.props.userDataStore;
    this.localDataStore = this.props.localDataStore;
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: PAGE_WORD.title,
    };
  };

  listHeaderComponent = () => {
    return (
      <View style = { style.listHeaderComponentView }>
        <Text style = { style.titleText }>
          { '绑定的AC信息' }
        </Text>
      </View>
    );
  };

  renderItem = ({
    item
  }) => {
    return (
      <View style = { style.ACInfoDetail }>
        <View style = { style.ACInfoDetailView }>
          <View style = { style.ACInfoDetailTitle }>
            <Text style = { style.ACInfoDetailText }>{ PAGE_WORD[item] }</Text>
          </View>
          <View style = { style.ACInfoDetailData }>
            <Text style = { style.ACInfoDetailText }>{ this.userDataStore.bindData[item] }</Text>
          </View>
        </View>
      </View>
    );
  };

  unbindEvent = () => {
    alert('ok');
  };
  bindModalEvent = () => {
    this.setState({
      bindModalVisible: true,
    })
  };

  listEmptyComponent = () => {
    return (
      <View style = { style.listEmptyComponentView }>
        <Text
          style = { style.listEmptyComponentText }
          onPress = { this.bindModalEvent }
        >
          { PAGE_WORD.listEmptyComponent }
        </Text>
      </View>
    );
  };

  componentWillMount() {
    fetch(`${this.localDataStore.url}/ACAccountBindInfo/getOwnBindACInfo/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ this.userDataStore.jwtToken }`,
      },
      // credentials: 'include',
    }).then((response) => {
      // console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request Error');
      }
    }).then((data) => {
      console.log(data);
      this.userDataStore.changeBindData({
        data
      });
    }).catch((error) => {
      // console.log(error);
      alert(PAGE_WORD.requsetError);
    });
  }

  onChangeEventTextInput = ({
    inputType
  }, value) => {
    this.setState({
      [inputType]: value,
    });
  };

  bindModalButton = ({
    buttonType
  }) => {
    if (buttonType === 'cancel') {
      this.setState({
        bindModalVisible: false,
      });
    } else {
      let ACAddress = this.state.ACAddress;
      let ACUsername = this.state.ACUsername;
      let ACUserPassword = this.state.ACUserPassword;
      console.log(ACAddress.trim() === '');
      if (ACAddress.trim() === '' || ACUsername.trim() === '' || ACUserPassword.trim() === '') {
        alert(PAGE_WORD.bindInfoError);
      } else {
        fetch(`${this.localDataStore.url}/ACAccountBindInfo/bindAC/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ this.userDataStore.jwtToken }`,
          },
          // credentials: 'include',
          body: JSON.stringify({
            bindACAddress: ACAddress,
            bindACUsername: ACUsername,
            bindACUserPassword: ACUserPassword,
          }),
        }).then((response) => {
          if (response.ok) {
            // console.log(response.json());
            return response.json();
          } else {
            throw new Error('Request Error');
          }
        }).then((data) => {
          this.userDataStore.changeBindData({
            data: data['data']
          });
          alert(PAGE_WORD.bindSuccess);
        }).catch((error) => {
          // console.log(error);
          alert(PAGE_WORD.bindFail);
        });
      }
    }
  };

  render() {
    let unbindButton = Object.keys(this.userDataStore.bindData).length !== 0 ? (<UserDefButton
        text = { PAGE_WORD.unbind }
        buttonStyle = { style.buttonStyle }
        buttonTextStyle = { style.ACInfoDetailText }
        event = { this.unbindEvent }
      />) : null;
    let bindModal = (
      <Modal
        visible = { this.state.bindModalVisible }
        onRequestClose = { this.bindModalButton.bind(this,{ buttonType:'cancel' }) }
        transparent = { true }
        animationType = { 'fade' }
      >
        <View style = { style.modalBackView }>
          <View style = { style.bindModalView }>
            <View style = { style.bindModalHeaderView }>
              <Text style = { style.ACInfoDetailText }>
                { '绑定AC' }
              </Text>
            </View>
            <View style = { style.bindModalInfoView }>
              <View style = { style.bindModalDetailInputView }>
                <View style = { style.bindModalDetailInputTitle }>
                  <Text style = { style.ACInfoDetailText }>{ PAGE_WORD.ACAddress }</Text>
                </View>
                <View style = { style.bindModalDetailInput }>
                  <TextInput
                    style = { style.bindModalDetailInputStyle }
                    autoCapitalize = { 'none' }
                    onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'ACAddress' }) }
                  />
                </View>
              </View>
              <View style = { style.bindModalDetailInputView }>
                <View style = { style.bindModalDetailInputTitle }>
                  <Text style = { style.ACInfoDetailText }>{ PAGE_WORD.ACUsername }</Text>
                </View>
                <View style = { style.bindModalDetailInput }>
                  <TextInput
                    style = { style.bindModalDetailInputStyle }
                    autoCapitalize = { 'none' }
                    onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'ACUsername' }) }
                  />
                </View>
              </View>
              <View style = { style.bindModalDetailInputView }>
                <View style = { style.bindModalDetailInputTitle }>
                  <Text style = { style.ACInfoDetailText }>{ PAGE_WORD.ACUserPassword }</Text>
                </View>
                <View style = { style.bindModalDetailInput }>
                  <TextInput
                    style = { style.bindModalDetailInputStyle }
                    autoCapitalize = { 'none' }
                    onChangeText = { this.onChangeEventTextInput.bind(this,{ inputType:'ACUserPassword' }) }
                  />
                </View>
              </View>
            </View>
            <View style = { style.bindModalFooterView }>
              <TouchableOpacity
                style = { style.bindModalFooterButton }
                onPress = { this.bindModalButton.bind(this,{ buttonType:'cancel' }) }
              >
                <Text style = { style.ACInfoDetailText }>
                  { '取消' }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style = { style.bindModalFooterButton }
                onPress = { this.bindModalButton.bind(this,{ buttonType:'ok' }) }
              >
                <Text style = { style.ACInfoDetailText }>
                  { '确定' }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
    return (
      <View style = { style.container }>
        { bindModal }
        <FlatList
          data = { Object.keys(this.userDataStore.bindData) }
          ListHeaderComponent = { this.listHeaderComponent }
          renderItem = { this.renderItem }
          ListEmptyComponent = { this.listEmptyComponent }
        />
        <View style = { style.bindButtonView }>
          { unbindButton }
        </View>

      </View>
    );
  }
}
