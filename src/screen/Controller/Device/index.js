import { memo, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Divider from '~/components/Divider';
import TopBar from '~/components/TopBar';
import { Input, Button } from '@ui-kitten/components';
import { IconConfig } from '~/Icons';

const styles = StyleSheet.create({
  inputIp: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    fontSize: 16,
    flex: 1,
    marginHorizontal: 5,
    textAlign: 'center'
  },
  info: {
    fontSize: 18,
  }
})

function Device({ route }) {
  const { path, id, name, ip, doneConfig } = route.params;
  const [valIP, setValIP] = useState();

  useEffect(() => {

  }, []);

  return (
    <>
      <View style={{
        width: '100%',
      }}>
      <TopBar title={'Cấu hình thiết bị'} />
      <Divider
        thickness={2}
        marginVertical={0}
      />
      </View>
      <View style={{
        margin: 20,
        flex: 1,
      }}>
        {
          doneConfig
          ?
          <View>
            <Text>Phát hiện đã cấu hình</Text>
          </View>
          :
          <View style={{
            // justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
            {/* <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                {
                  scale: 0.3
                }
              ],
              width: '100%',
              height: 220
            }}>
              <IconConfig />
            </View> */}
            <View style={{
              backgroundColor: 'white',
              borderRadius: 6,
              width: '100%',
              padding: 20,
              marginBottom: 20
            }}>
              <Text style={styles.info}>ID - { id }</Text>
              <Text style={styles.info}>Tên - { name }</Text>
            </View>
            <Text style={{
              backgroundColor: '#FEF3C7',
              padding: 20,
              fontSize: 18,
              fontStyle: 'italic',
              width: '100%',
              borderRadius: 6,
            }}>"Mời bạn kết nối thiết bị để hoàn tất quá trình cấu hình thiết bị. Lưu ý rằng&#160;
              <Text style={{
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>ứng dụng</Text>
              &#160;và&#160;
              <Text style={{
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>thiết bị</Text>
              &#160;của bạn phải cùng một mạng WIFI."
            </Text>
            <View style={{
              width: '100%'
            }}>
              <Text style={{
                textAlign: 'left',
                marginVertical: 10,
                fontSize: 18,
                fontWeight: 'bold'
              }}>Địa chỉ IP của thiết bị</Text>
              <View style={{
                flexDirection: 'row',
                marginHorizontal: -5,
              }}>
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx' />
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx' />
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx' />
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx' />
              </View>
              <Button size='giant' style={{
                marginTop: 15,
              }} appearance='outline'>
                TIẾN HÀNH KẾT NỐI
              </Button>
            </View>
          </View>
        }
      </View>

    </>
  )
}

export default memo(Device)
