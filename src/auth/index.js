import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

import { config } from '~/auth/firebaseConfig.js';

const App = initializeApp(config);

export const Auth = initializeAuth(App, {
  persistence: getReactNativePersistence(AsyncStorage),
});
