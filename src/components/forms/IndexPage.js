/**
 * IndexPage zhuyu 2018/3/30
 */


import React, {
  Component
} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  observer,
  inject,
} from 'mobx-react';

import style from '../../css/IndexPageStyle';
import UserDefStatusBar from '../../common/StatusBar';

const PAGE_WORD = [{
  title: '掌控',
}];


@inject('localDataStore')
@observer
export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.localDataStore = this.props.localDataStore;
  }

  static navigationOptions = {
    header: null,
  };

  loginLoadingEvent = async () => {
    // TODO: get token
    // let userToken = '';
    // TODO: login
    await this.localDataStore.changeWifi({
      data: 'Witrusty',
    });
    await this.localDataStore.changeIp({
      data: '192.168.1.123',
    });
    setTimeout(() => {
      this.props.navigation.navigate('AppStack');
    }, 500);
  };

  componentDidMount() {
    this.loginLoadingEvent.call(this);
  };

  render() {
    return (
      <View style = { style.container } >
        <UserDefStatusBar/>
        <ImageBackground
          style = { style.indexImage }
          source = { require('../img/index_bg.jpg') }
        >
        <View style = { style.index }>
          <View style = { style.indexLeftNullView }/>
          <View style = { style.indexView }>
            <View style = { style.indexTopNullView }/>
            <View style = { style.indexCenterNullView }>
              <View style = { style.indexTextView }>
                <Text style = { style.indexText }>{ PAGE_WORD[0].title }</Text>
              </View>
              <View style = { style.indexBetweenNullView }/>
              <View style = { style.indexButtonView }>
                <View style = { style.indexButtonTopView }/>

                <View style = { style.indexButtonBottomView }/>
              </View>
            </View>
            <View style = { style.indexBottomNullView }/>
          </View>
          <View style = { style.indexRightNullView }/>
        </View>
        </ImageBackground>
      </View>
    );

  }
}
