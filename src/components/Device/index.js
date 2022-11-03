import { memo } from "react";
import { View, Text } from 'react-native';

function Device({ payload }) {
  <View style={{
    backgroundColor: 'red'
  }}>
    <Text style={{
      color: '#000'
    }}>{ payload.name }</Text>
  </View>
}

export default memo(Device);
