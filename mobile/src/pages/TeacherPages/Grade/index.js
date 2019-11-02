import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

import {Icon} from 'native-base';

export default class index extends Component {
  static navigationOptions = {
    tabBarIcon: () => {
      return (
        <Image
          source={require('../../../images/grade.png')}
          style={{width: 25, height: 25, color: '#fff'}}
          tintColor="white"
        />
      );
    },
  };
  render() {
    return (
      <View>
        <Text> Notas </Text>
      </View>
    );
  }
}
