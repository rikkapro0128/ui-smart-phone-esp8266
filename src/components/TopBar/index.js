import { memo } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { IconBack } from '~/Icons';
import { useNavigation } from '@react-navigation/native';

function TabBar({ sizeIcon = 28, onPress = null, title = '' }) {
  const navigation = useNavigation();

  function defaultOnPress() {
    if(navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      paddingVertical: 20,
      position: 'relative',
    }}>
      <View style={{
        position: 'absolute',
        marginLeft: 20,
        padding: 10,
        zIndex: 999,
      }}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress || defaultOnPress}>
          <IconBack fill={'#000'} width={sizeIcon} height={sizeIcon} />
        </TouchableOpacity>
      </View>
      <Text style={{
        textAlign: 'center',
        flex: 1,
        fontSize: 22,
      }}>{ title }</Text>
    </View>
  )
}

export default memo(TabBar);
