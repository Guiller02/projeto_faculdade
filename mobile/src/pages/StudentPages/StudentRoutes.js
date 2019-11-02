import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import {Text, Image, View} from 'react-native';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import React from 'react';

import {Icon} from 'native-base';

import Forum from './Forum/index';

import Grade from './Grade/index';

import Profile from '../UserPages/Profile/index';

const forumScreen = createStackNavigator({
  Forum: {
    screen: Forum,
    navigationOptions: {
      header: null,
    },
  },
});

const GradeScreen = createStackNavigator({
  Notas: {
    screen: Grade,
    navigationOptions: {
      header: null,
    },
  },
});

const ProfileScreen = createStackNavigator({
  Perfil: {
    screen: Profile,
  },
});

const Student = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Forum: {
        screen: forumScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <View style={{justifyContent: 'center'}}>
                <Icon
                  type="MaterialIcons"
                  name="question-answer"
                  style={{color: '#fff'}}
                  size={25}
                />
              </View>
            );
          },
        },
      },
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
      initialRouteName: 'Forum',
      activeColor: '#fff',
      inactiveColor: '#D3D3D3',
      barStyle: {
        backgroundColor: '#7B68EE',
      },
    },
  ),
);

export default Student;
