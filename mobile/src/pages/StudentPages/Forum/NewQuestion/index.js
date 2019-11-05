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
  Textarea,
  Form,
  View,
  Button,
  Icon,
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
        <Content
          padder
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
          <Form
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              borderWidth: 1,
              borderColor: '#8875f0',
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 11,
                borderBottomColor: '#8875f0',
              }}>
              <Item floatingLabel style={{borderBottomWidth: 0}}>
                <Label>Título da dúvida</Label>

                <Input onChangeText={title => this.setState({title: title})} />
              </Item>
            </View>

            <View
              style={{
                marginTop: 11,
              }}>
              <Item floatingLabel>
                <Label>Descrição da dúvida</Label>
                <Input
                  multiline={true}
                  onChangeText={description =>
                    this.setState({description: description})
                  }
                />
              </Item>
            </View>
          </Form>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: 15,
              marginRight: 5,
            }}>
            <Button
              style={{
                width: 180,
                marginLeft: 10,
                marginRight: 5,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: '#8875f0',
              }}
              onPress={this.sendQuestion}>
              <Text>Enviar dúvida</Text>
              <Icon
                type="Ionicons"
                name="md-send"
                style={{color: '#fff'}}></Icon>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
