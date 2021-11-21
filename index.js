/**
 * @format
 */
import 'react-native-gesture-handler';
import App from '@app';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { enableFreeze } from 'react-native-screens';
enableFreeze(true);

AppRegistry.registerComponent(appName, () => App);
