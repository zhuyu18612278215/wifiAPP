/**
 * TabNavigator zhuyu 2018/4/20
 */


import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import DiscoverPage from '../forms/DiscoverPage';
import CommonUsePage from '../forms/CommonUsePage';
import MinePage from '../forms/MinePage';
import style from '../../css/TabNavigatorStackStyle';
import CommonUseDevPage from '../forms/CommonUseDevPage';
import CommonUseToolPage from '../forms/CommonUseToolPage';
import CommonUseNetTestPage from '../forms/CommonUseNetTestPage';
import CommonUseWlanTestPage from '../forms/CommonUseWlanTestPage';
import VendorInquiryPage from '../forms/VendorInquiryPage';
import IpAttributionPage from '../forms/IpAttributionPage';
import IpAddressPlanningPage from '../forms/IpAddressPlanningPage';
import PingTestCheckPage from '../forms/PingTestCheckPage';
import PingTestInfoPage from '../forms/PingTestInfoPage';
import APSettingPage from '../forms/APSettingPage';
import WlanSettingPage from '../forms/WlanSettingPage';
import ACInfoPage from '../forms/ACInfoPage';


import Icon from 'react-native-vector-icons/FontAwesome';

import TabPageHeaderLeftTitle from '../../common/TabPageHeaderLeftTitle';
import HeaderBackImage from '../../common/HeaderBackImage';

const PAGE_WORD = {
  commonUseTitle: '常用',
  discoverTitle: '发现',
  mineTitle: '我的',
};

const CommonUseStack = createStackNavigator({
  CommonUsePage: {
    screen: CommonUsePage,
    navigationOptions: ({
      navigation
    }) => ({
      headerLeft: TabPageHeaderLeftTitle,
      headerStyle: style.tabHeadStyle,
    }),
  },
  CommonUseDevPage: {
    screen: CommonUseDevPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  CommonUseToolPage: {
    screen: CommonUseToolPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  CommonUseNetTestPage: {
    screen: CommonUseNetTestPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  CommonUseWlanTestPage: {
    screen: CommonUseWlanTestPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  VendorInquiryPage: {
    screen: VendorInquiryPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  IpAttributionPage: {
    screen: IpAttributionPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  IpAddressPlanningPage: {
    screen: IpAddressPlanningPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  PingTestCheckPage: {
    screen: PingTestCheckPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  PingTestInfoPage: {
    screen: PingTestInfoPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },

}, {
  initialRouteName: 'CommonUsePage',
});

const DiscoverStack = createStackNavigator({
  DiscoverPage: {
    screen: DiscoverPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerLeft: TabPageHeaderLeftTitle,
      headerStyle: style.tabHeadStyle,
    }),
  },
  APSettingPage: {
    screen: APSettingPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
  WlanSettingPage: {
    screen: WlanSettingPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
}, {
  initialRouteName: 'DiscoverPage',
});

const MineStack = createStackNavigator({
  MinePage: {
    screen: MinePage,
    navigationOptions: ({
      navigation
    }) => ({
      headerLeft: TabPageHeaderLeftTitle,
      headerStyle: style.tabHeadStyle,
    }),
  },
  ACInfoPage: {
    screen: ACInfoPage,
    navigationOptions: ({
      navigation
    }) => ({
      headerBackImage: HeaderBackImage,
      headerTitleStyle: style.headerTitleStyle,
      headerStyle: style.headerStyle,
    }),
  },
}, {
  initialRouteName: 'MinePage',
});


const TabNavigatorStack = createBottomTabNavigator({
  DiscoverStack: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel: PAGE_WORD.discoverTitle,
    },
  },
  // CommonUse: {
  //   screen: CommonUseStack,
  //   navigationOptions: {
  //     tabBarLabel: PAGE_WORD.commonUseTitle,
  //   },
  // },
  MineStack: {
    screen: MineStack,
    navigationOptions: {
      tabBarLabel: PAGE_WORD.mineTitle,
    },
  },
}, {
  initialRouteName: 'DiscoverStack',
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
    showIcon: true,
  },
  animationEnabled: true,
  swipeEnabled: false,
  lazy: true,
}, );

CommonUseStack.navigationOptions = ({
  navigation
}) => {
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false,
      header: null,
    };
  }
};

DiscoverStack.navigationOptions = ({
  navigation
}) => {
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false,
      header: null,
    };
  }
};

MineStack.navigationOptions = ({
  navigation
}) => {
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false,
      header: null,
    };
  }
};


export default TabNavigatorStack;
