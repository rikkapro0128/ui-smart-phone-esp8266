import { memo } from 'react'
import { Text, Image, View } from 'react-native'
import { palate } from '~/theme/palate.js'

function Panel({ navigation }) {
  return (
    <View
      style={{
        paddingHorizontal: 40,
      }}
    >
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
    </View>
  )
}

export default memo(Panel)
