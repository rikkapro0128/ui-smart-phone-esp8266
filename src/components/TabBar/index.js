import { memo, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { palate } from '~/theme/palate.js';

const heightScreen = Dimensions.get('screen').height;

function TabBar({ height = 8, menu }) {
  const [heightFit, setHeightFit] = useState(() => Math.floor(heightScreen * height / 100));

  console.log(heightFit);

  return (
    <View style={{
      height: heightFit,
      borderRadius: 10,
      width: '100%',
      backgroundColor: palate.light.bgSecondary,
      paddingHorizontal: -10,
      paddingVertical: -10,
      elevation: 1,
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 10
      }}>
        {
          menu.map(item => (
            <View
              key={item.name}
              style={{
                flex: 1,
                margin: -5,
                backgroundColor: palate.light.main,
                borderRadius: 8,
              }}
            >
              <TouchableOpacity activeOpacity={0.5}>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}>{ item.icon }</View>
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default memo(TabBar);
