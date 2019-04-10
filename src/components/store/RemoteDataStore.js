/**
 * RemoteDataStore zhuyu 2018/10/18
 */

import {
  observable,
  action,
  computed,
} from 'mobx';

class DiscoverDataStore {
  @observable deviceBasicInfoMap = new Map();
  @observable deviceNetSetingObject = {};
  @observable deviceWifiDataMap = new Map();
  @observable deviceHyperlinkUrl = '';
  @observable netSetingForFixObject = {};
  @observable wifiDataForFixMap = new Map();
  @observable oneWifiDataForFixObject = {};

  @observable bindDeviceList = [{
    model: 'WitFiOS-CAP511E',
    mac: 'AA-BB-CC-DD-EE',
    ip: '192.168.1.222',
  }, {
    model: 'WitFiOS-CAP511E',
    mac: '00-11-22-33-44-55',
    ip: '192.168.1.121',
  }, {
    model: 'WitFiOS-CAP511E',
    mac: '33-44-55-66-77-88',
    ip: '192.168.1.31',
  }];

  @observable historyDeviceList = [{
    model: 'WitFiOS-CAP511E',
    mac: 'AA-BB-CC-DD-EE',
    ip: '192.168.1.222',
  }, {
    model: 'WitFiOS-CAP511E',
    mac: '00-11-22-33-44-55',
    ip: '192.168.1.121',
  }, {
    model: 'WitFiOS-CAP511E',
    mac: '33-44-55-66-77-88',
    ip: '192.168.1.31',
  }];

  @action changeDeviceNetSetingObject = ({
    data
  }) => {
    this.deviceNetSetingObject = data;
  };
  @action changeDeviceHyperlinkUrl = ({
    data
  }) => {
    this.deviceHyperlinkUrl = data;
  };
  @action changeNetSetingForFixObject = ({
    data
  }) => {
    this.netSetingForFixObject = data;
  };
  @action changeWifiDataForFixMap = ({
    data
  }) => {
    this.wifiDataForFixMap = new Map(data);
  };
  @action changeOneWifiDataForFixObject = ({
    data
  }) => {
    this.oneWifiDataForFixObject = data;
  };
  @action changeNetSetingForFixObjectSingleProperty = ({
    propertyType,
    data
  }) => {
    this.netSetingForFixObject[propertyType] = data;
  };
  @action changeoneWifiDataForFixObjectSingleProperty = ({
    propertyType,
    data
  }) => {
    this.oneWifiDataForFixObject[propertyType] = data;
  };
  @action showAllData = () => {
    console.log(this.deviceBasicInfoMap); //has url basic data
    console.log(this.deviceNetSetingObject); // basic net set
    console.log(this.deviceWifiDataMap); // basic wifi set list
    console.log(this.netSetingForFixObject); // fixed net set
    console.log(this.wifiDataForFixMap); // fixed wifi set list
    console.log(this.oneWifiDataForFixObject);
    // console.log(this.oneWifiDataForFixObject);
  };



  @action changeBindDeviceList = ({
    data
  }) => {
    this.bindDeviceList = data;
  };
  @action changeHistoryDeviceList = ({
    data
  }) => {
    this.historyDeviceList = data;
  };

}


class UserDataStore {
  @observable userData = {
    headImage: require('../img/test.jpg'),
    name: '',
    phone: '',
    email: '',
    username: '',
  };
  @observable bindData = {
    // bindACAddress: '192.168.1.234',
    // bindACUsername: 'zhuyu',
  };

  @observable jwtToken = '';
  @observable updateVersion = '暂无';


  @action changeUserData = ({
    data
  }) => {
    this.userData = data;
  };
  @action changeBindData = ({
    data
  }) => {
    this.bindData = data;
  };

  @action changeJwtToken = ({
    data
  }) => {
    this.jwtToken = data;
  };
  @action changeUpdateVersion = ({
    data
  }) => {
    this.updateVersion = data;
  };


}

const discoverDataStore = new DiscoverDataStore();
const userDataStore = new UserDataStore();

export {
  discoverDataStore,
  userDataStore
}
