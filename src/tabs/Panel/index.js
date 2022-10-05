import { memo } from 'react'
import { View, Text, Image } from 'react-native'
import { palate } from '~/theme/palate.js'
import TabBar from '~/components/TabBar'
import { Drone, PointMap, SettingLighter, DatabaseLighter, Chart } from '~/Icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Config from '~/tabs/Panel/Config/index.js'

const Tab = createMaterialTopTabNavigator();

const iconPropCommon = {
  width: 26,
  height: 26,
  fill: palate.light.textSecondary,
}

const menu = [
  {
    field: 'Devices',
    name: 'Thiết bị',
    icon: <Drone {...iconPropCommon} />,
    btnTitle: 'Đăng ký thiết bị mới',
  },
  {
    field: 'Areas',
    name: 'Khu vực',
    icon: <PointMap {...iconPropCommon} />,
    btnTitle: 'Đăng ký khu vực mới',
  },
  {
    field: 'Server',
    name: 'Server',
    icon: <DatabaseLighter {...iconPropCommon} />,
    btnTitle: 'Đăng ký Server API',
  },
  {
    field: 'Setting',
    name: 'Setting',
    icon: <SettingLighter {...iconPropCommon} />,
  },
  {
    field: 'Charts',
    name: 'Biểu đồ',
    icon: <Chart {...iconPropCommon} />,
  },
]

function Panel({ navigation }) {
  return (
    <View
      style={{
        paddingHorizontal: 40,
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
              elevation: 5,
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            onTouchStart={() => {
              navigation.navigate('Profile')
            }}
          >
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/7c/67/d2/7c67d210a731c81342f00ba1e3186a03.jpg',
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
              }}
            />
          </View>
        </View>
      </View>
      {/* Tabar switch Panel */}
      <Tab.Navigator tabBar={() => null} initialRouteName="Devices">
        {menu.map((tab) => (
          <Tab.Screen key={tab.field} name={tab.field} initialParams={{ title: tab.name, field: tab.field, btnTitle: tab?.btnTitle || null }} component={Config} />
        ))}
      </Tab.Navigator>
      <TabBar height={8} menu={menu} />
    </View>
  )
}

export default memo(Panel)
