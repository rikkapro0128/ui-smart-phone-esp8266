import { memo, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { palate } from '~/theme/palate.js';
import { signOut } from 'firebase/auth';
import { Auth } from '~/auth/index.js';
import { signOut as clearAccount } from '~/store/signSlice';
import { useDispatch, useSelector } from 'react-redux';
import { User, ArrowRight, SettingSlider, Database, HistoryTime, Password, Logout, UserLine } from '~/Icons';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const colors = [
  '#6ec8f2',
  '#9ce53e',
  '#ebb62d',
  '#d3e7f3',
  '#e0d59e',
  '#e34f85',
  '#3480ea',
  '#fd354c',
  '#9263e9',
  '#e0d59e',
];

const profiles = [
  {
    type: 'info',
    name: 'Thông tin cá nhân',
    Icon: <User width={26} height={26} fill={palate.light.bgSecondary} />,
    colorIcon: 'rgb(123,213,85)',
  },
  {
    type: 'setting',
    name: 'Cài đặt ứng dụng',
    Icon: <SettingSlider width={26} height={26} fill={palate.light.bgSecondary} />,
    colorIcon: 'hsl(0,82%,65%)',
  },
  {
    type: 'database',
    name: 'Cấu hình lưu trữ dữ liệu',
    Icon: <Database width={26} height={26} fill={palate.light.bgSecondary} />,
    colorIcon: 'hsl(32,90%,50%)',
  },
  {
    type: 'history',
    name: 'Lịch sử thao tác',
    Icon: <HistoryTime width={26} height={26} fill={palate.light.bgSecondary} />,
    colorIcon: 'hsl(261,75%,65%)',
  },
  {
    type: 'password',
    name: 'Thay đổi mật khẩu',
    Icon: <Password width={26} height={26} fill={palate.light.bgSecondary} />,
    colorIcon: 'hsl(50,52%,75%)',
  },
  {
    type: 'signout',
    name: 'Đăng xuất',
    Icon: <Logout width={26} height={26} fill={palate.light.bgSecondary} />,
    colorIcon: 'hsl(0, 0%, 84%)',
  },
];

function Profile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sign.user);
  const typeSignMethod = useSelector((state) => state.sign.type);

  function handleLogout(type) {
    if (type === 'signout') {
      Alert.alert('Xác nhận đăng xuất', 'Bạn có chắc muốn đăng xuất tài khoản khỏi ứng dụng?', [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: async () => {
            try {
              await signOut(Auth);
              dispatch(clearAccount());
              if(typeSignMethod === 'google') {
                const isSignIn = await GoogleSignin.isSignedIn();
                if(isSignIn) { await GoogleSignin.signOut(); }
              }
            } catch (error) {
              // console.log(error);
              Alert.alert('Opp, có lỗi', 'Không thế đăng xuất tài khoản!');
            }
          },
        },
      ]);
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: palate.light.main,
            marginLeft: -20,
            marginRight: -20,
            paddingVertical: 30,
            paddingHorizontal: 20,
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: 420,
              height: 420,
              borderRadius: 420 / 2,
              backgroundColor: 'white',
              opacity: 0.2,
              transform: [
                {
                  translateX: -(420 / 2),
                },
                {
                  translateY: -(420 / 3),
                },
              ],
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
              backgroundColor: 'white',
              opacity: 0.2,
              transform: [
                {
                  translateX: 200,
                },
                {
                  translateY: 200 / 2,
                },
              ],
            }}
          />
          <View
            style={{
              elevation: user.photoURL ? 5 : null,
              width: 80,
              height: 80,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: palate.light.bgSecondary,
              position: 'relative',
            }}
            onTouchStart={() => {
              navigation.navigate('Profile');
            }}
          >
            {
              user.photoURL 
              ?
              <Image
                source={{
                  uri: user.photoURL,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
              />
              :
              <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UserLine width={48} height={48} fill={palate.light.textSecondary} />
              </View>
            }
            <View
              style={{
                position: 'absolute',
                width: 12,
                height: 12,
                borderRadius: 5,
                backgroundColor: 'rgb(123,213,85)',
                top: 4,
                right: 4,
                elevation: 5,
              }}
            />
          </View>
          <Text
            style={{
              color: palate.light.textSecondary,
              fontSize: 19,
              paddingVertical: 5,
            }}
          >
            Chào, { `${user.displayName ? user.displayName : 'đằng ấy' }` } nhé
          </Text>
          <Text
            style={{
              color: palate.light.textSecondary,
              fontSize: 16,
            }}
          >
            { user.email }
          </Text>
        </View>
        <View
          style={{
            backgroundColor: palate.light.bgSecondary,
            borderRadius: 20,
            overflow: 'hidden',
            marginVertical: 20,
            padding: 20,
          }}
        >
          {profiles.map((profile, index) => (
            <View key={profile.name}>
              {index !== 0 ? (
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: palate.light.text,
                    opacity: 0.5,
                    marginVertical: 15,
                  }}
                />
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  handleLogout(profile.type);
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {/* wrap logo here */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: profile.colorIcon,
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {profile.Icon}
                    </View>
                    <Text
                      style={{
                        color: palate.light.text,
                        fontSize: 20,
                        marginLeft: 12,
                      }}
                    >
                      {profile.name}
                    </Text>
                  </View>
                  <ArrowRight
                    style={{ marginRight: 10 }}
                    width={16}
                    height={16}
                    fill={palate.light.text}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default memo(Profile);
