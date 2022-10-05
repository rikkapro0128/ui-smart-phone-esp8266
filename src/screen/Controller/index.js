import { memo } from 'react';
import { StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Panel, Profile, Setting } from '~/tabs';
import { palate } from '~/theme/palate.js';
import TabBar from '~/components/TabBar';
import { Drone, PointMap, SettingLighter, DatabaseLighter, Chart } from '~/Icons';

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
];

const iconPropCommon = {
  width: 26,
  height: 26,
  fill: palate.light.textSecondary,
}

const menu = [
  {
    name: 'Thiết bị',
    icon: <Drone {...iconPropCommon} />,
  },
  {
    name: 'Khu vực',
    icon: <PointMap {...iconPropCommon} />,
  },
  {
    name: 'Database',
    icon: <DatabaseLighter {...iconPropCommon} />,
  },
  {
    name: 'Setting',
    icon: <SettingLighter {...iconPropCommon} />,
  },
  {
    name: 'Biểu đồ',
    icon: <Chart {...iconPropCommon} />,
  },
]

function Controller() {
  return (
    <View style={{
      position: 'relative',
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
      <View style={{
        padding: 20
      }}>
        <TabBar height={8} menu={menu} />
      </View>
    </View>
  );
}

export default memo(Controller);
