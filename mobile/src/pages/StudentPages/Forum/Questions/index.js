import React, {Component} from 'react';

import {View, TouchableOpacity} from 'react-native';

import Loading from '../../../../helpers/loading';

import api from '../../../../services/api';

import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Button,
  Body,
  Fab,
  Icon,
  Header,
  Item,
  Input,
} from 'native-base';

import {styles} from './style';

import reactotron from 'reactotron-react-native';

export default class index extends Component {
  state = {
    loading: true,
    data: [],
  };

  forum = async e => {
    try {
      res = await api.get('/student/forum');
      reactotron.log(api);

      this.setState({data: res.data.questionsList});

      this.setState({loading: false});
    } catch (e) {
      reactotron.log(e);
    }
  };

  loadPoints = async () => {
    res = await api.get('/student/points');

    this.setState({points: res.data.points});
  };

  componentDidMount() {
    this.forum();
    this.loadPoints();
    this.props.navigation.addListener('didFocus', payload => {
      this.setState({loading: true});
      this.forum();
      this.loadPoints();
    });
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />;
    } else {
      return (
        <Container>
          <Header
            androidStatusBarColor="#7B68EE"
            iosBarStyle="light-content"
            searchBar
            rounded
            style={styles.header}>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Procurar" />
            </Item>
            <Button transparent>
              <Text>Procurar</Text>
            </Button>
            <View style={styles.headerCenterIcons}>
              <Text style={{fontSize: 20, color: '#daa520'}}>
                {this.state.points}
              </Text>
              <Icon
                style={{marginLeft: `5%`, color: '#daa520'}}
                type="MaterialIcons"
                name="grade"
              />
            </View>
          </Header>

          <Content>
            <List
              style={{}}
              dataArray={this.state.data}
              keyExtractor={(data, index) => data._id}
              renderRow={data => (
                <ListItem>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Question', {
                        Question: data,
                      })
                    }
                    style={styles.list}>
                    <Body>
                      <Text>{data.title}</Text>

                      <Text>{data.username}</Text>

                      <Text>
                        {data.data.substring(8, 10) +
                          '/' +
                          data.data.substring(5, 7) +
                          '/' +
                          data.data.substring(0, 4)}
                      </Text>
                    </Body>

                    <Right style={styles.listRightElements}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          style={{marginTop: 4, fontSize: 15, color: '#8875f0'}}
                          type="MaterialIcons"
                          name="chat">
                          {' '}
                        </Icon>
                        <Text style={{marginRight: -10}}>
                          {data.answers.length}
                        </Text>
                      </View>

                      {data.status === true && (
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

                      {data.status === false && (
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
                  </TouchableOpacity>
                </ListItem>
              )}></List>
          </Content>

          <Fab
            style={{backgroundColor: '#7B68EE'}}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('NewQuestion')}>
            <Icon type="FontAwesome5" name="plus" />
          </Fab>
        </Container>
      );
    }
  }
}
