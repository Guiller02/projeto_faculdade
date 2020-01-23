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
} from 'native-base';

import {Alert} from 'react-native';

import Loading from '../../../../helpers/loading';

import api from '../../../../services/api';

import {Grid, Row, Col} from 'react-native-easy-grid';

import {styles} from './style';

import reactotron from 'reactotron-react-native';

import AsyncStorage from '@react-native-community/async-storage';

class SignIn extends Component {
  state = {register: '', password: '', error: '', loading: true};

  login = async e => {
    try {
      if (
        this.state.password == '' ||
        this.state.register == '' ||
        this.state.register.length != 5
      )
        Alert.alert('Erro na autenticação', 'Verfique novamente os campos');
      else {
        e.preventDefault();
        const res = await api.post('/auth/login', {
          register: this.state.register,
          password: this.state.password,
        });

        await AsyncStorage.setItem('@Faculade:token', res.data.token);

        const firstRegister = this.state.register.charAt(0);

        reactotron.log(firstRegister);

        firstRegister == 'P'
          ? this.props.navigation.navigate('Teacher')
          : this.props.navigation.navigate('Student', {
              Points: res.data.points,
            });
      }
    } catch (err) {
      Alert.alert('Erro na autenticação', 'Usuário inválido');
    }
  };

  isLoggedIn = async e => {
    try {
      const token = await AsyncStorage.getItem('@Faculade:token');

      reactotron.log('Token:', token);

      if (token) {
        const res = await api.get('/auth/isUser');
        reactotron.log(res);

        reactotron.log(res.data.user.charAt(0));

        reactotron.log(res);

        let firstRegister = res.data.user.charAt(0);

        reactotron.log('Primeiro registro:', firstRegister);

        firstRegister == 'P'
          ? this.props.navigation.navigate('Teacher')
          : this.props.navigation.navigate('Student');
      } else this.setState({loading: false});
    } catch (e) {
      reactotron.log(e);
      this.setState({loading: false});
    }
  };

  handleRegisterChange = register => {
    this.setState({register: register});
    reactotron.log(this.state.register);
  };

  handlePasswordChange = password => {
    this.setState({password: password});
  };

  componentDidMount() {
    this.isLoggedIn();
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />;
    } else
      return (
        <Container>
          <Grid>
            <Row style={styles.Login}>
              <Content padder contentContainerStyle={styles.LoginContent}>
                <Card style={(styles.LoginContent, styles.LoginContentCard)}>
                  <CardItem
                    style={
                      (styles.LoginContentCardItem,
                      styles.LoginHeaderCardIconsBorder)
                    }>
                    <Body style={styles.LoginHeaderCardIcons}>
                      <Icon
                        style={styles.LoginIcon}
                        active
                        type="FontAwesome"
                        name="google"
                      />
                      <Icon
                        style={styles.LoginIcon}
                        active
                        type="FontAwesome"
                        name="facebook"
                      />
                      <Icon
                        style={styles.LoginIcon}
                        active
                        type="FontAwesome"
                        name="linkedin"
                      />
                    </Body>
                  </CardItem>

                  <CardItem style={styles.LoginContentCardItem}>
                    <Body>
                      <Item floatingLabel style={{marginBottom: 10}}>
                        <Label E-mail style={styles.LoginText}>
                          Matrícula
                        </Label>
                        <Input
                          onChangeText={register =>
                            this.setState({register: register})
                          }
                          value={this.state.register}
                        />
                      </Item>

                      <Item floatingLabel>
                        <Label style={styles.LoginText}>Senha</Label>
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
                        style={styles.LoginButtonColor}
                        onPress={this.login}>
                        <Text>Entrar</Text>
                      </Button>
                    </Body>
                  </CardItem>

                  <CardItem style={styles.LoginContentCardItem}>
                    <Body style={styles.LoginFooterCard}>
                      <Button
                        style={styles.LoginFooterCardButton}
                        onPress={() => {
                          this.props.navigation.navigate('SignUp');
                        }}>
                        <Text style={{textAlign: 'center'}}>
                          Não possuo conta
                        </Text>
                      </Button>
                    </Body>

                    <Body style={styles.LoginFooterCard}>
                      <Button style={styles.LoginFooterCardButton}>
                        <Text style={{textAlign: 'center'}}>
                          Esqueci minha senha
                        </Text>
                      </Button>
                    </Body>
                  </CardItem>
                </Card>
              </Content>
            </Row>
          </Grid>
        </Container>
      );
  }
}

export default SignIn;
