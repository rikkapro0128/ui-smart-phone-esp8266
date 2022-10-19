import { memo, useContext, useEffect } from 'react'
import { View, TouchableWithoutFeedback , Text, Dimensions } from 'react-native'
import { useModal } from '~/hooks/useModal.js'
import { palate } from '~/theme/palate.js'
import Button from '~/components/Button'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Modal() {
  const [stateModal, setStateModal] = useModal();

  useEffect(() => {
    console.log(width, height);
  }, [])

  return stateModal.status ? (
    <>
      <TouchableWithoutFeedback 
        onPress={() => { stateModal.onCancel() }}  
      >
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          {/* <Button onPress={() => {
              setStateModal((state) => ({ ...state, log: 'change' }));
            }} title="Click me!" /> */}
        </View>
      </TouchableWithoutFeedback >
      <View
        style={{
          width: '100%',
          position: 'absolute',
          top: '50%',
          left: 0,
          zIndex: 999,
          transform: [
            {
              translateY: -100
            },
          ]
        }}
      >
        <View
          style={{
            marginHorizontal: 40,
            padding: 20,
            backgroundColor: palate.light.main,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {stateModal?.title || ''}
          </Text>
          {/* <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: palate.light.bgSecondary,
              marginVertical: 6,
            }}
          ></View> */}
          {stateModal?.children ? stateModal?.children : <Text>{stateModal?.message || ''}</Text>}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10
            }}
          >
            {stateModal?.textBtnCancel ? <Button onPress={() => { stateModal.onCancel() }} content={stateModal.textBtnCancel} /> : null}
            {stateModal?.textBtnAccept ? <Button onPress={() => { stateModal.onAccept() }} content={stateModal.textBtnAccept} bgColor={palate.light.bgSecondary} /> : null}
          </View>
        </View>
      </View>
    </>
  ) : null
}

export default memo(Modal)
