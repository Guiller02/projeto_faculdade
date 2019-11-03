import React, {Component} from 'react';

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  View,
  Button,
  Right,
  List,
  Form,
  Textarea,
  Icon,
  Header,
  Left,
  Body,
} from 'native-base';

import Loading from '../../../../helpers/loading';

import api from '../../../../services/api';

import reactotron from 'reactotron-react-native';

import {TouchableOpacity} from 'react-native';

export default class Question extends Component {
  state = {
    data: undefined,
    loading: true,
    answers: [],
    solution: '',
    ordenedAnswers: [],
  };

  sendSolution = async () => {
    this.setState({loading: true});
    reactotron.log(this.state.data.data.question._id);
    res = await api.put(
      '/student/forum/createAnswer/' + this.state.data.data.question._id,
      {
        answer: this.state.solution,
      },
    );

    this.setState({solution: ''});

    this.loadQuestion();
  };

  loadQuestion = async () => {
    const {navigation} = this.props;
    this.setState({
      data: await api.get(
        '/student/forum/' + navigation.state.params.Question._id,
      ),
      loading: false,
    });

    this.setState({
      answers: this.state.data.data.question.answers.sort(
        (a, b) => a.date > b.date,
      ),
    });

    reactotron.log(this.state.answers);
  };

  componentDidMount() {
    this.loadQuestion();
  }

  render() {
    const {navigation} = this.props;
    if (this.state.loading === true) {
      return <Loading></Loading>;
    } else {
      return (
        <Container>
          <Header
            style={{backgroundColor: '#7B68EE'}}
            androidStatusBarColor="#7B68EE"
            iosBarStyle="light-content">
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Left>
                <TouchableOpacity
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon
                    type="MaterialIcons"
                    name="arrow-back"
                    style={{color: '#fff'}}></Icon>
                </TouchableOpacity>
              </Left>

              <View style={{justifyContent: 'center'}}>
                <Text style={{color: '#fff'}}>
                  {this.state.data.data.question.title}
                </Text>
              </View>

              <Right>
                <TouchableOpacity transparent>
                  <Icon
                    type="MaterialIcons"
                    name="more-vert"
                    style={{color: '#fff'}}></Icon>
                </TouchableOpacity>
              </Right>
            </View>
          </Header>
          <Content>
            <Card>
              <CardItem>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <Text>{this.state.data.data.question.username}</Text>
                  <Text>{this.state.data.data.question.userRegister}</Text>
                </View>
              </CardItem>

              <CardItem>
                <View>
                  <Text style={{marginBottom: 11}}>
                    {this.state.data.data.question.description}
                  </Text>
                </View>
              </CardItem>

              <CardItem style={{backgroundColor: '#ddd'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <Text>
                    {this.state.data.data.question.data.substring(8, 10) +
                      '-' +
                      this.state.data.data.question.data.substring(5, 7) +
                      '-' +
                      this.state.data.data.question.data.substring(0, 4)}
                  </Text>

                  <Right
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Text style={{paddingRight: 15}}>
                      !{this.state.data.data.question.answers.length}
                    </Text>

                    {this.state.data.data.question.status === true && (
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
                    {this.state.data.data.question.status === false && (
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
                  </Right>
                </View>
              </CardItem>

              <View>
                <Form>
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="Digite sua solução"
                    onChangeText={solution =>
                      this.setState({solution: solution})
                    }
                    value={this.state.solution}
                  />
                </Form>
                <TouchableOpacity
                  onPress={this.sendSolution}
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={{color: 'blue'}}>Enviar solução</Text>
                </TouchableOpacity>
              </View>

              <CardItem style={{justifyContent: 'center'}}>
                <Text>Respostas</Text>
              </CardItem>

              <CardItem>
                <List
                  dataArray={this.state.answers}
                  key={this.state.answers._id}
                  renderRow={data => (
                    <View style={{marginBottom: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}>
                        <Text>{data.username}</Text>
                        <Text>{data.userRegister}</Text>
                      </View>

                      <Text>{data.answer}</Text>

                      <Text>
                        {data.data.substring(8, 10) +
                          '-' +
                          data.data.substring(5, 7) +
                          '-' +
                          data.data.substring(0, 4)}
                      </Text>
                    </View>
                  )}></List>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
  }
}
