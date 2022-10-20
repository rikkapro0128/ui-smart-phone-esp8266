import { memo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { palate } from '~/theme/palate.js';
import NotFound from '~/components/NotFound/default.js';
import { useModal } from '~/hooks/useModal.js';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    marginTop: 6,
    fontSize: 16,
  },
});

function AddDevice() {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Nhập ID thiết bị bạn sở hữu'}
        underlineColorAndroid={'transparent'}
      />
      <TextInput
        style={styles.input}
        placeholder={'Hãy đặt tên thiết bị này'}
        underlineColorAndroid={'transparent'}
      />
    </View>
  );
}

function Configs({ navigation, route }) {
  const { title, field, btnTitle } = route.params;
  const [stateModal, setStateModal, openModal, closeModal] = useModal();

  useEffect(() => {
    setStateModal({
      ...stateModal,
      title: 'Đăng ký thiết bị mới',
      children: <AddDevice />,
      onAccept: () => {
        console.log('Accept');
        closeModal();
      },
      onCancel: () => {
        console.log('Cancel');
        closeModal();
      },
    });
  }, []);

  return (
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
      <NotFound type={field} title={title} />
      {btnTitle ? (
        <TouchableOpacity
          onPress={() => {
            openModal();
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
    </View>
  );
}

export default memo(Configs);
