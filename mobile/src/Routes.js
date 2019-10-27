import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';

import Login from './pages/signIn/index';

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: Login,
  },
});

export default createAppContainer(AppNavigator);