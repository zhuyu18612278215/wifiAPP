/**
 * About CommonUseWlanTestPage css file zhuyu 2018/8/3
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
  renderItemView: {
    width: width,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  renderItemButton: {
    flex: 1,
    flexDirection: 'row',
  },
  renderItemViewTitleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  renderItemViewInfoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  renderItemViewTitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left'
  },
  infoIcon: {
    fontSize: 24,
    color: '#000',
  },
  renderSectionHeader: {
    height: 10,
    width: width,
  },
})
