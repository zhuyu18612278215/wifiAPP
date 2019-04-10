/**
 * LoginPage zhuyu 2018/4/2
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  observer,
  inject,
} from 'mobx-react';

import HeaderButtons from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserDefButton from '../../common/Button';
import UserDefInput from '../../common/Input';
import style from '../../css/LoginPageStyle';

const PAGE_WORD = {
  loginTitle: '登录',
  register: '注册',
  accountPlaceholder: '请输入账号',
  passWDPlaceholder: '请输入密码',
  login: '登录',
  changePW: '忘记密码',
  account: '账号',
  passWD: '密码',
  infoEmpty: '账号或密码不能为空',
  infoError: '请输入正确的账号或密码',
  loginSuccess: '登录成功',
};

@inject('discoverDataStore', 'userDataStore', 'localDataStore')
@observer
export default class LoginPage extends Component {
  static navigationOptions = ({
    navigation,
  }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: PAGE_WORD.loginTitle,

    };
  };

  constructor(props) {
    super(props);

    this.state = {
      secureTextEntry: true,
      account: '',
      passwd: '',
    };
    this.userDataStore = this.props.userDataStore;
    this.localDataStore = this.props.localDataStore;
  }

  componentWillMount() {}

  eyeOnpress = () => {
    this.setState((state) => ({
      secureTextEntry: !state.secureTextEntry,
    }));
  };

  registerEvent = () => {
    this.props.navigation.navigate('Register');
  };

  changePassWDEvent = () => {
    this.props.navigation.navigate('ChangePassWD');
  };

  loginEvent = async () => {
    // TODO: check phone and passwd  and to change the page
    if (this.state.account.trim() === '' || this.state.passwd.trim() === '') {
      alert(PAGE_WORD.infoEmpty);
    } else {
      await fetch(`${this.localDataStore.url}/api/token/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // username: 'appServerAdmin',
          // password: 'appServerAdmin',
          username: this.state.account,
          password: this.state.passwd,
        }),
      }).then((response) => {
        // console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request Error');
        }
      }).then(async (data) => {
        // console.log(data);
        let jwtToken = data.access;
        // console.log(jwtToken);
        await fetch(`${this.localDataStore.url}/User/getOwnDetailInfo/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ jwtToken }`,
          },
          // credentials: 'include',
        }).then((response) => {
          // console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request Error');
          }
        }).then(async (userInfo) => {
          // console.log(userInfo);
          this.userDataStore.userData.username = userInfo.username;
          this.userDataStore.userData.email = userInfo.email;
          this.userDataStore.changeJwtToken({
            data: jwtToken
          });
          await alert(PAGE_WORD.loginSuccess);
          await this.props.navigation.navigate('TabPage');
        });

      }).catch((error) => {
        console.log(error);
        alert(PAGE_WORD.infoError);
      });
    }

  };

  accountOnChangeEvent = (value) => {
    this.setState({
      account: value,
    });
  };
  passwdOnChangeEvent = (value) => {
    this.setState({
      passwd: value,
    });
  };

  render() {
    let eye = this.state.secureTextEntry === true ? 'eye-slash' : 'eye';
    return (
      <View style = { style.container }>
        <View style = { style.mainView }>
          <View style = { style.inputBlockView }>
            <View style = { style.infoInputView }>
              <View style = { style.inputMainView }>
                <UserDefInput
                  placeholder = { PAGE_WORD.accountPlaceholder }
                  placeholderTextColor = { 'gray' }
                  underlineColorAndroid = { 'transparent' }
                  style = { style.inputStyle }
                  onChangeText = { this.accountOnChangeEvent }
                />
              </View>
              <View style = { style.inputIconView }></View>
            </View>
            <View style = { style.infoInputView }>
              <View style = { style.inputMainView }>
                <UserDefInput
                  placeholder = { PAGE_WORD.passWDPlaceholder }
                  placeholderTextColor = { 'gray' }
                  underlineColorAndroid = { 'transparent' }
                  secureTextEntry = { this.state.secureTextEntry }
                  style = { style.inputStyle }
                  clearTextOnFocus = { true }
                  maxLength = { 18 }
                  onChangeText = { this.passwdOnChangeEvent }
                />
              </View>
              <View style = { style.inputIconView }>
                <Icon
                  name = { eye }
                  size = { 30 }
                  style = { style.iconEyeStyle }
                  onPress = { this.eyeOnpress }
                />
              </View>
            </View>
          </View>
          <View style = { style.buttonBlockView }>
            <View style = { style.loginButtonView }>
              <UserDefButton
                text = { PAGE_WORD.login }
                buttonStyle = { style.buttonStyle }
                buttonTextStyle = { style.buttonTextStyle }
                event = { this.loginEvent }
              />
            </View>
            <View style = { style.loginButtonView }>
              <UserDefButton
                text = { PAGE_WORD.register }
                buttonStyle = { style.buttonStyle }
                buttonTextStyle = { style.buttonTextStyle }
                event = { this.registerEvent }
              />
            </View>
            <View style = { style.changePWTextView }>
              <Text
                style = { style.changePWText }
                onPress = { this.changePassWDEvent }
              >
                { PAGE_WORD.changePW }
              </Text>
            </View>

          </View>
        </View>
      </View>
    );
  }
}
