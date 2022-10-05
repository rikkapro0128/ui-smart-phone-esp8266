import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { palate } from '~/theme/palate';
import { Button } from '@react-native-material/core';
import { useState, memo, useEffect } from 'react';
import { checkEmail } from '~/utils';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    padding: 10,
  },
  input: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    color: palate.light.text,
    backgroundColor: palate.light.bgSecondary,
  },
  shadowInput: {
    elevation: 2,
    backgroundColor: palate.light.bgSecondary,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10,
  },
  titleForgetPassWord: {
    color: palate.light.text,
    marginTop: 20,
    textAlign: 'center',
  },
  titleChangePassword: {
    textDecorationLine: 'underline',
  },
});

const inputList = [
  {
    title: 'Email',
    field: 'email',
    class: 'both',
    note: 'vd: miru@gmail.com',
  },
  {
    title: 'Mật khẩu',
    field: 'password',
    class: 'both',
    note: 'vd: mirudeptrainhatxom',
    security: true,
  },
  {
    title: 'Xác nhận mật khẩu',
    field: 'confirm',
    class: 'signup',
    security: true,
  },
];

function BoxInputShadow({
  title = 'Input name',
  security = false,
  fieldName,
  onChangeForm,
  value,
}) {
  // const inputRef = useRef();

  const propsInput = {
    style: styles.input,
    placeholderTextColor: palate.light.text,
    onTouchEnd: (event) => {
      event.target.focus();
    },
  };

  return (
    <View style={styles.shadowInput}>
      <TextInput
        // ref={inputRef}
        {...propsInput}
        placeholder={title}
        onChangeText={(value) => {
          onChangeForm(fieldName, value);
        }}
        secureTextEntry={security}
        value={value || ''}
      />
    </View>
  );
}

function Sign({ stateSign, onSetSign, style, submitPayloadSign }) {
  const [payloadSign, setPayloadSign] = useState({});
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState({
    title: 'Thông báo',
    content: 'Không có gì nè!',
  });

  useEffect(() => {
    setPayloadSign({});
  }, [stateSign]);

  function handleFormChangeValue(field, value) {
    setPayloadSign((state) => ({ ...state, [field]: value }));
  }

  function validatePayload() {
    if (!payloadSign.email || !payloadSign.password) {
      Alert.alert('Opps, bạn ơi', 'Thông tin vẫn chưa được đầy đủ mà!🐧', [
        {
          text: 'Thoát',
        },
        { text: 'Hiểu rồi' },
      ]);
      return;
    }
    const isEmail = checkEmail(payloadSign.email);
    if (!isEmail) {
      Alert.alert('Opps, bậy rồi', 'Email này không hợp lệ nhé!🐧', [
        {
          text: 'Thoát',
        },
        { text: 'Hiểu rồi' },
      ]);
      return;
    }
    if (stateSign === 'signUp') {
      if (payloadSign.password !== payloadSign?.confirm) {
        Alert.alert('Opps, bạn à', 'Mật khẩu bạn xác nhận không giống nhau, xem lại nhé!🐧', [
          {
            text: 'Thoát',
          },
          { text: 'Hiểu rồi' },
        ]);
        return;
      }
      if (!payloadSign?.confirm) {
        Alert.alert('Opps, bạn ơi', 'Bạn chưa xác nhận mật khẩu!🐧', [
          {
            text: 'Thoát',
          },
          { text: 'Hiểu rồi' },
        ]);
        return;
      }
    }
    const isPassword = String(payloadSign.password).match(/^.{8,}$/);
    if (!isPassword) {
      Alert.alert('Opps, chết rồi', 'mật khẩu phải lớn hơn 8 bạn nhé!🐧', [
        {
          text: 'Thoát',
        },
        { text: 'Hiểu rồi' },
      ]);
      return;
    }
    // goto resgister account!
    submitPayloadSign(stateSign, payloadSign);
  }

  return (
    <View style={style}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onTouchStart={() => {
            onSetSign('signIn');
          }}
          color={palate.light.text}
          style={{ ...styles.btn, opacity: stateSign === 'signIn' ? 1 : 0.2 }}
          title="form đăng nhập"
          variant="text"
        />
        <Button
          onTouchStart={() => {
            onSetSign('signUp');
          }}
          color={palate.light.text}
          style={{ ...styles.btn, opacity: stateSign === 'signUp' ? 1 : 0.2 }}
          title="form đăng ký"
          variant="text"
        />
      </View>
      <View>
        {inputList.map((inputItem) => {
          if (stateSign === 'signIn' && inputItem.class === 'signup') {
            return null;
          }
          return (
            <View key={inputItem.field}>
              <BoxInputShadow
                value={payloadSign?.[inputItem.field]}
                title={inputItem.title}
                fieldName={inputItem.field}
                onChangeForm={handleFormChangeValue}
                security={inputItem?.security || false}
              />
              {stateSign === 'signUp' && inputItem?.note ? (
                <Text style={{ marginLeft: 10, color: palate.light.text }}>{inputItem?.note}</Text>
              ) : null}
            </View>
          );
        })}
        <Button
          onTouchStart={validatePayload}
          tintColor="white"
          color="#a1a5ec"
          style={styles.btn}
          title={`${stateSign === 'signIn' ? 'Đăng nhập' : 'Đăng ký'}`}
        />
        {stateSign === 'signIn' ? (
          <Text style={styles.titleForgetPassWord}>
            Liệu bạn có, <Text style={styles.titleChangePassword}>quên mật khẩu</Text>?
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default memo(Sign);
