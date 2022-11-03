import { memo, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { palate } from '~/theme/palate.js';
import { useNavigation } from '@react-navigation/native';

const heightScreen = Dimensions.get('screen').height;

function TabBar({ height = 8, menu }) {
  const navigation = useNavigation();
  const [heightFit, setHeightFit] = useState(() => Math.floor((heightScreen * height) / 100));

  // console.log(heightScreen)

  return (
    <View
      style={{
        height: heightFit,
        borderRadius: 10,
        backgroundColor: palate.light.bgSecondary,
        // marginHorizontal: -20,
        marginBottom: 20,
        elevation: 1,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        {menu.map((item) => (
          <View
            key={item.name}
            style={{
              flex: 1,
              margin: -5,
              backgroundColor: palate.light.main,
              borderRadius: 8,
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate(item.field); }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  paddingBottom: 5,
                  paddingTop: 8,
                }}
              >
                {item.icon}
                <Text
                  style={{
                    color: palate.light.textSecondary,
                    paddingTop: 5,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default memo(TabBar);
