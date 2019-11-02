import React, {Component} from 'react';

import {View, Image} from 'react-native';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';

import Loading from '../../../helpers/loading';

import {Table, Row, Rows} from 'react-native-table-component';

import api from '../../../services/api';

import reactotron from 'reactotron-react-native';

export default class index extends Component {
  state = {
    loading: true,
    data: [],
  };

  // unique = new Set(valores);

  loadGrades = async e => {
    try {
      const res = await api.get('/student/semester');

      reactotron.log(res);

      this.setState({data: res.data});
      reactotron.log(this.state.data);

      this.setState({loading: false});
    } catch (err) {
      this.setState({loading: false});
      reactotron.log(err);
    }
  };

  componentDidMount() {
    this.loadGrades();
  }

  render() {
    let grade;

    if (this.state.loading === true) {
      return <Loading />;
    } else
      return (
        <Container>
          <Content>
            <Header style={{backgroundColor: '#7B68EE'}}></Header>
            <List
              dataArray={this.state.data}
              renderRow={data => (
                <View>
                  <ListItem style={{justifyContent: 'center'}}>
                    <Left>
                      <Text>{data.ST_NOME_DISCIPLINA}</Text>
                    </Left>

                    {data.FL_NOTA_ALUNO === '-' && (
                      <Body
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignContent: 'center',
                        }}>
                        <Text>-----</Text>

                        <Text>{data.IT_SEMESTRE}º Semestre</Text>
                      </Body>
                    )}

                    {data.FL_NOTA_ALUNO > -1 && (
                      <Body
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Text>{data.FL_NOTA_ALUNO.toFixed(1)}</Text>

                        <Text>{data.IT_SEMESTRE}º Semestre</Text>
                      </Body>
                    )}

                    {data.FL_NOTA_ALUNO === '-' && (
                      <Right
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}>
                        <Button
                          disabled
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 44 / 2,
                            backgroundColor: 'blue',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 10, paddingLeft: 2}}>
                          Cursando
                        </Text>
                      </Right>
                    )}

                    {data.FL_NOTA_ALUNO >= 6 && (
                      <Right
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button
                          disabled
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 44 / 2,
                            backgroundColor: 'green',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 10, paddingLeft: 2}}>
                          Aprovado
                        </Text>
                      </Right>
                    )}

                    {data.FL_NOTA_ALUNO < 6 && (
                      <Right
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button
                          disabled
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 44 / 2,
                            backgroundColor: 'red',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 10, paddingLeft: 2}}>
                          Reprovado
                        </Text>
                      </Right>
                    )}
                  </ListItem>
                </View>
              )}
            />
          </Content>
        </Container>
      );
  }
}
{
  /* <List
              dataArray={this.state.data}
              renderRow={data => (
                <View>
                  <ListItem style={{justifyContent: 'center'}}>
                    <Left>
                      <Text>{data.ST_NOME_DISCIPLINA}</Text>
                    </Left>

                    {data.FL_NOTA_ALUNO === '-' && (
                      <Body
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignContent: 'center',
                        }}>
                        <Text>-----</Text>

                        <Text>{data.IT_SEMESTRE}ºSemestre</Text>
                      </Body>
                    )}

                    {data.FL_NOTA_ALUNO > -1 && (
                      <Body
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Text>{data.FL_NOTA_ALUNO.toFixed(1)}</Text>

                        <Text>{data.IT_SEMESTRE}º Semestre</Text>
                      </Body>
                    )}

                    {data.FL_NOTA_ALUNO === '-' && (
                      <Right
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}>
                        <Button
                          disabled
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 44 / 2,
                            backgroundColor: 'blue',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 10, paddingLeft: 2}}>
                          Cursando
                        </Text>
                      </Right>
                    )}

                    {data.FL_NOTA_ALUNO >= 6 && (
                      <Right
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button
                          disabled
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 44 / 2,
                            backgroundColor: 'green',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 10, paddingLeft: 2}}>
                          Aprovado
                        </Text>
                      </Right>
                    )}

                    {data.FL_NOTA_ALUNO < 6 && (
                      <Right
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button
                          disabled
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 44 / 2,
                            backgroundColor: 'red',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 10, paddingLeft: 2}}>
                          Reprovado
                        </Text>
                      </Right>
                    )}
                  </ListItem>
                </View>
              )}
            /> */
}
