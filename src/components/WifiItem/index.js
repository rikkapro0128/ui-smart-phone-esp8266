import { memo } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { IconWifi, IconArrowRight } from '~/Icons';

function WifiItem({ onPress, iconWifi = null, iconNavigate, name = 'wifi name', quality = 0, sizeIconWifi = 24, sizeIconNavigate = 32 }) {

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        marginVertical: 8,
      }}
      onPress={onPress}
    >
      <View style={{
        backgroundColor: '#72DA6B',
        alignItems: 'center',
        justifyContent: 'center',
        width: '22%',
        // marginLeft: 6,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        // transform: [
        //   {
        //     scale: 1.15,
        //   }
        // ],
        position: 'relative',
        zIndex: 1,
      }}>
        {
          iconWifi
          ? 
          <iconWifi width={sizeIconWifi} height={sizeIconWifi} />
          :
          <IconWifi style={{
            // margin: 20,
          }} fill={'white'} width={sizeIconWifi} height={sizeIconWifi} />
        }
      </View>
      <View style={{
        padding: 14,
        backgroundColor: 'white',
        flex: 1,
        paddingLeft: 20,
        flexDirection: 'row',
        borderRadius: 6,
      }}>
        <View  style={{
          flexDirection: 'row',
        }}>
          <View>
            <Text style={{
              fontSize: 18,
              color: '#3E4556',
            }}>{ name }</Text>
            <Text style={{
              textAlign: 'left',
              fontSize: 22,
              color: 'black',
              marginTop: 2,
              marginLeft: 10,
            }}>{ Math.min(Math.max(2 * (quality + 100), 0), 100) }%</Text>
          </View>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: 15,
        }}>
          {
            iconNavigate
            ?
            <iconNavigate width={sizeIconNavigate} height={sizeIconNavigate} />
            :
            <IconArrowRight fill={'#3E4556'} width={sizeIconNavigate} height={sizeIconNavigate} />
          }
        </View>
      </View>
    </TouchableOpacity>
  );

}

export default memo(WifiItem);
