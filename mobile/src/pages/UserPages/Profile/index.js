import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {Icon} from 'native-base';
import reactotron from 'reactotron-react-native';

export default class index extends Component {
  removeValue = async () => {
    await AsyncStorage.removeItem('@Faculade:token');
    this.props.navigation.navigate('Sign');

    console.log('Done.');
  };
  componentDidMount() {}
  render() {
    return (
      <View>
        <Text> Perfil </Text>
        <Button title="Sair do perfil" onPress={this.removeValue}></Button>
      </View>
    );
  }
}
