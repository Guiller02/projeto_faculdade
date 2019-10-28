import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import SignIn from './pages/Sign/signIn/index';

import SignUp from './pages/Sign/signUp/index';

import Forum from './pages/App/Forum/index';

import Notas from './pages/App/Grade/index';

import Perfil from './pages/App/Profile/index';

import React from 'react';

import {Icon} from 'react-native';

const Sign = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Registrar',
    },
  },
});

const App = createMaterialBottomTabNavigator(
  {
    Forum: {
      screen: Forum,
    },
    Notas,
    Perfil,
  },
  {
    initialRouteName: 'Forum',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
  },
);

const Routes = createAppContainer(
  createSwitchNavigator({
    Sign,
    App,
  }),
);

export default Routes;
