import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import SignIn from './pages/UserPages/Sign/signIn/index';

import SignUp from './pages/UserPages/Sign/signUp/index';

import Student from './pages/StudentPages/StudentRoutes';

import Teacher from './pages/TeacherPages/TeacherRoutes';

import './config/StatusBarConfig';

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

const Routes = createAppContainer(
  createSwitchNavigator({
    Sign,
    Student,
    Teacher,
  }),
);

export default Routes;
