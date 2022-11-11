/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '~/store/signSlice';
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import LoadingPage from '~/components/LoadingPage';
// import { v1 as uuidv1 } from 'uuid';

import { LandingPage, SignAuth, Controller } from '~/screen';
import { Auth, AppStorage } from '~/auth/index.js';

const Stack = createNativeStackNavigator();
const db = getDatabase(AppStorage);

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
    const unsubscribe = Auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user.toJSON()));
        setLoading(false);
        let uid = `user-${user.uid}`;
        const snapshot = await get(child(ref(db), uid));
        if(snapshot.exists()) {
          console.log(snapshot.val());
        }else {
          set(ref(db, `${uid}/`), {
            id: user.uid,
          });
        }
      }else {
        setLoading(false);
      }
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
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Controller">
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
