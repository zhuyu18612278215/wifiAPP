/**
 * AppStack zhuyu 2018/8/21
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
  createStackNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import TabNavigatorStack from './TabNavigatorStack';
import LoginPage from '../forms/LoginPage';
import RegisterPage from '../forms/RegisterPage';
import ChangePassWDPage from '../forms/ChangePassWDPage';
import style from '../../css/AppStackStyle';


import HeaderBackImage from '../../common/HeaderBackImage';


const {
  width
} = Dimensions.get('window');

const AppStack = createStackNavigator({
  TabPage: {
    screen: TabNavigatorStack,
    navigationOptions: ({
      navigation
    }) => ({
      header: null,
    }),
  },
  Login: {
    screen: LoginPage,
  },
  Register: {
    screen: RegisterPage,
  },
  ChangePassWD: {
    screen: ChangePassWDPage,
  },
}, {
  initialRouteName: 'TabPage',
  navigationOptions: {
    headerTitleStyle: style.headerTitleStyle,
    headerStyle: style.headerStyle,
    headerBackImage: HeaderBackImage,
    gesturesEnabled: true,
    // headerLayoutPreset: 'center',
  },
}, );

export default AppStack;
