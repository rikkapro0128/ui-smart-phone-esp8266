import { memo, useEffect, useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Appbar, Card, Avatar, Divider, Text, MD2Colors, Button } from 'react-native-paper';
// import { IconConfig } from '~/Icons';

const styles = StyleSheet.create({
  inputIp: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    fontSize: 16,
    flex: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
  },
  spacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

function Node({ route, navigation }) {
  const { path, id, name, ip, doneConfig } = route.params;
  const [valIP, setValIP] = useState({
    domain_1: undefined,
    domain_2: undefined,
    domain_3: undefined,
    domain_4: undefined,
  });
  const [presentFocus, setPresentFocus] = useState('ip_1');
  const ref_ip_1 = useRef();
  const ref_ip_2 = useRef();
  const ref_ip_3 = useRef();
  const ref_ip_4 = useRef();

  useEffect(() => {

  }, []);

  function handleIPAddress(type, val) {
    const getIndex = parseInt(String(type).split('_')[1]);
    // console.log(getIndex, val, val.length);
    setValIP({ ...valIP, type: val });
    if (val.length >= 3) {
      if (getIndex === 1) {
        ref_ip_2.current.focus();
        setPresentFocus(() => 'ip_2');
      } else if (getIndex === 2) {
        ref_ip_3.current.focus();
        setPresentFocus(() => 'ip_3');
      } else if (getIndex === 3) {
        ref_ip_4.current.focus();
        setPresentFocus(() => 'ip_4');
      } else {
        ref_ip_4.current.blur();
      }
    }
  }

  function handleFocus(type) {
    const getIndex = String(type).split('_')[1];
    setPresentFocus(() => `ip_${getIndex}`);
  }

  function handleSubmitInput(type) {
    if (type === 'domain_1') {
      ref_ip_2.current.focus();
      setPresentFocus(() => 'ip_2');
    } else if (type === 'domain_2') {
      ref_ip_3.current.focus();
      setPresentFocus(() => 'ip_3');
    } else if (type === 'domain_3') {
      ref_ip_4.current.focus();
      setPresentFocus(() => 'ip_4');
    } else {
      ref_ip_4.current.blur();
    }
  }

  return (
    <>
      <View style={{
        width: '100%',
      }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack(); }} />
        <Appbar.Content title="Cấu hình node" />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      {/* <Divider
        thickness={2}
        marginVertical={0}
      /> */}
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
              width: '100%',
              marginBottom: 20,
            }}>
              <Card>
                <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <Text variant="titleLarge">Thông tin</Text>
                  <Avatar.Icon size={42} icon="router-wireless" />
                </Card.Content>
                <Divider horizontalInset={true} style={{ marginBottom: 10 }} />
                <Card.Content>
                  <View style={styles.spacing}>
                    <Text variant="titleMedium">ID</Text>
                    <Text variant="titleMedium">{ id }</Text>
                  </View>
                  <View style={styles.spacing}>
                    <Text variant="titleMedium">Tên</Text>
                    <Text variant="titleMedium">{ name }</Text>
                  </View>
                </Card.Content>
              </Card>
            </View>
            <Card style={{
              width: '100%',
              backgroundColor: MD2Colors.indigo50,
            }}>
              <Card.Content>
                <Text style={{
                fontSize: 18,
                fontStyle: 'italic',
                width: '100%',
                borderRadius: 6,
              }}>"Đây là cấu hình liên kết ứng dụng với node mà bạn đã kết nối WIFI, hãy liên kết để hoàn tất quá trình cấu hình thiết bị. Lưu ý rằng&#160;
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
              </Card.Content>
            </Card>
            <View style={{
              width: '100%',
              marginTop: 18,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text variant="labelMedium">Bạn đã cấu hình WIFI cho node đó chưa?</Text>
              <Button icon="wifi-arrow-up-down" labelStyle={{ fontSize: 14 }} mode="contained" onPress={() => { navigation.navigate('Connects'); }}>
                Cấu hình
              </Button>
            </View>
            <View style={{
              width: '100%',
            }}>
              <Text style={{
                textAlign: 'left',
                marginVertical: 10,
                fontSize: 18,
                fontWeight: 'bold',
              }}>Địa chỉ IP của thiết bị</Text>
              <View style={{
                flexDirection: 'row',
                marginHorizontal: -5,
              }}>
                <TextInput
                  style={styles.inputIp}
                  keyboardType="numeric"
                  placeholder="xxx"
                  autoFocus={true}
                  value={valIP.domain_1}
                  onFocus={() => handleFocus('domain_1')}
                  onSubmitEditing={() => handleSubmitInput('domain_1')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_1', val)}
                />
                <TextInput
                  style={styles.inputIp}
                  keyboardType="numeric"
                  placeholder="xxx"
                  value={valIP.domain_2}
                  ref={ref_ip_2}
                  onFocus={() => handleFocus('domain_2')}
                  onSubmitEditing={() => handleSubmitInput('domain_2')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_2', val)}
                  />
                <TextInput
                  style={styles.inputIp}
                  keyboardType="numeric"
                  placeholder="xxx"
                  value={valIP.domain_3}
                  ref={ref_ip_3}
                  onFocus={() => handleFocus('domain_3')}
                  onSubmitEditing={() => handleSubmitInput('domain_3')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_3', val)}
                  />
                <TextInput
                  style={styles.inputIp}
                  keyboardType="numeric"
                  placeholder="xxx"
                  value={valIP.domain_4}
                  ref={ref_ip_4}
                  onFocus={() => handleFocus('domain_4')}
                  onSubmitEditing={() => handleSubmitInput('domain_4')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_4', val)}
                />
              </View>
              {/* <Button style={{
                marginTop: 15,
              }}>
                TIẾN HÀNH KẾT NỐI
              </Button> */}
            </View>
          </View>
        }
      </View>

    </>
  );
}

export default memo(Node);
