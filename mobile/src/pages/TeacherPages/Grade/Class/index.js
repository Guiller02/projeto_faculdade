import React, {Component} from 'react';

import {View, Alert, FlatList} from 'react-native';

import api from '../../../../services/api';

import reactotron from 'reactotron-react-native';

import Loading from '../../../../helpers/loading';

import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Input,
  Item,
  Body,
  Left,
  Right,
} from 'native-base';

export default class index extends Component {
  state = {
    loading: true,
    data: [],
  };

  loadClass = async () => {
    const {navigation} = this.props;

    reactotron.log(navigation);

    const res = await api.get(
      `/teacher/discipline/${navigation.state.params.Class.INT_ID_DISCIPLINA}/class/${navigation.state.params.Class.INT_COD_TURMA}`,
    );

    this.setState({data: res.data, loading: false});
  };

  componentDidMount() {
    this.loadClass();
  }

  sendGrades = async () => {
    this.setState({loading: true});
    const {navigation} = this.props;
    reactotron.log(this.state.data);

    await api.post('/teacher/discipline', {
      discipline: {
        class: navigation.state.params.Class.INT_COD_TURMA,
        discipline: navigation.state.params.Class.INT_ID_DISCIPLINA,
        users: this.state.data,
      },
    });
    setTimeout(() => {
      this.setState({loading: false});
    }, 4000);
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => (
    <ListItem key={this.keyExtractor}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 5,
          alignItems: 'center',
        }}>
        <Left>
          <Text>{item.ST_NOME_ALUNO}</Text>
        </Left>

        <Body>
          <Text>{item.ST_COD_ALUNO}</Text>
        </Body>

        <Right>
          <Item regular>
            <Input
              mask={'[0.0]'}
              keyboardType={'numeric'}
              maxLength={3}
              onChangeText={value => {
                const newObject = this.state.data;
                const newArray = [...this.state.data];
                newArray[index].GRADE = value;
                newObject.data = newArray;

                this.setState({
                  data: newObject,
                });

                reactotron.log(this.state.data);
              }}>
              {item.GRADE === null && <Text>0.0</Text>}
              <Text>{`${item.GRADE}`}</Text>
            </Input>
          </Item>
        </Right>
      </View>
    </ListItem>
  );

  render() {
    if (this.state.loading === true) {
      return <Loading></Loading>;
    } else {
      return (
        <Container>
          <Content>
            <FlatList
              data={this.state.data}
              key={this.keyExtractor}
              renderItem={this.renderItem}></FlatList>
            <Button
              style={{justifyContent: 'center', backgroundColor: '#8875f0'}}
              onPress={this.sendGrades}>
              <Text>Lançar notas</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}
