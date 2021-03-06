/**
 * About LoginPage css file zhuyu 2018/4/10
 */

import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  mainView: {
    flex: 1,
    // backgroundColor: 'red',
  },
  inputBlockView: {
    flex: 1,
    // backgroundColor: 'red',
  },
  buttonBlockView: {
    flex: 2,
    // backgroundColor: 'blue',
  },
  infoInputView: {
    height: 40,
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 0,
    marginBottom: 10,
  },
  inputTitleView: {
    flex: 2,
  },
  inputMainView: {
    flex: 8,
  },
  inputIconView: {
    flex: 2,
  },
  inputTitle: {
    // height: 30,
    // width: 40,
    fontSize: 18,
    color: '#000',
    margin: 5,
  },
  inputStyle: {
    padding: 0,
    // height: 40,
    // width: 230,
    margin: 5,
    fontSize: 18,
  },
  iconEyeStyle: {
    color: '#000',
    marginTop: 2,
    marginRight: 5,
    marginBottom: 8,
    textAlign: 'right',
  },
  loginButtonView: {
    // flex: 1,
    height: 40,
    marginBottom: 20,
  },
  buttonStyle: {
    borderColor: '#000',
    height: 40,
    borderWidth: 2,
  },
  buttonTextStyle: {
    color: '#000',
    fontSize: 18,
  },
  changePWTextView: {
    height: 40,
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  changePWText: {
    textDecorationLine: 'underline',
    textAlign: 'right',
    fontSize: 16,
    // backgroundColor: 'green',
    width: 80,
  },
});
