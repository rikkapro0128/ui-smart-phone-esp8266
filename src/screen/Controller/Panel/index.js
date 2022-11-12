import { memo, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { palate } from '~/theme/palate.js';
import NotFound from '~/components/NotFound/default.js';
import TabBar from '~/components/TabBar';
import { Drone, PointMap, SettingLighter, DatabaseLighter, Chart } from '~/Icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CreateNode, ConnectNode } from '~/tabs';
import { useSelector } from 'react-redux';
import { UserLine } from '~/Icons';

const Tab = createMaterialTopTabNavigator();

const iconPropCommon = {
  width: 26,
  height: 26,
  fill: palate.light.textSecondary,
};

const menu = [
  {
    field: 'Nodes',
    name: 'Nodes',
    icon: <Drone {...iconPropCommon} />,
    btnTitle: 'Đăng ký Node mới',
    component: CreateNode,
  },
  {
    field: 'Areas',
    name: 'Khu vực',
    icon: <PointMap {...iconPropCommon} />,
    btnTitle: 'Đăng ký khu vực mới',
  },
  {
    field: 'Connects',
    name: 'Liên kết',
    icon: <DatabaseLighter {...iconPropCommon} />,
    btnTitle: 'liên kết WIFI cho thiết bị',
    component: ConnectNode,
  },
  // {
  //   field: 'Setting',
  //   name: 'Setting',
  //   icon: <SettingLighter {...iconPropCommon} />,
  // },
  {
    field: 'Charts',
    name: 'Biểu đồ',
    icon: <Chart {...iconPropCommon} />,
  },
];

function Panel({ navigation }) {
  const user = useSelector((state) => state.sign.user);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      {/* Header Panel */}
      <View
        style={{
          backgroundColor: palate.light.main,
          marginLeft: -40,
          marginRight: -40,
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 20,
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 20,
                color: palate.light.textSecondary,
              }}
            >
              Chào bạn
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: palate.light.textSecondary,
              }}
            >
              Một ngày tốt lành nhé
            </Text>
          </View>
          <View
            style={{
              elevation: user.photoURL ? 5 : null,
              width: 50,
              height: 50,
              borderRadius: 50,
              borderColor: palate.light.textSecondary,
              borderWidth: 2,
            }}
            onTouchStart={() => {
              navigation.navigate('Profile');
            }}
          >
            {
              user.photoURL
                ?
                <Image
                  source={{
                    uri: user.photoURL,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 50,
                  }}
                />
                :
                <View style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <UserLine width={32} height={32} fill={palate.light.textSecondary} />
                </View>
            }
          </View>
        </View>
      </View>
      {/* Tabar switch Panel */}
      <Tab.Navigator tabBar={() => null} initialRouteName="Nodes">
        {menu.map((tab) => (
          <Tab.Screen key={tab.field} name={tab.field} initialParams={{ title: tab.name, field: tab.field, btnTitle: tab?.btnTitle || null }} component={tab?.component || NotFound} />
        ))}
      </Tab.Navigator>
      <TabBar height={8} menu={menu} />
    </View>
  );
}

export default memo(Panel);
