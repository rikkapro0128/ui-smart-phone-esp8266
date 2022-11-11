import { memo, useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import Divider from '~/components/Divider';
import TopBar from '~/components/TopBar';
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
    if(val.length >= 3) {
      if(getIndex === 1) {
        ref_ip_2.current.focus();
        setPresentFocus(() => 'ip_2');
      }else if(getIndex === 2) {
        ref_ip_3.current.focus();
        setPresentFocus(() => 'ip_3');
      }else if(getIndex === 3) {
        ref_ip_4.current.focus();
        setPresentFocus(() => 'ip_4');
      }else {
        ref_ip_4.current.blur();
      }
    }
  }

  function handleFocus(type) {
    const getIndex = String(type).split('_')[1];
    setPresentFocus(() => `ip_${getIndex}`);
  }

  function handleSubmitInput(type) {
    if(type === 'domain_1') {
      ref_ip_2.current.focus();
      setPresentFocus(() => 'ip_2');
    }else if(type === 'domain_2') {
      ref_ip_3.current.focus();
      setPresentFocus(() => 'ip_3');
    }else if(type === 'domain_3') {
      ref_ip_4.current.focus();
      setPresentFocus(() => 'ip_4');
    }else {
      ref_ip_4.current.blur();
    }
  }

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
                  placeholder='xxx'
                  autoFocus={true}
                  value={valIP.domain_1}
                  onFocus={() => handleFocus('domain_1')}
                  onSubmitEditing={() => handleSubmitInput('domain_1')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_1', val)}
                />
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx'
                  value={valIP.domain_2}
                  ref={ref_ip_2}
                  onFocus={() => handleFocus('domain_2')}
                  onSubmitEditing={() => handleSubmitInput('domain_2')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_2', val)}
                  />
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx'
                  value={valIP.domain_3}
                  ref={ref_ip_3}
                  onFocus={() => handleFocus('domain_3')}
                  onSubmitEditing={() => handleSubmitInput('domain_3')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_3', val)}
                  />
                <TextInput 
                  style={styles.inputIp}
                  keyboardType='numeric'
                  placeholder='xxx'
                  value={valIP.domain_4}
                  ref={ref_ip_4}
                  onFocus={() => handleFocus('domain_4')}
                  onSubmitEditing={() => handleSubmitInput('domain_4')}
                  blurOnSubmit={false}
                  onChangeText={(val) => handleIPAddress('domain_4', val)}
                />
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
