/**
 * About PingTestCheckPage css file zhuyu 2018/8/10
 */

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const {
  width,
  height,
} = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeaderComponent: {
    height: 40,
    width: width,
  },
  settingTitleView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  commonUseTitleView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  settingTitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,1)',
  },
  commonUseTitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,1)',
  },
  settingInputViewComponent: {
    height: 200,
    width: width,
  },
  settingInputView: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  settingInputLine: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingInputTitle: {
    flex: 1,
    // backgroundColor: 'green',
  },
  settingInput: {
    flex: 1,
    // backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  settingInputSuffix: {
    flex: 1,
    // backgroundColor: 'pink',
    paddingLeft: 10,
  },
  settingInputTitleText: {
    fontSize: 14,
    color: 'rgba(0,0,0,1)',
  },
  setting: {
    padding: 0,
  },
  settingInputSuffixText: {
    fontSize: 14,
    color: 'rgba(0,0,0,1)',
  },
  checkBoxView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  oneItemView: {
    width: 80,
    height: 80,
    // backgroundColor: 'green',
    margin: 5,
  },
  oneItemButtonView: {
    flex: 1,
    // padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    flexDirection: 'column',
  },
  oneItemButtonComponents: {
    flex: 1,
  },
  oneItemButtonIconView: {
    flex: 2,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneItemButtonIcon: {
    fontSize: 30,
    color: 'green',
  },
  oneItemButtonTextView: {
    flex: 1,
    // backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneItemButtonText: {
    fontSize: 14,
    color: '#000',
  },
  renderItem: {
    padding: 20,
    flexDirection: 'row',
    width: width,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },



  headerInputView: {
    height: 60,
    width: width,
    // flex: 1,
    // backgroundColor: 'red',
    padding: 10,
  },
  headerInput: {
    flex: 1,
    flexDirection: 'row',
  },
  inputView: {
    flex: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  confirmButtonView: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
  input: {
    flex: 4,
    // backgroundColor: 'red',
  },
  clearIcon: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.6)',
  },
  ipInput: {
    padding: 0,
  },


  listView: {
    flex: 1,
    // backgroundColor: 'green',
  },

  renderItemView: {
    width: width,
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  imgView: {
    height: 80,
    width: 80,
    padding: 5,
    // backgroundColor: 'red',
  },
  devInfoView: {
    flex: 12,
    // backgroundColor: 'green',
    justifyContent: 'center',
    borderColor: '#000',
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
    paddingLeft: 15,
  },
  arrowButtonView: {
    flex: 2,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  devImg: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 30,
    color: '#000',
  },
  devInfo: {
    color: '#000',
    fontSize: 16,
  }
})
