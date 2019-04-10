/**
 * About DiscoverPage css file zhuyu 2018/4/18
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
    // backgroundColor: '#fff',
  },
  listHeaderComponentView: {
    width: width,
    height: 90,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  listHeaderComponent: {
    flex: 1,
    flexDirection: 'row',
  },
  infoView: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 15,
    paddingLeft: 30,
    // backgroundColor: 'blue'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderLeftWidth: 1,
    borderColor: '#ddd',
    // backgroundColor: 'pink'
  },
  wifiInfoView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  ipInfoView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'green',
  },
  wifi: {
    color: '#000',
    fontSize: 16,
    // textAlign: 'left',
  },
  ip: {
    color: '#000',
    fontSize: 16,
    // textAlign: 'left',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  searchIcon: {
    color: '#000',
    fontSize: 24,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
})
