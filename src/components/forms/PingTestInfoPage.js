/**
 * PingTestInfoPage zhuyu 2018/8/15
 */


import React, {
  Component
} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {
  observer
} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../css/PingTestInfoPageStyle';
import PingTestAndroid from '../../modules/PingTestAndroid';

const PAGE_WORD = {
  start: '开始',
  stop: '停止',
};

@observer
export default class PingTestInfoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // play: true,
      result: [],
    };
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: navigation.getParam('ip'),
    };
  };

  flatListData = () => {
    let data = this.state.result;
    return data;
  };


  renderItem = ({
    item
  }) => {
    return (
      <View style = { style.renderItemView }>
        <Text style = { style.renderItemText }>
          { item }
        </Text>
      </View>
    );

  };

  // changePingEvent = () => {
  //   this.setState({
  //     play: !play,
  //   });
  // };

  // listFooterComponent = () => {
  //   let title = this.state.play === true ? PAGE_WORD.stop : PAGE_WORD.start;
  //   return (
  //     <View style = { style.listFooterComponentView }>
  //       <TouchableOpacity
  //         style = { style.listFooterComponentButton }
  //         onPress = { this.changePingEvent.bind(this) }
  //       >
  //         <View style = { style.listFooterComponentButtonTitleView }>
  //           <Text style = { style.listFooterComponentButtonTitle }>{ title }</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  pingTest = async () => {
    let content = '';
    let i = 0;
    let ip = this.props.navigation.getParam('ip');
    let interval = this.props.navigation.getParam('interval');
    let overtime = this.props.navigation.getParam('overtime');
    let dataPack = this.props.navigation.getParam('dataPack');
    let unlimited = this.props.navigation.getParam('unlimited');
    let limitedPack = this.props.navigation.getParam('limitedPack');
    // let play = this.state.play;
    let command = '';
    try {
      if (unlimited) {
        command = `ping -i ${ interval } -s ${ dataPack } -W ${ overtime } ${ ip }`;
      } else {
        command = `ping -c ${ limitedPack }  -i ${ interval } -s ${ dataPack } -W ${ overtime } ${ ip }`;
      }
      await PingTestAndroid.pingTestAndroid(command);
    } catch (e) {
      console.error(e);
    }
  };

  onPingResult = (data) => {
    this.setState((state) => {
      // let res = data !== '' ? data : '请求超时';
      state.result.push(data);
      return {
        result: state.result,
      }
    });
  };

  componentWillMount() {
    DeviceEventEmitter.addListener('onPingResult', this.onPingResult);
  };
  componentDidMount() {
    this.pingTest.call(this);
  };
  componentWillUnmount() {
    // this.setState({
    //   play: false,
    // });
  }

  render() {
    let data = this.flatListData.call(this);
    // let listFooterComponent = this.listFooterComponent.call(this);
    return (
      <View style = { style.container }>
        <View style = { style.listView }>
          <FlatList
            data = { data }
            renderItem = { this.renderItem.bind(this) }
            // ListFooterComponent = { listFooterComponent }
          />
        </View>
      </View>
    );
  }
}
