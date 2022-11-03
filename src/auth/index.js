import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

import { configAuth, configStorageDB } from '~/auth/firebaseConfig.js';

export const AppUserAuth = initializeApp(configAuth, 'user-auth');
export const AppStorage = initializeApp(configStorageDB, 'storage-db');

export const Auth = initializeAuth(AppUserAuth, {
  persistence: getReactNativePersistence(AsyncStorage),
});
