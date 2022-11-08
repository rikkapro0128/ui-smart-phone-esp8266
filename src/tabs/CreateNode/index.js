import { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Button, Card, Input, Modal, Text as TextKitten, Layout, Spinner } from '@ui-kitten/components'
import { palate } from '~/theme/palate.js'
import NotFound from '~/components/NotFound/default.js'
import { AppStorage } from '~/auth/index.js'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { v1 as uuidv1 } from 'uuid'
import Device from '~/components/Device'
import { useSelector } from 'react-redux'
import { IconModule } from '~/Icons'

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    marginTop: 6,
    fontSize: 16,
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 6,
  },
})

const db = getDatabase(AppStorage)

function Configs({ navigation, route }) {
  const { title, field, btnTitle } = route.params;
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState(field)
  const [meta, setMeta] = useState({ title: '', inputTitle: '' })
  const [valInput, setValInput] = useState('')
  const user = useSelector((state) => state.sign.user)
  const [pathDevice, setPathDevice] = useState(`user-${user.uid}/devices`)
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === 'Devices') {
      setMeta({ title: 'Đăng ký thiết bị', inputTitle: 'Nhập tên thiết bị...' })
    } else if (type === 'Areas') {
      setMeta({ title: 'Đăng ký khu vực', inputTitle: 'Nhập tên khu vực...' })
    }
  }, [type])

  useEffect(() => {
    setPathDevice(`user-${user.uid}/devices`);
  }, [user])

  useEffect(() => {
    onValue(ref(db, pathDevice), (snapshot) => {
      if (snapshot.exists()) {
        const payload = snapshot.val();
        let temp = [];
        for (let item in payload) {
          temp.push({ ...payload[item], id: item.split('-')[1] });
        }
        setDevices(temp);
      }
      setLoading(false);
    })
  }, [])

  function hanldeCreateConfig() {
    setVisible(false);
    if (type === 'Devices') {
      const genID = Date.now()
      set(ref(db, '/' + `${pathDevice}/node-${genID}`), {
        id: genID,
        name: valInput,
      });
      setValInput('');
    }
  }

  return (
    <>
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
        {
          loading 
          ?
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Spinner size='giant'/>
              <TextKitten style={{
                marginTop: 20,
                fontSize: 20,
              }}>Đang tải thiết bị có sẵn...</TextKitten>
            </View>
          :
            <>
              {devices.length > 0 && field == 'Nodes' ? (
                <>
                  <ScrollView
                    style={{
                      flex: 1,
                      marginVertical: 16
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    >
                      {devices.map((device, index) => (
                        <Card key={device.id} style={{
                          width: (windowWidth - 60) / 2,
                          margin: 5,
                        }}
                          onPress={() => {
                            navigation.navigate('Device', { path: pathDevice, ...device });
                          }}
                        >
                          <IconModule style={{
                            alignSelf: 'center'
                          }} width={64} height={64} />
                          <TextKitten style={{
                            textAlign: 'left',
                            marginTop: 6,
                          }}>{device.name.length > 20 ? device.name.slice(0, 20) + '...' : device.name }</TextKitten>
                        </Card>
                      ))}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <>
                  <NotFound type={field} title={title} />
                  {btnTitle ? (
                    <TouchableOpacity
                      onPress={() => {
                        setType(field)
                        setVisible(true)
                      }}
                      style={{ marginBottom: 20 }}
                      activeOpacity={0.3}
                    >
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
                </>
              )}
            </>
        }
      </View>
      <Modal
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        visible={visible}
      >
        <Card
          style={{
            width: windowWidth - 80,
          }}
          disabled={true}
        >
          <Text
            style={{
              marginBottom: 15,
              fontSize: 17,
            }}
          >
            {meta.title}
          </Text>
          <Input
            style={{
              marginBottom: 15,
            }}
            placeholder={meta.inputTitle}
            value={valInput}
            onChangeText={(val) => setValInput(val)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              size="small"
              style={{
                marginRight: 10,
              }}
              onPress={() => setVisible(false)}
            >
              Huỷ
            </Button>
            <Button size="small" onPress={hanldeCreateConfig}>
              Tạo
            </Button>
          </View>
        </Card>
      </Modal>
    </>
  )
}

export default memo(Configs)
