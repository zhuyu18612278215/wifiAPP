/**
 * PageStack zhuyu 2018/4/3
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  createSwitchNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import IndexPage from '../forms/IndexPage';
import AppStack from './AppStack';
import style from '../../css/PageStackStyle';

import HeaderBackImage from '../../common/HeaderBackImage';


const {
  width
} = Dimensions.get('window');

const PageStack = createSwitchNavigator({
  Index: {
    screen: IndexPage,
  },
  AppStack: {
    screen: AppStack,
  },
}, {
  initialRouteName: 'Index',

}, );

export default PageStack;
