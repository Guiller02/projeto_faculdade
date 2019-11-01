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

  loadGrades = async e => {
    try {
      const res = await api.get('/student/semester');
      reactotron.log(res);
      this.setState({data: res.data});
      reactotron.log(this.state.data);
      this.setState({loading: false});
    } catch (err) {
      this.setState({loading: false});
      <Text>AAAAAAAAAAAAAAAAAAa</Text>;
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
          <Header />
          <Content>
            <List
              dataArray={this.state.data}
              renderRow={data => (
                <View>
                  <ListItem style={{justifyContent: 'space-around', flex: 1}}>
                    <Left>
                      <Text>{data.ST_NOME_DISCIPLINA}</Text>
                    </Left>

                    {data.FL_NOTA_ALUNO === '-' && (
                      <Body
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
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
                          justifyContent: 'space-around',
                        }}>
                        <Text>{data.FL_NOTA_ALUNO.toFixed(1)}</Text>

                        <Text>{data.IT_SEMESTRE}º Semestre</Text>
                      </Body>
                    )}

                    {data.FL_NOTA_ALUNO === '-' && (
                      <Right
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button
                          disabled
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 44 / 2,
                            backgroundColor: 'blue',
                          }}>
                          <Text></Text>
                        </Button>

                        <Text style={{fontSize: 11, paddingLeft: 5}}>
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

                        <Text style={{fontSize: 11, paddingLeft: 5}}>
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

                        <Text style={{fontSize: 11, paddingLeft: 5}}>
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

// <ListItem itemDivider>
//                 <Text>1º Semestre</Text>
//               </ListItem>

//               <ListItem style={{justifyContent: 'space-around', flex: 1}}>
//                 <Left>
//                   <Text>Banco de dados 1</Text>
//                 </Left>

//                 <Body>
//                   <Text>2</Text>
//                 </Body>

//                 <Right style={{flexDirection: 'row', alignItems: 'center'}}>
//                   <Button
//                     disabled
//                     style={{
//                       width: 12,
//                       height: 12,
//                       borderRadius: 44 / 2,
//                       backgroundColor: 'red',
//                     }}>
//                     <Text></Text>
//                   </Button>
//                   <Text style={{fontSize: 11, paddingLeft: 5}}>Reprovado</Text>
//                 </Right>
//               </ListItem>
