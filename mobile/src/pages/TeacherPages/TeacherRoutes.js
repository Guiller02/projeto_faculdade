import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

import {Text, Image, View} from 'react-native';

import React from 'react';

import {Icon} from 'native-base';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import AllDisciplines from './Grade/AllDisciplines/index';

import Profile from '../UserPages/Profile/index';

import Class from './Grade/Class/index';

const GradeScreen = createStackNavigator(
  {
    Notas: {
      screen: AllDisciplines,
      navigationOptions: {
        header: null,
      },
    },
    Class: {
      screen: Class,
    },
  },
  {
    defaultNavigationOptions: {
      headerLayoutPreset: 'center',
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'OpenSans',
      },

      headerStyle: {
        backgroundColor: '#7B68EE',
        textAlign: 'center',
      },

      headerTintColor: '#fff',
    },
    headerLayoutPreset: 'center',
  },
);

const ProfileScreen = createStackNavigator({
  Perfil: {
    screen: Profile,
  },
});

const Teacher = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Notas: {
        screen: GradeScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../../images/grade.png')}
                  style={{width: 25, height: 25, color: '#fff'}}
                  tintColor="white"
                />
              </View>
            );
          },
        },
      },
      Perfil: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <View style={{justifyContent: 'center'}}>
                <Icon
                  type="MaterialIcons"
                  name="person"
                  size={25}
                  style={{color: '#fff'}}
                />
              </View>
            );
          },
        },
      },
    },
    {
      initialRouteName: 'Notas',
      activeColor: '#fff',
      inactiveColor: '#D3D3D3',
      barStyle: {
        backgroundColor: '#7B68EE',
      },
    },
  ),
);

export default Teacher;
