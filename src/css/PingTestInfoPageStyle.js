/**
 * About PingTestInfoPage css file zhuyu 2018/8/15
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
  listFooterComponentView: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.6)',
    borderTopWidth: 1,
  },
  listFooterComponentButton: {
    flex: 1,
  },
  listFooterComponentButtonTitleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterComponentButtonTitle: {
    fontSize: 16,
    color: '#000',
  },

  renderItemView: {

  },
  renderItemText: {
    fontSize: 14,
    color: '#000',
  },
})
