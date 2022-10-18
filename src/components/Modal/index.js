import { memo, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import ModalContext from '~/context/modal.js';


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

function Modal({ children }) {
  const user = useContext(ModalContext);

  console.log(user);

  return (
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
      {children}
    </View>
  )
}

export default memo(Modal)
