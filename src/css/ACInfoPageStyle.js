/**
 * About ACInfoPage css file zhuyu 2018/11/1
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
    backgroundColor: '#FFF',
  },
  listHeaderComponentView: {
    width: width,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,

  },
  titleText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left'
  },
  ACInfoDetail: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
    width: width,
  },
  ACInfoDetailView: {
    // flex: 1,
    height: 40,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  ACInfoDetailTitle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ACInfoDetailText: {
    fontSize: 16,
    color: '#000',
  },
  ACInfoDetailData: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle: {
    borderColor: '#000',
    height: 40,
    borderWidth: 2,
  },
  bindButtonView: {
    // flex: 1,
    height: 40,
    marginBottom: 15,
    paddingRight: 15,
    paddingLeft: 15
  },
  listEmptyComponentView: {
    width: width,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  listEmptyComponentText: {
    fontSize: 16,
    color: 'blue',
  },
  modalBackView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    // backgroundColor: 'red',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bindModalView: {
    width: width - 60,
    height: 300,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    // backgroundColor: 'gray',
  },
  bindModalHeaderView: {
    // flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    // backgroundColor: 'red',
  },
  bindModalInfoView: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: 'blue',
    // paddingBottom: 40,
    // paddingTop: 40,
  },
  bindModalFooterView: {
    // flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderTopWidth: 1,
    // backgroundColor: 'green',
    marginBottom: 0,
  },
  bindModalFooterButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'brown',
  },
  bindModalDetailInputView: {
    // flex: 1,
    height: 40,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bindModalDetailInputTitle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bindModalDetailInput: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bindModalDetailInputStyle: {
    flex: 1,
  },
});
