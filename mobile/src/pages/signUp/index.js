import React, {Component} from 'react';

import {
  Container,
  Button,
  Icon,
  Content,
  Card,
  Body,
  CardItem,
  Text,
  Input,
  Item,
  Label,
  Picker,
} from 'native-base';

import {styles} from './style';

import {Grid, Row} from 'react-native-easy-grid';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value,
    });
  }

  static navigationOptions = () => ({
    title: 'My App',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#9370DB',
    },
  });

  render() {
    return (
      <Container style={styles.SignUp}>
        <Content padder>
          <Card style={styles.SignUpForm}>
            <Row size={1}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{width: undefined}}
                placeholder="Aluno ou Professor?"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}>
                <Item label="Aluno" value="key0" />
                <Item label="Professor" value="key1" />
              </Picker>
            </Row>
            <CardItem>
              <Body>
                <Item floatingLabel>
                  <Label>Nome Completo</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>CPF</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Senha</Label>
                  <Input secureTextEntry={true} autoCompleteType="password" />
                </Item>

                <Item floatingLabel>
                  <Label>Confirmar senha</Label>
                  <Input secureTextEntry={true} autoCompleteType="password" />
                </Item>

                <Button
                  block
                  style={{marginTop: 30, backgroundColor: '#7B68EE'}}>
                  <Text>Registrar</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
