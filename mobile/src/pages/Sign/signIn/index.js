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

import {Grid, Row, Col} from 'react-native-easy-grid';

import {styles} from './style';

class SignIn extends Component {
  render() {
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
                    <Item floatingLabel>
                      <Label style={styles.LoginText}>Matrícula</Label>
                      <Input />
                    </Item>

                    <Item floatingLabel>
                      <Label style={styles.LoginText}>Senha</Label>
                      <Input
                        secureTextEntry={true}
                        autoCompleteType="password"
                      />
                    </Item>

                    <Button
                      block
                      style={styles.LoginButtonColor}
                      onPress={() => {
                        this.props.navigation.navigate('App');
                      }}>
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
