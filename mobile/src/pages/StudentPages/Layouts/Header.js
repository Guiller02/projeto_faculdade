import React, {Component} from 'react';
import {View} from 'react-native';

import api from '../../../services/api';

import {Header, Text, Icon, Button, Item, Input} from 'native-base';

export default class Nav extends Component {
  state = {
    points: 0,
  };
  loadPoints = async () => {
    res = await api.get('/student/points');

    this.setState({points: res.data.points});
  };
  componentDidMount() {
    this.loadPoints();
  }

  render() {
    return (
      <Header
        androidStatusBarColor="#7B68EE"
        iosBarStyle="light-content"
        searchBar
        rounded
        style={{
          backgroundColor: '#7B68EE',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>

        <Button transparent>
          <Text>Search</Text>
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#daa520'}}>
            {this.state.points}
          </Text>

          <Icon style={{color: '#daa520'}} type="MaterialIcons" name="grade" />
        </View>
      </Header>
    );
  }
}
