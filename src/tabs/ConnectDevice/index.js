import { memo, useEffect, useState } from "react";
import { View, TextInput, Text, Dimensions, PermissionsAndroid, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import WifiManager from "react-native-wifi-reborn";
import { Card, Modal } from '@ui-kitten/components';
import Button from '~/components/Button';
import { IconScanWifi, IconModule, IconWifi, IconArrowRight, IconForm } from '~/Icons';

const width = Dimensions.get('screen').width;

function ConnectDevice() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [select, setSelect] = useState({});
  const [listWIFI, setListWIFI] = useState([]);

  useEffect(() => {
    async function getPermission() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // You can now use react-native-wifi-reborn
        const lsWIFI = await WifiManager.reScanAndLoadWifiList();
        console.log(lsWIFI);
        setListWIFI(lsWIFI);
        setLoading(false);
      } else {
        // Permission denied
        console.log('Permission denied');
      }
    }
    getPermission();
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(idInterval.current);
  //   }, 3000);
  // }, [idInterval.current]);

  return (
    <View style={{
      flex: 1,
    }}>
      {
        loading
        ? 
        (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
            <IconScanWifi width={200} height={200} />
            <Text>Đang quét mạng xung quanh...</Text>
          </View>
        )
        :
        (
          <View style={{
            backgroundColor: 'white',
            flex: 1,
            marginVertical: 20,
            borderRadius: 6,
            padding: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
              <IconModule width={32} height={32} />
              <Text style={{
                fontSize: 19,
                marginLeft: 10,
                fontWeight: 'bold',
                color: '#505869',
              }}>Danh sách thiết bị</Text>
            </View>

            <ScrollView style={{ 
              paddingVertical: 10,
            }}>
              {
                listWIFI.map(wifi => (
                  <TouchableOpacity style={{
                      backgroundColor: '#EFF4FB',
                      borderRadius: 6,
                      flexDirection: 'row',
                      padding: 20,
                      marginBottom: 10,
                      alignItems: 'center',
                    }}
                    activeOpacity={0.7}
                    key={wifi.timestamp + wifi.BSSID}
                    onPress={() => {
                      setVisible(true);
                      setSelect(wifi);
                    }}
                  >
                    <View style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                      <IconWifi fill={'#505869'} width={24} height={24} />
                      <Text style={{
                        fontWeight: 'bold',
                        color: '#505869',
                        marginLeft: 10
                      }}>{ wifi.SSID }</Text>
                    </View>
                    <Text style={{
                      fontWeight: 'bold',
                      color: '#505869',
                    }}>{ Math.min(Math.max(2 * (wifi.level + 100), 0), 100) }%</Text>
                    <IconArrowRight style={{
                      marginLeft: 40,
                    }} fill={'#505869'} width={24} height={24} />
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
            <Modal
              visible={visible}
              backdropStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
              onBackdropPress={() => setVisible(false)}>
              <Card
                disabled={true}
                style={{
                  borderRadius: 10,
                  borderColor: 'transparent',
                  width: width - 60,
                }}
              >
                <IconForm fill={'#505869'} width={50} height={50} />
                <Text style={{
                  marginVertical: 10,
                  color: '#505869',
                  fontSize: 19,
                  fontWeight: 'bold'
                }}>Mật khẩu ESP - { select?.SSID }</Text>
                <TextInput 
                  style={{
                    backgroundColor: '#EFF4FB',
                    marginTop: 6,
                    marginBottom: 20,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                  }} 
                  placeholder={'Mật khẩu sẽ bị ẩn'}
                />
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <Button 
                    activeOpacity={0.8}
                    styleParent={{
                      backgroundColor: '#EFF4FB',
                      marginRight: 10,
                      ...styles.btn,
                    }}
                    styleContent={{
                      color: '#B2BDC9',
                      ...styles.btnContent,
                    }}
                    onPress={() => setVisible(false)}
                    content={'Huỷ'}
                  />
                  <Button 
                    activeOpacity={0.8}
                    styleParent={{
                      backgroundColor: '#7752dd',
                      marginLeft: 10,
                      ...styles.btn,
                    }}
                    styleContent={{
                      color: 'white',
                      ...styles.btnContent,
                    }}
                    onPress={() => setVisible(false)}
                    content={'Huỷ'}
                  />
                </View>
              </Card>
            </Modal>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 10,
  },
  btnContent: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default memo(ConnectDevice);
