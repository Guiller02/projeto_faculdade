import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Button,
} from 'native-base';

import Loading from '../../../../helpers/loading';

import Header from '../../Layouts/Header';

import api from '../../../../services/api';

export default class index extends Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.loadAllDisciplines();
  }

  loadAllDisciplines = async () => {
    const res = await api.get('/teacher/allDisciplines');

    this.setState({data: res.data, loading: false});
  };

  render() {
    if (this.state.loading === true) {
      return <Loading></Loading>;
    }
    return (
      <Container>
        <Header />

        <Content>
          <List
            dataArray={this.state.data}
            renderRow={data => (
              <View style={{borderColor: '#f1f1f1', borderWidth: 11}}>
                <ListItem>
                  <Body>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 5,
                      }}>
                      <Text>{data.ST_NOME_DISCIPLINA}</Text>

                      <Text>Turma: {data.INT_COD_TURMA}</Text>

                      {data.CONTACODALUNO - data.CONTNOTAALUNO != 0 && (
                        <Button
                          disabled
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: 44 / 2,
                            backgroundColor: 'red',
                          }}>
                          <Text></Text>
                        </Button>
                      )}
                      {data.CONTACODALUNO - data.CONTNOTAALUNO === 0 && (
                        <Button
                          disabled
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: 44 / 2,
                            backgroundColor: 'green',
                          }}>
                          <Text></Text>
                        </Button>
                      )}
                    </View>

                    {data.CONTACODALUNO === 1 && (
                      <Text style={{textAlign: 'justify'}}>
                        Existe {data.CONTACODALUNO} aluno(a) matriculado nessa
                        disciplina e {data.CONTNOTAALUNO} sem nota
                      </Text>
                    )}

                    {data.CONTACODALUNO > 1 && (
                      <Text style={{textAlign: 'justify'}}>
                        Existe {data.CONTACODALUNO} alunos(as) matriculados
                        nessa disciplina e{' '}
                        {data.CONTACODALUNO - data.CONTNOTAALUNO} sem nota
                      </Text>
                    )}
                  </Body>
                </ListItem>

                <View>
                  <Button
                    style={{justifyContent: 'center'}}
                    onPress={() =>
                      this.props.navigation.navigate('Class', {Class: data})
                    }>
                    <Text>Verificar turma</Text>
                  </Button>
                </View>
              </View>
            )}></List>
        </Content>
      </Container>
    );
  }
}
