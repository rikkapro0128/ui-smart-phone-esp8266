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
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setType } from '~/store/signSlice';

// import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const message = {
  'c (auth/user-not-found).': 'Tài khoản này không tồn tại?',
  'Firebase: Error (auth/email-already-in-use).': 'Email này đã được đăng ký!',
  'Firebase: Error (auth/wrong-password).': 'Tài khoản không hợp lệ!',
};

GoogleSignin.configure({
  webClientId:
    '850158074973-13467hb47t74ervfkfq879kju3de051r.apps.googleusercontent.com',
});

function SignAuth({ route, navigation }) {
  const dispatch = useDispatch();
  const { state } = route.params;
  const [stateSign, setStateSign] = useState(state);

  const handlePayloadSign = useCallback(async (type, payload) => {
    dispatch(setType('local'));
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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(Auth, (user) => {
  //     console.log(user);
  //     if (user) {
  //       dispatch(setUser(user.toJSON()));
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleSocialSign = useCallback(async type => {
    try {
      if (type === 'google') {
        // login with google popup!
        dispatch(setType('google'));
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(Auth, credential);
      }
    } catch (error) {
      console.log(error.message);
      if(error.message === 'Sign in action cancelled') {

      }else {
        Alert.alert('Opps, lỗi rồi bạn à', `Đăng nhập bằng ${type} thất bại`, [
          {
            text: 'Hiểu rồi',
          },
        ]);
      }
    }
  }, []);

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
            onPress={handleSocialSign}
            socialName={'google'}
            stateSign={stateSign}
            marginBottom={20}
          />
          <SignSocial
            onPress={handleSocialSign}
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
