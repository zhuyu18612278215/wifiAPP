/**
 * RegisterPage zhuyu 2018/3/30
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
import PromptIconText from '../../common/PromptIconText';
import TimeButton from '../../common/TimeButton';
import style from '../../css/RegisterPageStyle';

const PAGE_WORD = {
  headerTitle: '新用户注册',
  account: '账号',
  passWD: '密码',
  code: '验证码',
  accountPlaceholder: '请输入邮箱地址',
  passWDPlaceholder: '请输入密码',
  codePlaceholder: '请输入邮件中的验证码',
  send: '发送验证邮件',
  resend: '重新发送',
  register: '注册并登录',
  emailEmpty: '邮箱不能为空',
  emailError: '邮箱格式错误',
  sendSuccess: '发送成功',
  sendFail: '发送失败,请检查输入的邮箱地址是否合法或通知管理员',
  passwdEmpty: '密码不能为空',
  passwdError: '密码应为8-16位数字、字母、字符',
  emailCodeEmpty: '验证码不能为空',
  emailCodeError: '验证码格式错误',

  registerSuccess: '注册成功',
  unknownError: '未知错误',
  codeError: '验证码错误或过期',
  userExists: '用户已存在',
  registerFail: '注册失败',
  loginSuccess: '登录成功',
  loginFail: '登录失败',
}

@inject('discoverDataStore', 'userDataStore', 'localDataStore')
@observer
export default class RegisterPage extends Component {
  static navigationOptions = ({
    navigation,
  }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: PAGE_WORD.headerTitle,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      secureTextEntry: true,
      account: '',
      passwd: '',
      code: '',
      SMSInterval: 0,
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
  codeOnChangeEvent = (value) => {
    this.setState({
      code: value,
    });
  };

  resendSMSTimer = () => {
    // TODO: send SMS to phoneNumber
    this.setState((preState) => {
      return {
        SMSInterval: 60,
      }
    });
    this.timer = setInterval(() => {
      this.setState((preState) => ({
        SMSInterval: preState.SMSInterval - 1,
      }), () => {
        if (this.state.SMSInterval === 0) {
          this.timer && clearTimeout(this.timer);
        }
      });
    }, 1000);
  };

  SMSPageResendButtonEvent = () => {
    let email = this.state.account;
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email.trim() === '') {
      alert(PAGE_WORD.emailEmpty);
    } else if (!emailReg.test(email)) {
      alert(PAGE_WORD.emailError);
    } else {
      this.resendSMSTimer();
      fetch(`${this.localDataStore.url}/EmailVerifyCode/applyEmailVerifyCode/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          sendType: 'register',
        }),
      }).then((response) => {
        // console.log(response);
        if (response.ok) {
          alert(PAGE_WORD.sendSuccess);
        } else {
          alert(PAGE_WORD.sendFail);
        }
      })
    }
  };

  registerEvent = () => {
    let email = this.state.account;
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let passwd = this.state.passwd;
    let passwdReg = /^([A-Za-z0-9_!@#$%^&*()_?<>{}]){8,16}$/;
    let emailCode = this.state.code;
    let emailCodeReg = /^([A-Za-z0-9]){6}$/;
    if (email.trim() === '') {
      alert(PAGE_WORD.emailEmpty);
    } else if (!emailReg.test(email)) {
      alert(PAGE_WORD.emailError);
    } else if (passwd.trim() === '') {
      alert(PAGE_WORD.passwdEmpty);
    } else if (!passwdReg.test(passwd)) {
      alert(PAGE_WORD.passwdError);
    } else if (emailCode.trim() === '') {
      alert(PAGE_WORD.emailCodeEmpty);
    } else if (!emailCodeReg.test(emailCode)) {
      alert(PAGE_WORD.emailCodeError);
    } else {
      fetch(`${this.localDataStore.url}/User/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: passwd,
          email: email,
          sendType: 'register',
          emailCode: emailCode,
          registerCodeType: 'emailCode',
        }),
      }).then((response) => {
        // console.log(response);
        if (response.ok) {
          alert(PAGE_WORD.registerSuccess);
          return response.json();
        } else {
          // console.log(response.json());
          throw response;
        }
      }).then(() => {
        fetch(`${this.localDataStore.url}/api/token/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: passwd,
          }),
        }).then((response) => {
          // console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request Error');
          }
        }).then((data) => {
          // console.log(data);
          this.userDataStore.changeJwtToken({
            data: data.access
          });
          alert(PAGE_WORD.loginSuccess);
          this.props.navigation.navigate('TabPage');
        }).catch((error) => {
          console.log(error);
          alert(PAGE_WORD.loginFail);
        });
      }).catch((response) => {
        return response.json();
      }).then((data) => {
        // console.log(data);
        if (data.detail) {
          // console.log(data.detail);
          alert(PAGE_WORD[data.detail]);
        } else {
          alert(PAGE_WORD.registerFail);
        }
      });
    }
  };

  componentWillMount() {}

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let eye = this.state.secureTextEntry === true ? 'eye-slash' : 'eye';
    let SMSPageTimerText;
    let SMSResendButtonText;
    SMSPageTimerText = this.state.SMSInterval === 0 ? '' :
      `(${this.state.SMSInterval})`;

    SMSResendButtonText = this.state.SMSInterval === 0 ?
      (<TimeButton
        style = { [style.SMSResendButtonText,style.SMSResendButtonCanUse] }
        text = { PAGE_WORD.send + SMSPageTimerText }
        event = { this.SMSPageResendButtonEvent }
      />) : (<TimeButton
        style = { style.SMSResendButtonText }
        text = { PAGE_WORD.resend + SMSPageTimerText }
      />);
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
            <View style = { style.infoInputView }>
              <View style = { style.codeInputMainView }>
                <UserDefInput
                  placeholder = { PAGE_WORD.codePlaceholder }
                  placeholderTextColor = { 'gray' }
                  underlineColorAndroid = { 'transparent' }
                  style = { style.inputStyle }
                  onChangeText = { this.codeOnChangeEvent }
                />
              </View>
              <View style = { style.codeInputButtonView }>
                { SMSResendButtonText }
              </View>
            </View>
          </View>
          <View style = { style.buttonBlockView }>
            <View style = { style.registerButtonView }>
              <UserDefButton
                text = { PAGE_WORD.register }
                buttonStyle = { style.buttonStyle }
                buttonTextStyle = { style.buttonTextStyle }
                event = { this.registerEvent }
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
