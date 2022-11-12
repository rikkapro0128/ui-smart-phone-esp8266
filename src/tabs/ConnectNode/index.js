import { memo, useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Dimensions,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Dialog, Portal, ActivityIndicator, MD2Colors, Text, Button, Divider, Avatar, IconButton, Title, Paragraph, TextInput, Card } from 'react-native-paper';
import WifiManager from 'react-native-wifi-reborn';
import WifiItem from '~/components/WifiItem';
import { IconScanWifi, IconModule, IconWifi, IconCheck, IconQuestion } from '~/Icons';

const width = Dimensions.get('screen').width;
const maxSSID = 25;
const maxPoolingWIFI = 30;
const scanRefreshNode = 2 * 1000;
const scanRefreshWifi = 10 * 1000;
let idScanInterval = null;
const dns = '192.168.4.1';
const fullDomain = `http://${dns}`;

function ConnectNode() {
  const [loading, setLoading] = useState(true);
  const [secure, setSecure] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleWifi, setVisibleWifi] = useState(false);
  const [select, setSelect] = useState(null);
  const [listNode, setListNode] = useState([]);
  const [listWifi, setListWifi] = useState([]);
  const [password, setPassword] = useState('');
  const [permit, setPermit] = useState(false);
  const [stateScanNode, setStateScanNode] = useState(false);
  const [stateScanWifi, setStateScanWifi] = useState(false);
  const [stateCheckIsConfig, setStateCheckIsConfig] = useState(true);
  const [wifiHasConfig, setWifiHasConfig] = useState(null);
  const [loadingResetConfig, setLoadingResetConfig] = useState(false);
  const [loadingWifi, setLoadingWifi] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);
  const [currentSSID, setCurrentSSID] = useState(null);
  const [desc, setDesc] = useState(null);
  const viewTwo = useRef(null);

  const translateView = useRef(
    new Animated.ValueXY({
      x: 0, // translate-x
      y: 1, // opacity
    })
  ).current;

  const poolingCheckConnectWIFI = useCallback((SSID = undefined, timing = 1000) => {
    let countPooling = 0;
    let idInterval = null;
    return new Promise((res, rej) => {
      idInterval = setInterval(async () => {
        const status = await WifiManager.connectionStatus();
        console.log('[Ping - Status]: ' + SSID + '-' + status);
        if (typeof status === 'boolean' && status) {
          const getSSIDCurrent = await WifiManager.getCurrentWifiSSID();
          console.log(getSSIDCurrent);
          if (getSSIDCurrent === SSID) {
            clearInterval(idInterval);
            res(true);
          } else {
            clearInterval(idInterval);
            res('Wifi connect failure');
          }
        } else if (countPooling >= maxPoolingWIFI) {
          clearInterval(idInterval);
          rej('Wifi connect timeout');
        }
        countPooling++;
      }, timing);
    });
  }, []);

  useEffect(() => {
    async function getSSIDName() {
      return await WifiManager.getCurrentWifiSSID();
    }
    getSSIDName().then((ssid) => {
      setCurrentSSID(ssid);
    });
  }, [listNode]);

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
        }
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
    const scanNode = async () => {
      try {
        const checkWifiIsEnabled = await WifiManager.isEnabled();
        if (!checkWifiIsEnabled) {
          WifiManager.setEnabled(true);
        } else {
          let lsWIFI = lsWIFI = await WifiManager.reScanAndLoadWifiList();
          lsWIFI = flatNetwork(lsWIFI);
          setListNode(() => sortByQuality(lsWIFI));
          setListNode(() => lsWIFI);
          if (loading) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.log('[Error]: ' + error.message);
      }
    };
    const scanWifi = async () => {
      try {
        const res = await fetch(`${fullDomain}/scan-network`, { method: 'GET' });
        const payload = await res.json();
        setListWifi(() => sortByQuality(payload.networks, 'quality', 'desc'));
      } catch (error) {
        console.log('[Error]: ' + error.message);
      }
    };
    if (permit) {
      if (stateScanNode) {
        scanNode();
        idScanInterval = setInterval(scanNode, scanRefreshNode);
      } else if (stateScanWifi && !stateCheckIsConfig) {
        scanWifi();
        idScanInterval = setInterval(scanWifi, scanRefreshWifi);
      }
    }
    return () => {
      if (idScanInterval !== null) {
        clearInterval(idScanInterval);
      }
    };
  }, [permit, stateScanNode, stateScanWifi, stateCheckIsConfig]);

  function flatNetwork(networks) {
    return networks.filter((network) => network.SSID.includes('esp-'));
  }

  function sortByQuality(payload, field = 'SSID', sort = 'asc') {
    return payload.sort((a, b) => sort === 'asc' ? (a[field] - b[field]) : (b[field] - a[field]));
  }

  function runSideView(translate, opacity) {
    return new Promise((res) => {
      Animated.timing(translateView, {
        toValue: {
          x: translate,
          y: opacity,
        },
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        res(true);
      });
    });
  }

  function checkNodeIsConfig() {
    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(`${fullDomain}/is-config`, { method: 'GET' });
        const payload = await response.json();
        if (payload?.message === 'WIFI HAS BEEN CONFIG') {
          setWifiHasConfig(payload);
          res(payload?.message);
        } else if (payload?.message === 'WIFI NOT YET CONFIG') {
          setWifiHasConfig(null);
          rej(new Error(payload?.message));
        }
      } catch (error) {
        rej(error);
        if (wifiHasConfig !== null) {
          setWifiHasConfig(null);
        }
      }
    });
  }

  async function splitView(wifi) {
    const currentSSID = await WifiManager.getCurrentWifiSSID();
    if (currentSSID === wifi.SSID) {
      // split view config wifi for node


      // loading check config wifi: (stateCheckIsConfig === true | wifiHasConfig == null)
      // loading data wifi scan: (stateCheckIsConfig === false | listWifi.length === 0)
      // load wifi scan: (stateCheckIsConfig === false | listWifi.length > 0)
      // load wifi config: (stateCheckIsConfig === true | wifiHasConfig !== null)
      await runSideView(-12, 0);
      setStateScanNode(false); // turn off scan wifi node
      // init loadding config wifi
      setStateCheckIsConfig(true);
      setWifiHasConfig(null);
      await runSideView(0, 1);
      checkNodeIsConfig().then(async () => {
        console.log('Node is has been config => ');
        // load wifi config
        setStateCheckIsConfig(true);
      })
      .catch(async (err) => {
        if (err.message === 'WIFI NOT YET CONFIG') {
          // load wifi scan
          setStateCheckIsConfig(false);
          setListWifi([]);
          setStateScanWifi(true);
        }
        console.log('Node is not yet config => ' + err.message);
      });
    } else {
      setVisible(true);
      setSelect(() => wifi);
    }
  }

  async function handleConnectToSSID() {
    try {
      if (select !== null && password) {
        const checkWifiIsEnabled = await WifiManager.isEnabled();
        if (!checkWifiIsEnabled) {
          WifiManager.setEnabled(true);
        }
        console.log('Da bat WIFI');
        if (Object.keys(select).length > 0) {
          // WifiManager.
          await WifiManager.connectToProtectedSSID(select.SSID, password, true);
          await poolingCheckConnectWIFI(select.SSID);
        }
        setVisible(false);
      } else {
        setErrorPassword('Mật khẩu không được phép để trống');
      }
    } catch (error) {
      console.log('[Error]: ' + error.message);
      setVisible(false);
      if (
        error.message ===
        'Could not add or update network configuration with SSID ' + select.SSID
      ) {
        await WifiManager.connectToSSID(select.SSID);
      }
    }
    if (errorPassword !== '' && errorPassword !== null) {
      setErrorPassword(null);
    }
  }

  async function handleNodeConnectToWifi() {
    try {
      if (select?.name && password) {
        const res = await fetch(`${fullDomain}/config-wifi`, {
          method: 'POST',
          body: JSON.stringify({ ssid: select?.name, password }),
        });
        const payload = await res.json();
        if (payload?.message === 'CONFIGURATION WIFI SUCCESSFULLY') {
          setVisibleWifi(false);
          setDesc(`Bạn đã cấu \n hình WIFI "${select?.name}}" cho Node "${currentSSID}" thành công rồi đó!`);
          await runSideView(-12, 0);
          setStateScanNode(true); // turn on scan node
          setStateScanWifi(false); // turn off scan wifi node
          await runSideView(0, 1);
        }
      }

    } catch (error) {
      console.log(error);
      setDesc(`Đã có lỗi gì đó xảy ra khi cấu hình WIFI "${select?.name}}" cho Node "${currentSSID}"`);
    }
    if (visibleWifi) {
      setVisibleWifi(false);
    }
  }

  async function handleConfigWifi() {
    setLoadingWifi(true);
    if (stateScanNode) {
      await handleConnectToSSID();
    } else {
      await handleNodeConnectToWifi();
    }
    setSelect(null);
    setPassword('');
    setLoadingWifi(false);
  }

  async function resetConfigWifi() {
    try {
      setLoadingResetConfig(true);
      const res = await fetch(`${fullDomain}/reset-config`, { method: 'POST' });
      const payload = await res.json();
      if (payload?.message === 'RESET CONFIG SUCCESSFULLY') {
        await runSideView(-12, 0);
        setStateScanNode(true);
        await runSideView(0, 1);
      }
    } catch (error) {
      console.log(error);
      setDesc(`Đã có lỗi xảy ra khi bạn tiến hành reset cấu hình WIFI cho node ${currentSSID}}`);
    }
    setLoadingResetConfig(false);
  }

  function handleCloseModal() {
    if (stateScanNode) {
      setVisible(false);
    }
    if (stateScanWifi) {
      setVisibleWifi(false);
    }
    setPassword('');
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <IconScanWifi width={200} height={200} />
          <Text>Đang quét mạng xung quanh...</Text>
        </View>
      ) : (
        <View
          style={{
            // backgroundColor: 'white',
            borderRadius: 6,
            marginTop: 10,
            marginBottom: 10,
            flex: 1,
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: translateView.x,
                },
              ],
              opacity: translateView.y,
              flex: 1,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* <IconModule width={32} height={32} /> */}
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#505869',
                }}
              >
                {stateScanNode ? 'Truy cập Node' : 'Cấu hình WIFI Node'}
              </Text>
              <IconButton onPress={() => {
                if (stateScanNode) {
                  // show decription for scan Node
                  setDesc('Đây là danh sách các node mà điện thoại quét được, để bắt đầu cấu hình chúng bạn cần phải đăng nhập vào WIFI của node này, hãy xem mật khẩu mặc định bên dưới node đó, sau đó nhập mật khẩu để đến bước tiếp theo nhé');
                } else if (stateCheckIsConfig && wifiHasConfig !== null) {
                  setDesc(`Dưới đây là thông tin cấu hình WIFI cụ thể mà Node "${currentSSID}" đã cấu hình đến, bạn hãy ghi nhớ IP bên dưới để có thể cấu hình, nếu quên hãy quay lại đây nhé!`);
                } else {
                  // show decription for scan wifi by Node
                  setDesc(`Đây là danh sách WIFI xung quanh "${currentSSID}" mà nó quét được, bạn hãy chọn mạng hãy chọn mạng có chất lượng tốt nhất theo phần trăm tăng dần để có kết nối ổn định nhất nhé!`);
                }
              }} icon={({ size, color }) => ( <IconQuestion width={size - 5} height={size - 5} fill={color} /> )} iconColor={MD2Colors.white} containerColor={MD2Colors.green400} size={20} mode="contained" />
              {/* <View style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                  <Button buttonColor={MD2Colors.green400} style={{ ...styles.btnTab, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} mode="contained">First</Button>
                  <Button buttonColor={MD2Colors.green400} mode="contained" style={{ borderRadius: 0, marginHorizontal: 2, ...styles.btnTab}}>First</Button>
                  <Button buttonColor={MD2Colors.green400} style={{ ...styles.btnTab, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} mode="contained">First</Button>
                </View> */}
            </View>
            <Text style={{ fontStyle: 'italic', marginBottom: 5 }} variant="bodyLarge"> { stateScanNode ? 'Danh sách Node mà điện thoại quét được' : stateCheckIsConfig && wifiHasConfig !== null ? 'Thông tin mà WIFI mà Node đã cấu hình đến' : 'Danh sách WIFI mà Node quét được' }</Text>
            <View
              style={{
                paddingVertical: 10,
                flex: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                {stateScanNode ? (
                  // SECTION: Scan List Node
                  <>
                    {listNode.length > 0 ? (
                      <ScrollView
                        style={{
                          marginVertical: -10,
                        }}
                      >
                        {listNode.map((wifi, index) => (
                          <WifiItem
                            IconNavigate={currentSSID === wifi.SSID ? IconCheck : null}
                            Icon={IconModule}
                            sizeIcon={48}
                            sizeIconNavigate={24}
                            onPress={() => splitView(wifi)}
                            key={wifi.timestamp + wifi.BSSID}
                            name={
                              wifi.SSID.length > maxSSID
                                ? `${wifi.SSID.splice(0, maxSSID - 1)}...`
                                : wifi.SSID
                            }
                            quality={wifi.level}
                          />
                        ))}
                      </ScrollView>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ActivityIndicator
                          animating={true}
                          size={'large'}
                          color={MD2Colors.purple600}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#373E47',
                            paddingLeft: 10,
                            marginTop: 20,
                            ...styles.btnContent,
                          }}
                        >
                          Đang tìm kiếm mạng...
                        </Text>
                      </View>
                    )}
                  </>
                // SECTION: Scan List Wifi By ESP8266/32
                ) : (
                  !stateCheckIsConfig
                  ?
                    listWifi.length > 0 ? (
                      <ScrollView
                        style={{
                          marginVertical: -10,
                        }}
                      >
                        {listWifi.map((wifi, index) => (
                          <WifiItem
                            key={wifi.name + index}
                            name={
                              wifi.name.length > maxSSID
                                ? `${wifi.name.splice(0, maxSSID - 1)}...`
                                : wifi.name
                            }
                            quality={wifi.quality}
                            onPress={() => {
                              setSelect(wifi);
                              setVisibleWifi(true);
                            }}
                          />
                        ))}
                      </ScrollView>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ActivityIndicator
                          animating={true}
                          size={'large'}
                          color={MD2Colors.purple600}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#373E47',
                            paddingLeft: 10,
                            marginTop: 20,
                            ...styles.btnContent,
                          }}
                        >
                          Đang tìm kiếm mạng...
                        </Text>
                      </View>
                    )
                  :
                    wifiHasConfig === null
                    ?
                    // loading check wifi by node is config
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ActivityIndicator
                        animating={true}
                        size={'large'}
                        color={MD2Colors.purple600}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#373E47',
                          paddingLeft: 10,
                          marginTop: 20,
                          ...styles.btnContent,
                        }}
                      >
                        Đang kiểm tra cấu hình mạng...
                      </Text>
                    </View>
                    :
                    <View style={{
                      flex: 1,
                    }}>
                      <Card>
                        <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Avatar.Icon size={48} icon="wifi" />
                          <Button loading={loadingResetConfig} icon="restore" mode="contained" onPress={resetConfigWifi}>
                            Reset cấu hình WIFI
                          </Button>
                        </Card.Content>
                        <Divider horizontalInset={true} style={{ marginTop: 20 }} />
                        <Card.Title title="Thông tin" subtitle={`Node: ${currentSSID}`} />
                        <Divider horizontalInset={true} style={{ marginBottom: 10 }} />
                        <Card.Content>
                          <View style={styles.spacing}>
                            <Text variant="titleMedium">SSID</Text>
                            <Text variant="titleMedium">{ wifiHasConfig?.ssid }</Text>
                          </View>
                          <View style={styles.spacing}>
                            <Text variant="titleMedium">Password</Text>
                            <Text variant="titleMedium">{ wifiHasConfig?.password }</Text>
                          </View>
                          <View style={styles.spacing}>
                            <Text variant="titleMedium">IP</Text>
                            <Text variant="titleMedium">{ wifiHasConfig?.['ip-station'] }</Text>
                          </View>
                          <View style={styles.spacing}>
                            <Text variant="titleMedium">Trạng thái kết nối</Text>
                            <Text variant="titleMedium">{ wifiHasConfig?.['status-station'] ? 'Đã kết nối' : 'Bị ngắt kết nối' }</Text>
                          </View>
                          {
                            wifiHasConfig?.['status-station']
                            ?
                            <View style={{ ...styles.spacing, marginBottom: 0 }}>
                              <Text variant="titleMedium">Chất lượng kết nối</Text>
                              <Text variant="titleMedium">{  Math.min(Math.max(2 * (wifiHasConfig?.['quality-station'] + 100), 0), 100) }%</Text>
                            </View>
                            :
                            null
                          }
                        </Card.Content>
                      </Card>
                    </View>
                )
                }
              </View>
            </View>
          </Animated.View>
        </View>
      )}
      <Portal>
        {/* Dialog insert pass wifi node & pass wifi to config for node */}
        <Dialog onDismiss={handleCloseModal} visible={visible || visibleWifi}>
          <Dialog.Title>{ stateScanNode ? 'Kết nối tới node' : 'Cấu hình node tới WIFI' }</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ marginBottom: 10 }}>Bạn đang kết nối tới WIFI "{ select?.name || select?.SSID }"</Paragraph>
            <TextInput label={'Password'} secureTextEntry={secure} mode={'outlined'} right={<TextInput.Icon onPress={() => setSecure(state => !state)} icon="eye" />} value={password} onChangeText={(val) => setPassword(val)} placeholder="--- mật khẩu sẽ bị ẩn ---" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCloseModal}>Huỷ</Button>
            <Button loading={loadingWifi} mode={'contained'} labelStyle={{ marginLeft: 24 }} contentStyle={{ paddingRight: 14 }} onPress={handleConfigWifi}>
              { stateScanNode ? 'Kết nối' : 'Cấu hình' }
            </Button>
          </Dialog.Actions>
        </Dialog>
        {/* Dialog for manual user */}
        <Dialog onDismiss={() => { setDesc(null); }} visible={desc ? true : false}>
          <Dialog.Title>Chi tiết</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{ desc }</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setDesc(null); }}>Đã hiểu</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
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
  },
  btnTab: {
    flex: 1,
  },
  spacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

export default memo(ConnectNode);
