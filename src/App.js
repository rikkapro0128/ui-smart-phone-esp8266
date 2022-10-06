/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '~/store/signSlice';
import { useState, useEffect } from 'react';
import { Auth } from '~/auth/index.js';
import LoadingPage from '~/components/LoadingPage';

import { LandingPage, SignAuth, Controller } from '~/screen';

const Stack = createNativeStackNavigator();

const publicScreen = [
  {
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    name: 'Sign',
    component: SignAuth,
  },
];

const privateScreen = [
  {
    name: 'Controller',
    component: Controller,
  },
];

export default function App() {
  const dispatch = useDispatch();
  const checkUser = useSelector((state) => state.sign.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        dispatch(setUser(user.toJSON()));
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {loading ? (
          <LoadingPage title={'Kiểm tra dăng nhập'} />
        ) : checkUser ? (
          /* Navigation By Private */
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Panel">
            {privateScreen.map((screen) => (
              <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
            ))}
          </Stack.Navigator>
        ) : (
          /* Navigation By Public */
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LandingPage">
            {publicScreen.map((screen) => (
              <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
            ))}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
