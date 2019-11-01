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

import reactotron from 'reactotron-react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {Alert} from 'react-native';

import api from '../../../../services/api';

import {Grid, Row} from 'react-native-easy-grid';

export default class SignUp extends Component {
  state = {
    userType: 0,
    name: '',
    mail: '',
    CPF: '',
    password: '',
  };
  onUserChange(value) {
    this.setState({
      userType: value,
    });
  }

  static navigationOptions = () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#9370DB',
    },
  });

  register = async e => {
    try {
      if (
        this.state.name == '' ||
        this.state.mail == '' ||
        this.state.CPF == '' ||
        this.state.password == ''
      )
        Alert.alert('Erro na autenticação', 'Verfique novamente os campos');
      else {
        e.preventDefault();
        const res = await api.post('/auth/register', {
          option: this.state.userType,
          register: this.state.register,
          password: this.state.password,
          cpf: this.state.CPF,
          name: this.state.CPF,
          email: this.state.CPF,
        });

        await AsyncStorage.setItem('@Faculade:token', res.data.token);

        Alert.alert(
          'Bem Vindo',
          'Seu usuário foi criado, por favor, verifique o email',
        );

        reactotron.log(this.state.userType);
        if (this.state.userType == 0) {
          this.props.navigation.navigate('Forum');
        } else if (this.state.userType === 1) {
          this.props.navigation.navigate('SignIn');
        }
      }
    } catch (err) {
      Alert.alert('Erro na autenticação', 'Usuário inválido');
    }
  };

  render() {
    return (
      <Container style={styles.SignUp}>
        <Content padder>
          <Card style={styles.SignUpForm}>
            <CardItem>
              <Body>
                <Item picker style={styles.SignUpItemMargin}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    placeholder="Select your SIM"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.userType}
                    onValueChange={this.onUserChange.bind(this)}>
                    <Picker.Item
                      label="Aluno"
                      value="0"
                      onPress={() => {
                        this.setState.userType = 0;
                      }}
                    />
                    <Picker.Item
                      label="Professor"
                      value="1"
                      onPress={() => {
                        this.setState.userType = 1;
                      }}
                    />
                  </Picker>
                </Item>

                <Item floatingLabel style={styles.SignUpItemMargin}>
                  <Label> Nome Completo</Label>
                  <Input
                    onChangeText={name => this.setState({name: name})}
                    value={this.state.name}
                  />
                </Item>

                <Item floatingLabel style={styles.SignUpItemMargin}>
                  <Label> Email</Label>
                  <Input
                    onChangeText={mail => this.setState({mail: mail})}
                    value={this.state.mail}
                  />
                </Item>

                <Item floatingLabel style={styles.SignUpItemMargin}>
                  <Label> CPF</Label>
                  <Input
                    onChangeText={CPF => this.setState({CPF: CPF})}
                    value={this.state.CPF}
                  />
                </Item>

                <Item floatingLabel style={styles.SignUpItemMargin}>
                  <Label> Senha</Label>
                  <Input
                    secureTextEntry={true}
                    autoCompleteType="password"
                    onChangeText={password =>
                      this.setState({password: password})
                    }
                    value={this.state.password}
                  />
                </Item>

                <Button
                  block
                  style={{marginTop: 30, backgroundColor: '#7B68EE'}}
                  onPress={this.register}>
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
