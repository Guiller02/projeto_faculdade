if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

import React from 'react';
import {View, Text} from 'react-native';

import './config/StatusBarConfig';

import Routes from './Routes';
const App = () => {
  return <Routes></Routes>;
};

export default App;
