import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Header from '../Layouts/Header';

import Loading from '../../../helpers/loading';

import api from '../../../services/api';

import reactotron from 'reactotron-react-native';

export default class index extends Component {
  state = {
    loading: true,
  };
  forum = async () => {
    await api.get('/student/forum');
    reactotron.log(api);
    this.state.loading === false;
  };

  componentDidMount() {
    this.forum();
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />;
    } else {
      return <Text>Forum</Text>;
    }
  }
}
