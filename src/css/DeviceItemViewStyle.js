/**
 * About DeviceItemView css file zhuyu 2018/8/2
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  arrowButton: {
    flex: 1,
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
    fontSize: 14,
  }
})
