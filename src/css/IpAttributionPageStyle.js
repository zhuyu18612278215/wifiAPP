/**
 * About IpAttributionPage css file zhuyu 2018/8/8
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
  listHeaderComponentHide: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  listHeaderComponentShow: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  listHeaderComponentText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
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
  macInput: {
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
