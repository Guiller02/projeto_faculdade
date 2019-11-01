import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import {Text, View} from 'react-native';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import React from 'react';

import {Icon} from 'native-base';

import {Image} from 'react-native';

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
      forumScreen: {
        screen: forumScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <Icon
                type="MaterialIcons"
                name="question-answer"
                style={{color: '#fff'}}
                size={25}
              />
            );
          },
        },
      },
      Notas: {
        screen: GradeScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <Image
                source={require('../../images/grade.png')}
                style={{width: 25, height: 25, color: '#fff'}}
                tintColor="white"
              />
            );
          },
        },
      },
      Perfil: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return <Icon type="MaterialIcons" name="person" size={25} />;
          },
        },
      },
    },
    {
      initialRouteName: 'forumScreen',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: {backgroundColor: '#694fad'},
    },
  ),
);

export default Student;
