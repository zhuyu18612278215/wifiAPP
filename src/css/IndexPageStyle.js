/**
 * About IndexPage css file zhuyu 2018/4/10
 */

import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  indexImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    // resizeMode: Image.resizeMode.contain,
  },

  index: {
    flex: 1,
    flexDirection: 'row',
  },
  indexView: {
    flex: 10,
    justifyContent: 'space-between',
  },
  indexLeftNullView: {
    flex: 1,
    // backgroundColor: '#42f',
  },
  indexRightNullView: {
    flex: 1,
    // backgroundColor: '#42f',
  },

  indexTopNullView: {
    flex: 1,
    // backgroundColor: '#2ff',
  },
  indexCenterNullView: {
    flex: 10,
    // backgroundColor: '#2ff',
  },
  indexBottomNullView: {
    flex: 1,
    // backgroundColor: '#2ff',
  },
  indexTextView: {
    flex: 2,
    // backgroundColor: '#fff',
  },
  indexBetweenNullView: {
    flex: 6,
    // backgroundColor: '#2ff',
  },
  indexButtonView: {
    flex: 4,
    justifyContent: 'space-between',
    // backgroundColor: '#000',
  },

  indexButtonCenterView: {
    flex: 1,
  },
  indexButtonTopView: {
    flex: 1,
  },
  indexButtonBottomView: {
    flex: 1,
  },

  indexText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 65,
    textAlign: 'center',
  },

  buttonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    borderWidth: 2,
  },
  buttonTextStyle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
  },
});
