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

class NestedGrid extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Row style={styles.Login}>
            <Content padder contentContainerStyle={styles.LoginContent}>
              <Card style={styles.LoginContent}>
                <CardItem style={styles.LoginHeaderCardIconsBorder}>
                  <Body style={styles.LoginHeaderCardIcons}>
                    <Icon active type="FontAwesome" name="google" />
                    <Icon active type="FontAwesome" name="facebook" />
                    <Icon active type="FontAwesome" name="linkedin" />
                  </Body>
                </CardItem>

                <CardItem>
                  <Body>
                    <Item floatingLabel>
                      <Label style={{justifyContent: 'space-around'}}>
                        <Icon active name="home" />
                        <Text>Matrícula</Text>
                      </Label>
                      <Input />
                    </Item>

                    <Item floatingLabel>
                      <Label style={{justifyContent: 'space-around'}}>
                        <Icon type="FontAwesome" name="lock" />
                        <Text> Senha</Text>
                      </Label>
                      <Input />
                    </Item>

                    <Button block style={{marginTop: 30}}>
                      <Text>Entrar</Text>
                    </Button>
                  </Body>
                </CardItem>

                <CardItem>
                  <Body style={styles.LoginFooterCard}>
                    <Text>Não Possuí conta?</Text>
                    <Button style={styles.LoginFooterCardButton}>
                      <Text style={{textAlign: 'center'}}>
                        Clique para Registrar-se
                      </Text>
                    </Button>
                  </Body>

                  <Body style={styles.LoginFooterCard}>
                    <Text>Esqueceu sua senha?</Text>
                    <Button style={styles.LoginFooterCardButton}>
                      <Text style={{textAlign: 'center'}}>
                        Clique para Recuperar
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

export default NestedGrid;
