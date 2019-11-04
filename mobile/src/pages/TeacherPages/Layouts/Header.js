import React, {Component} from 'react';

import {Header, Text, Icon, Button, Item, Input} from 'native-base';

export default class Nav extends Component {
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
          <Input placeholder="Procurar" />
        </Item>

        <Button transparent>
          <Text>Procurar</Text>
        </Button>
      </Header>
    );
  }
}
