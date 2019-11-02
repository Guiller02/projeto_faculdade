import React, {Component} from 'react';
import {View} from 'react-native';

import Spinner from 'react-native-spinkit';

export default class Loading extends Component {
  state = {
    size: 100,
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Spinner size={this.state.size} type="ThreeBounce" color="#9370DB" />
      </View>
    );
  }
}
