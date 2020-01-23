import Reactotron, {trackGlobalErrors} from 'reactotron-react-native';

import AsyncStorage from '@react-native-community/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative()
  .use(trackGlobalErrors()) // add all built-in react native plugins
  .connect(); // let's connect!
