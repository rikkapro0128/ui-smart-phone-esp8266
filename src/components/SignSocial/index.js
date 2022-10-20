import { View, Text, TouchableOpacity } from 'react-native';
import { memo } from 'react';
import { Google } from '~/Icons';

function SignSocial({
  socialName = 'google',
  bg = '#3283FC',
  children,
  paddingIcon = 10,
  color = '#fff',
  stateSign = 'signIn',
  marginBottom = 20,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={(event) => {
        onPress ? onPress(socialName, event) : null;
      }}
      activeOpacity={0.8}
    >
      <View
        style={{
          padding: 1,
          backgroundColor: bg,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 2,
          elevation: 2,
          marginBottom,
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 2,
            padding: paddingIcon,
          }}
        >
          {children || <Google width={32} height={32} />}
        </View>
        <Text
          style={{
            textAlign: 'center',
            flex: 1,
            color,
            fontSize: paddingIcon * 1.9,
            textTransform: 'capitalize',
          }}
        >
          {`sign ${stateSign === 'signIn' ? 'in' : 'up'} with ${socialName}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(SignSocial);
