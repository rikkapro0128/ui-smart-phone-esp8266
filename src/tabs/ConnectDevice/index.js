import { memo, useEffect, useState, useCallback, useRef } from "react";
import { View, TextInput, Text, Dimensions, PermissionsAndroid, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import WifiManager from "react-native-wifi-reborn";
import { Card, Modal, Spinner  } from '@ui-kitten/components';
import Button from '~/components/Button';
import WifiItem from '~/components/WifiItem';
import { IconScanWifi, IconModule, IconWifi, IconArrowRight, IconForm } from '~/Icons';

const width = Dimensions.get('screen').width;
const maxSSID = 25;
const maxPoolingWIFI = 15;
const scanRefreshNode = 2 * 1000;
const scanRefreshWifi = 10 * 1000;
let idScanInterval = null;
const endPoint = 'http://192.168.4.1/scan-network';

function ConnectDevice() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState(null);
  const [listNode, setListNode] = useState([]);
  const [listWifi, setListWifi] = useState([]);
  const [password, setPassword] = useState('');
  const [permit, setPermit] = useState(false);
  const [stateScanNode, setStateScanNode] = useState(false);
  const [stateScanWifi, setStateScanWifi] = useState(false);
  const [loadingSSID, setLoadingSSID] = useState(false);
  const [loadingWifi, setLoadingWifi] = useState(true);
  const viewTwo = useRef(null);

  const translateView = useRef(new Animated.ValueXY({
    x: 0, // translate-x
    y: 1, // opacity
  })).current;

  const poolingCheckConnectWIFI = useCallback((SSID = undefined, timing = 1000) => {
    let countPooling = 0;
    let idInterval = null;
    return new Promise((res, rej) => {
      idInterval = setInterval(async () => {
        const status = await WifiManager.connectionStatus();
        console.log('[Ping - Status]: ' + SSID + '-' + status);
        if(typeof status === 'boolean' && status) {
          const getSSIDCurrent = await WifiManager.getCurrentWifiSSID();
          console.log(getSSIDCurrent);
          if(getSSIDCurrent === SSID) {
            res(true);
            clearInterval(idInterval);
          }else {
            res('Wifi connect failure');
            clearInterval(idInterval);
          }
        }else if (countPooling >= maxPoolingWIFI) {
          clearInterval(idInterval);
          rej('Wifi connect timeout');
        }
        countPooling++;
      }, timing);
    });
  }, []);

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
        setPermit(true);
        setStateScanNode(true);
      } else {
        // Permission denied
        setPermit(false);
        setStateScanNode(false);
      }
    }
    getPermission();
  }, []);

  useEffect(() => {
    if(stateScanNode) {
      idScanInterval = setInterval(async () => {
        try {
          const checkWifiIsEnabled = await WifiManager.isEnabled();
          if(!checkWifiIsEnabled) {
            WifiManager.setEnabled(true);
          }else {
            const lsWIFI = await WifiManager.reScanAndLoadWifiList();
            // setListNode(() => flatNetwork(lsWIFI));
            setListNode(() => lsWIFI);
            if(loading) {
              setLoading(false);
            }
          }
        } catch (error) {
          console.log('[Error]: ' + error.message);
        }
      }, scanRefreshNode);
    }else if(stateScanWifi) {
      idScanInterval = setInterval(async () => {
        try {
          const res = await fetch(endPoint, { method: 'GET' });
          const payload = await res.json();
          setListWifi(payload.networks);
          setLoadingWifi(() => false);
        } catch (error) {
          console.log('[Error]: ' + error.message);
        }
      }, scanRefreshWifi);
    }
    return () => {
      if(idScanInterval !== null) {
        clearInterval(idScanInterval);
      }
    }
  }, [permit, stateScanNode, stateScanWifi]);

  function flatNetwork(networks) {
    return networks.filter(network => network.SSID.includes('esp-'));
  }

  async function splitView(wifi) {
    const currentSSID = await WifiManager.getCurrentWifiSSID();
    if(currentSSID === wifi.SSID) {
      // split view config wifi for node
      Animated.timing(translateView, {
        toValue: {
          x: -12,
          y: 0,
        },
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setStateScanNode(false);
        setStateScanWifi(true);
        Animated.timing(translateView, {
          toValue: {
            x: 0,
            y: 1,
          },
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }else {
      setVisible(true);
      setSelect(() => wifi);
    }
  }

  async function handleConnectToSSID() {
    try {
      if(select !== null && password) {
        setLoadingSSID(true);
        const checkWifiIsEnabled = await WifiManager.isEnabled();
        if(!checkWifiIsEnabled) {
          WifiManager.setEnabled(true);
        }
        console.log('Da bat WIFI');
        if(Object.keys(select).length > 0) {
          // WifiManager.
          await WifiManager.connectToProtectedSSID(select.SSID, password, true);
          await poolingCheckConnectWIFI(select.SSID);
          setLoadingSSID(false);
        }
      }
      setVisible(false);
    } catch (error) {
      console.log('[Error]: ' + error.message);
      setLoadingSSID(false);
      setVisible(false);
      if(error.message === 'Could not add or update network configuration with SSID ' + select.SSID) {
        await WifiManager.connectToSSID(select.SSID);
      }
    }
  }

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
            // backgroundColor: 'white',
            borderRadius: 6,
            marginTop: 10,
            marginBottom: 10,
            flex: 1,
          }}>
            <Animated.View style={{
              transform: [
                {
                  translateX: translateView.x,
                },
              ],
              opacity: translateView.y,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
                {/* <IconModule width={32} height={32} /> */}
                <Text style={{
                  fontSize: 25,
                  // marginLeft: 10,
                  fontWeight: 'bold',
                  color: '#505869',
                }}>{ stateScanNode ? 'Truy cập NODE' : 'Cấu hình WIFI NODE' }</Text>
              </View>
              <View style={{
                paddingVertical: 10,
              }}>
                <ScrollView style={{ 
                  marginVertical: -8,
                }}>
                  {
                    stateScanNode
                    ?
                    listNode.map((wifi, index) => (
                      <WifiItem onPress={() => splitView(wifi)} key={wifi.timestamp + wifi.BSSID} name={wifi.SSID.length > maxSSID ? `${wifi.SSID.splice(0, maxSSID - 1)}...` : wifi.SSID} quality={wifi.level} />
                    ))
                    :
                    listWifi.map((wifi, index) => (
                      <WifiItem key={wifi.name + index} name={wifi.name.length > maxSSID ? `${wifi.name.splice(0, maxSSID - 1)}...` : wifi.name} quality={wifi.quality} />
                    ))
                  }
                </ScrollView>
              </View>
            </Animated.View>
          </View>
        )
      }
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
            textContentType={'password'}
            secureTextEntry={true}
            value={ password ? password : null }
            onChangeText={val => setPassword(val) }
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
              onPress={handleConnectToSSID}
              content={'Kết nối'}
            >
              {
                loadingSSID 
                ?
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Spinner status='basic' size='tiny'/>
                  <Text style={{
                    color: 'white',
                    paddingLeft: 10,
                    ...styles.btnContent
                  }}>Đang kết nối</Text>
                </View>
                :
                <Text style={{
                  color: 'white',
                  ...styles.btnContent,
                }}>Kết nối</Text>
              }
            </Button>
          </View>
        </Card>
      </Modal>
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
