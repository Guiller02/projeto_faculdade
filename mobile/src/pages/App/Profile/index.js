import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {Icon} from 'native-base';

export default class index extends Component {
  static navigationOptions = {
    tabBarIcon: () => {
      return <Icon type="MaterialIcons" name="person" size={25} />;
    },
  };
  render() {
    return (
      <View>
        <Text> Perfil </Text>
      </View>
    );
  }
}
