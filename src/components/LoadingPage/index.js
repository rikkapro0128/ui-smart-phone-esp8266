import { Text, View, ActivityIndicator } from 'react-native';
import { memo } from 'react';
import { palate } from '~/theme/palate.js';

function LoadingPage({ title = 'Loading...' }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#cccccc6b',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={'large'} color={palate.light.main} />
      <Text
        style={{
          fontSize: 18,
          color: palate.light.text,
          marginTop: 10,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default memo(LoadingPage);
