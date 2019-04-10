/**
 * LocalDataStore zhuyu 2018/10/18
 */

import {
  observable,
  action,
  computed,
} from 'mobx';

class LocalDataStore {
  @observable wifi = '';
  @observable ip = '';
  @observable language = '简体中文';
  @observable version = 'V20R001C0B098';
  @observable qq = '1234567890';
  @observable url = 'http://192.168.1.234:8090';

  @action changeWifi = ({
    data
  }) => {
    this.wifi = data;
  };
  @action changeIp = ({
    data
  }) => {
    this.ip = data;
  };
  @action changeLanguage = ({
    data
  }) => {
    this.language = data;
  };
  @action changeVersion = ({
    data
  }) => {
    this.version = data;
  };
  @action changeQQ = ({
    data
  }) => {
    this.qq = data;
  };
}

const localDataStore = new LocalDataStore();

export {
  localDataStore
}
