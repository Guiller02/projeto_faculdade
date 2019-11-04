import React, {Component} from 'react';

import {View, Image} from 'react-native';

import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Left,
  Body,
  Right,
  Item,
  Icon,
  Input,
} from 'native-base';

import Loading from '../../../helpers/loading';

import Header from '../Layouts/Header';

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
    } catch (err) {}
  };

  loadPoints = async () => {
    res = await api.get('/student/points');

    this.setState({points: res.data.points});
  };

  componentDidMount() {
    this.loadGrades();
    this.loadPoints();
    this.props.navigation.addListener('didFocus', payload => {
      this.setState({loading: true});
      this.loadGrades();
      this.loadPoints();
    });
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />;
    } else
      return (
        <Container>
          <Content>
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
                <Icon
                  style={{color: '#daa520'}}
                  type="MaterialIcons"
                  name="grade"
                />
              </View>
            </Header>

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

                        <Text style={{fontSize: 8, paddingLeft: 2}}>
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
