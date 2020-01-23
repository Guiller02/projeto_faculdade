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

              <CardItem style={{backgroundColor: '#8875f0'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <Text style={{color: '#fff'}}>
                    {this.state.data.data.question.data.substring(8, 10) +
                      '/' +
                      this.state.data.data.question.data.substring(5, 7) +
                      '/' +
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        style={{marginTop: 4, fontSize: 15, color: '#fff'}}
                        type="MaterialIcons"
                        name="chat">
                        {' '}
                      </Icon>
                      <Text style={{paddingRight: 15, color: '#fff'}}>
                        {this.state.data.data.question.answers.length}
                      </Text>
                    </View>

                    {this.state.data.data.question.status === true && (
                      <Button
                        disabled
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 44 / 2,
                          backgroundColor: '#c0f030',
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
                          backgroundColor: '#ab2e46',
                        }}>
                        <Text></Text>
                      </Button>
                    )}
                  </Right>
                </View>
              </CardItem>

              <Card
                style={{
                  paddingBottom: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#8875f0',
                }}>
                <View>
                  <Form
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: '#8875f0',
                    }}>
                    <Textarea
                      rowSpan={5}
                      placeholder="Digite sua solução"
                      onChangeText={solution =>
                        this.setState({solution: solution})
                      }
                      value={this.state.solution}
                    />
                  </Form>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginTop: 15,
                      marginRight: 5,
                    }}>
                    <Button
                      style={{
                        width: 180,
                        marginLeft: 10,
                        marginRight: 5,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#8875f0',
                      }}
                      onPress={this.sendSolution}>
                      <Text>Enviar Solução</Text>
                      <Icon
                        type="Ionicons"
                        name="md-send"
                        style={{color: '#fff'}}></Icon>
                    </Button>
                  </View>
                </View>
              </Card>

              <CardItem style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#595959',
                    fontWeight: 'bold',
                  }}>
                  Respostas
                </Text>
              </CardItem>

              <CardItem>
                <List
                  dataArray={this.state.answers}
                  key={this.state.answers._id}
                  renderRow={data => (
                    <View
                      style={{
                        backgroundColor: '#8875f0',
                        borderColor: '#d1d1d1',
                        borderWidth: 2,
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}>
                      <Text style={{color: 'white'}}>
                        {data.data.substring(8, 10) +
                          '-' +
                          data.data.substring(5, 7) +
                          '-' +
                          data.data.substring(0, 4)}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}>
                        <Text style={{color: 'white'}}>{data.username}</Text>
                        <Text style={{color: 'white'}}>
                          {data.userRegister}
                        </Text>
                      </View>

                      <Text style={{color: 'white'}}>{data.answer}</Text>
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
