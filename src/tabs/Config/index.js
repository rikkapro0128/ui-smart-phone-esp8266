import { memo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { palate } from '~/theme/palate.js';
import NotFound from '~/components/NotFound/default.js';

function Devices({ navigation, route }) {
  const { title, field, btnTitle } = route.params;
  return (
    <View
      style={{
        paddingVertical: 20,
        justifyContent: 'space-between',
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: palate.light.text,
        }}
      >
        {title}.
      </Text>
      <NotFound type={field} title={title} />
      {btnTitle ? (
        <TouchableOpacity style={{ marginBottom: 20 }} activeOpacity={0.3}>
          <Text
            style={{
              color: palate.light.main,
              textAlign: 'center',
              padding: 20,
              borderRadius: 8,
              fontSize: 16,
              borderColor: palate.light.main,
              borderWidth: 2,
            }}
          >
            {btnTitle}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export default memo(Devices)
