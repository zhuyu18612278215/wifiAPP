/**
 * About CommonUseDevPage css file zhuyu 2018/8/2
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
  renderSectionHeaderView: {
    width: width,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  renderSectionHeaderTitleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  renderSectionHeaderTitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left'
  },
  renderSectionHeader: {
    height: 10,
    width: width,
  },
})
