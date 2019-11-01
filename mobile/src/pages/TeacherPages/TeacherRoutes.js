import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Grade from './Grade/index';

import Profile from '../UserPages/Profile/index';

const Teacher = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Notas: {
        screen: Grade,
      },
      Perfil: {
        screen: Profile,
      },
    },
    {
      initialRouteName: 'Notas',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: {backgroundColor: '#694fad'},
    },
  ),
);

export default Teacher;
