/**
 * About MinePage css file zhuyu 2018/7/27
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
  infoText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'right'
  },
  infoIcon: {
    fontSize: 24,
    color: '#000',
  },
  userRenderItemView: {
    marginTop: 10,
    width: width,
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoView: {
    flex: 4,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headImage: {
    width: 60,
    height: 60,
  },
  userInfoText: {
    fontSize: 16,
    color: '#000',
  },
  renderSectionHeader: {
    width: width,
    height: 10,
  },
  userButton: {
    flex: 1,
    flexDirection: 'row',
  },
});
