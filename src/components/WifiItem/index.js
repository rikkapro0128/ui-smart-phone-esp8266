import { memo } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { IconWifi, IconArrowRight } from '~/Icons';
import { MD2Colors } from 'react-native-paper';

function WifiItem({ onPress, Icon = null, IconNavigate, name = 'wifi name', quality = 0, sizeIcon = 24, sizeIconNavigate = 32 }) {

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        marginVertical: 10,
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
        // position: 'relative',
        // zIndex: 1,
        // shadowColor: "#72da6b",
        // shadowOffset: {
        //   width: 0,
        //   height: 12,
        // },
        // shadowOpacity:  0.64,
        // shadowRadius: 13.84,
        // elevation: 17,
      }}>
        {
          Icon
          ? 
          <Icon width={sizeIcon} height={sizeIcon} />
          :
          <IconWifi style={{
            // margin: 20,
          }} fill={'white'} width={sizeIcon} height={sizeIcon} />
        }
      </View>
      <View style={{
        padding: 14,
        backgroundColor: 'white',
        flex: 1,
        paddingLeft: 20,
        flexDirection: 'row',
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
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
            IconNavigate
            ?
            <IconNavigate fill={MD2Colors.green400} width={sizeIconNavigate} height={sizeIconNavigate} />
            :
            <IconArrowRight fill={'#3E4556'} width={sizeIconNavigate} height={sizeIconNavigate} />
          }
        </View>
      </View>
    </TouchableOpacity>
  );

}

export default memo(WifiItem);
