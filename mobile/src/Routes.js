import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import SignIn from './pages/signIn/index';

import SignUp from './pages/signUp/index';

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
  createSwitchNavigator(
    {
      Sign,
    },
    {
      initialRouteName: 'Sign',
    },
  ),
);

export default Routes;
