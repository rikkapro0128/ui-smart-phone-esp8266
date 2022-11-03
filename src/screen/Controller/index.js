import { memo } from 'react';
import { StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Panel from '~/screen/Controller/Panel';
import Profile from '~/screen/Controller/Profile';
import Device from '~/screen/Controller/Device';
import { palate } from '~/theme/palate.js';

const Stack = createNativeStackNavigator();

const tabs = [
  {
    name: 'Panel',
    component: Panel,
  },
  {
    name: 'Profile',
    component: Profile,
  },
  {
    name: 'Device',
    component: Device,
  },
];

function Controller() {
  return (
    <View style={{
      flex: 1,
    }}>
      <StatusBar
        animated={true}
        backgroundColor={palate.light.main}
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Panel'}>
        {tabs.map((tab) => (
          <Stack.Screen key={tab.name} name={tab.name} component={tab.component} />
        ))}
      </Stack.Navigator>
    </View>
  );
}

export default memo(Controller);
