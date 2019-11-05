import React, {Component} from 'react';

import {View, FlatList, Image} from 'react-native';

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
    newDataArray: [],
  };

  // unique = new Set(valores);

  loadGrades = async e => {
    try {
      const res = await api.get('/student/semester');

      reactotron.log(res);

      this.setState({data: res.data, loading: false});
      reactotron.log(this.state.data);

      const newDataArray = [];
      this.state.data.forEach(obj => {
        if (!newDataArray.some(o => o.name === obj.name)) {
          newDataArray.push({...obj});
        }
      });

      reactotron.log(this.state.newDataArray);
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
              dataArray={this.state.newDataArray}
              renderRow={data => {
                <View>
                  <ListItem itemDivider>
                    <Text>{data.IT_SEMESTRE}º Semestre}</Text>
                  </ListItem>

                  <FlatList
                    data={this.state.data}
                    renderItem={item => {
                      if (item.IT_SEMESTRE === data.IT_SEMESTRE) {
                        return (
                          <ListItem
                            style={{
                              justifyContent: 'center',
                              alignContent: 'space-between',
                            }}>
                            <Left>
                              <Text>{item.ST_NOME_DISCIPLINA}</Text>
                            </Left>

                            {item.FL_NOTA_ALUNO === '-' && (
                              <Body
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignContent: 'center',
                                }}>
                                <Text>-----</Text>
                              </Body>
                            )}

                            {item.FL_NOTA_ALUNO > -1 && (
                              <Body
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                }}>
                                <Text>{item.FL_NOTA_ALUNO.toFixed(1)}</Text>
                              </Body>
                            )}

                            {item.FL_NOTA_ALUNO >= 6 && (
                              <Right
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                }}>
                                <Button
                                  disabled
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 44 / 2,
                                    backgroundColor: '#c0f030',
                                  }}>
                                  <Text></Text>
                                </Button>
                              </Right>
                            )}

                            {item.FL_NOTA_ALUNO === `-` && (
                              <Right
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                }}>
                                <Button
                                  disabled
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 44 / 2,
                                    backgroundColor: '#2555d9',
                                  }}>
                                  <Text></Text>
                                </Button>
                              </Right>
                            )}

                            {item.FL_NOTA_ALUNO < 6 && (
                              <Right>
                                <Button
                                  disabled
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 44 / 2,
                                    backgroundColor: '#ab2e46',
                                  }}>
                                  <Text></Text>
                                </Button>
                              </Right>
                            )}
                          </ListItem>
                        );
                      }
                    }}></FlatList>
                </View>;
              }}
            />
          </Content>
        </Container>
      );
  }
}
