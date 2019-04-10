/**
 * TabPageHeader zhuyu 2018/8/2
 */


import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';


const PAGE_WORD = {
  appName: '掌控',
};

const style = StyleSheet.create({
  headerLeftTitleView: {

  },
  headerLeftTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 15,
    paddingTop: 10,
  },
});

export default class TabPageHeaderLeftTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style = { style.headerLeftTitleView }>
        <Text style = { style.headerLeftTitle }>{ PAGE_WORD.appName }</Text>
      </View>
    );
  }

};
