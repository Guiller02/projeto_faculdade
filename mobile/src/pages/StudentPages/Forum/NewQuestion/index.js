import React, {Component} from 'react';

import {TouchableOpacity} from 'react-native';

import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Label,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Text,
} from 'native-base';

import api from '../../../../services/api';

export default class NewQuestion extends Component {
  state = {
    title: '',
    description: '',
  };
  sendQuestion = async () => {
    try {
      res = await api.post('/student/forum', {
        title: this.state.title,
        description: this.state.description,
      });

      this.props.navigation.goBack();
    } catch (err) {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <Container>
        <Header
          style={{backgroundColor: '#7B68EE'}}
          androidStatusBarColor="#7B68EE"
          iosBarStyle="light-content">
          <Left>
            <TouchableOpacity
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{color: '#fff'}}>Cancelar</Text>
            </TouchableOpacity>
          </Left>
          <Body></Body>

          <Right>
            <TouchableOpacity transparent onPress={() => this.sendQuestion()}>
              <Text style={{color: '#fff'}}>Enviar</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content
          padder
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
          <Card>
            <CardItem bordered>
              <Body>
                <Item floatingLabel>
                  <Label>Título da dúvida</Label>

                  <Input
                    onChangeText={title => this.setState({title: title})}
                  />
                </Item>
              </Body>
            </CardItem>

            <CardItem footer bordered>
              <Item floatingLabel>
                <Label>Descrição da dúvida</Label>
                <Input
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={description =>
                    this.setState({description: description})
                  }
                />
              </Item>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
