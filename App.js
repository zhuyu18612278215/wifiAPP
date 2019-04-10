/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import {
  Provider
} from 'mobx-react';

import PageStack from './src/components/navigations/PageStack';
import stores from './src/components/store/AllStore';

export default class IndexView extends Component {
  render() {
    return (
      <Provider { ...stores }>
        <PageStack />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('wifiapp', () => IndexView);
