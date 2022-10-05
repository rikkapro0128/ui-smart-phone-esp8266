/* eslint-disable react-hooks/exhaustive-deps */
import { useState, memo, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Sign from '~/components/Sign';
import Navigate from '~/components/Navigate';
import Divider from '~/components/Divider';
import SignSocial from '~/components/SignSocial';
import { Github } from '~/Icons';
import { Auth } from '~/auth/index.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '~/store/signSlice';

// import * as Google from 'expo-auth-session/providers/google';

const message = {
  'c (auth/user-not-found).': 'Tài khoản này không tồn tại?',
  'Firebase: Error (auth/email-already-in-use).': 'Email này đã được đăng ký!',
  'Firebase: Error (auth/wrong-password).': 'Tài khoản không hợp lệ!',
};

function SignAuth({ route, navigation }) {
  const dispatch = useDispatch();
  const { state } = route.params;
  const [stateSign, setStateSign] = useState(state);

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId:
  //     '850158074973-i3rd6ifdcjvnaj3e09oh8kotuarupv1l.apps.googleusercontent.com',
  // });

  const handlePayloadSign = useCallback(async (type, payload) => {
    if (type === 'signIn') {
      // auth account with payload!
      try {
        await signInWithEmailAndPassword(Auth, payload.email, payload.password);
      } catch (error) {
        console.log(error);
        if (error.message in message) {
          Alert.alert('Opps, Lỗi rồi', message[error.message], [
            {
              text: 'Hiểu rồi',
            },
          ]);
        } else {
          Alert.alert('Opps, đăng nhập thất bại', 'Lỗi không xác định!', [
            {
              text: 'Hiểu rồi',
            },
          ]);
        }
      }
    } else if (type === 'signUp') {
      // register account with payload user insert!
      try {
        await createUserWithEmailAndPassword(Auth, payload.email, payload.password);
      } catch (error) {
        if (error.message in message) {
          Alert.alert('Opps, Lỗi rồi', message[error.message], [
            {
              text: 'Hiểu rồi',
            },
          ]);
        } else {
          Alert.alert('Opps, đăng ký thất bại', 'Lỗi không xác định!', [
            {
              text: 'Hiểu rồi',
            },
          ]);
        }
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      console.log(user);
      if (user) {
        dispatch(setUser(user.toJSON()));
      }
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     (async function temp() {
  //       try {
  //         const {id_token} = response.params;
  //         const credential = GoogleAuthProvider.credential(id_token);
  //         const result = await signInWithCredential(Auth, credential);
  //         console.log(result);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }
  // }, [response]);

  // const handleSocialSign = useCallback(async type => {
  //   console.log(request);
  //   try {
  //     if (type === 'google') {
  //       // login with google popup!
  //       if (request) {
  //         await promptAsync();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Opps, lỗi rồi bạn à', `Đăng nhập bằng ${type} thất bại`, [
  //       {
  //         text: 'Hiểu rồi',
  //       },
  //     ]);
  //   }
  // }, []);

  return (
    <View>
      <Navigate
        onRequestNavigate={() => {
          navigation.goBack();
        }}
      />
      <View style={{ paddingHorizontal: 40 }}>
        <Sign
          style={{ marginTop: 40 }}
          stateSign={stateSign}
          onSetSign={(state) => {
            setStateSign(state);
          }}
          submitPayloadSign={handlePayloadSign}
        />
        <Divider
          thickness={1}
          content={`${stateSign === 'signIn' ? 'Đăng nhập' : 'Đăng ký'} bởi social`}
          marginVertical={20}
        />
        <View style={{ marginTop: 5 }}>
          <SignSocial
            // onPress={handleSocialSign}
            socialName={'google'}
            stateSign={stateSign}
            marginBottom={20}
          />
          <SignSocial
            // onPress={handleSocialSign}
            bg={'#000'}
            socialName={'github'}
            stateSign={stateSign}
          >
            <Github width={32} height={32} />
          </SignSocial>
        </View>
      </View>
    </View>
  );
}

export default memo(SignAuth);
