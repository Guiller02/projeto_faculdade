import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

import SignIn from './pages/Sign/signIn/index';

import SignUp from './pages/Sign/signUp/index';

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
