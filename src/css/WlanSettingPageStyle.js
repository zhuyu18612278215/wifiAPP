/**
 * About WlanSettingPage css file zhuyu 2018/8/29
 */

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const {
  width,
  height,
} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  allWlanSettingView: {
    // flex: 1,
    width: width,
    height: 150,
    padding: 15,
  },
  bottomButtonView: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 40,
    paddingRight: 40,
  },
  saveSettingButtonView: {
    width: 100,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#464646',
  },
  saveSettingButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveSettingButtonTextStyle: {
    color: '#fff',
    fontSize: 16,
  },

  wlanSettingView: {
    // height: 40,
    flex: 1,
    // backgroundColor: 'red',
  },
  settingChangeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitleView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  settingInputView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  settingTitleText: {
    fontSize: 16,
    color: '#000',
  },
  settingInput: {
    flex: 1,
  },
  titleIcon: {
    fontSize: 20,
    color: '#000',
  },
  passwdInputPartView: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  passwdIconPartView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    // backgroundColor: 'red',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: width - 60,
    height: 100,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  modalInfoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 30,
    // backgroundColor: 'blue',
  },
  modalButtonAllView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  modalButtonView: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextStyle: {
    color: '#000',
    fontSize: 16,
  },

});
