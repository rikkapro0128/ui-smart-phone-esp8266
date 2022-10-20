import { Text, View, StyleSheet, Keyboard } from 'react-native';
// import { createNavigatorFactory } from '@react-navigation/native';
import { useState, memo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@react-native-material/core';
import Carousel from 'react-native-reanimated-carousel';
import PageControl from 'react-native-animated-pagination-dot';

import { Logo, AngleTop } from '~/Icons';
import { palate } from '~/theme/palate';

const styles = StyleSheet.create({
  root: {
    height: '100%',
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  btn: {
    marginTop: 20,
    padding: 10,
  },
  box: {
    marginVertical: 30,
  },
  carousel: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
  },
  itemSlider: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    transform: [
      {
        translateY: -50,
      },
    ],
  },
});

const introduce = [
  {
    title: 'Chào bạn!',
    desc: 'Mừng bạn đến với hệ thống giám sát & điều khiển các thiết bị thông minh',
  },
  {
    title: 'Linh Động',
    desc: 'Với các cài đặt cho phép bạn điều khiển linh động các thiết bị phần cứng, nhóm chúng lại với nhau',
  },
  {
    title: 'Cloud Service',
    desc: 'Hệ thống sử dụng Firebase với khả năng giám sát & điều khiển realtime thiết bị',
  },
  {
    title: 'Giao diện',
    desc: 'Giao diện ứng dụng tương thích đa nền tảng từ IOS đến Android',
  },
];

function LandingPageDefault({ navigation }) {
  const [countPage, setCountPage] = useState(0);
  const [stateSign, setStateSign] = useState({ signIn: false, signUp: false });

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#9acce8', '#a1a5ec']}
      end={{ x: 0.4, y: 0.8 }}
    >
      <View style={styles.root}>
        {/* Block Logo */}
        <View style={styles.logo}>
          <Logo width={120} height={120} fill={palate.light.textSecondary} />
        </View>
        {/* Block Carousel */}
        <View style={{ display: 'flex', alignItems: 'center', ...styles.box }}>
          <Carousel
            loop
            style={styles.carousel}
            width={250}
            height={150}
            autoPlay={true}
            data={introduce}
            scrollAnimationDuration={3000}
            onSnapToItem={(index) => setCountPage(index)}
            renderItem={({ item }) => (
              <View key={item.title} style={styles.itemSlider}>
                <Text
                  style={{
                    color: palate.light.textSecondary,
                    fontSize: 30,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: palate.light.textSecondary,
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  a{item.desc}
                </Text>
              </View>
            )}
          />
          <PageControl
            activeDotColor={palate.light.textSecondary}
            maxPage={introduce.length}
            curPage={countPage}
          />
        </View>
        {/* Block Sign In & Sign Up */}
        <View style={styles.box}>
          <Button
            onPress={() => {
              navigation.navigate('Sign', { state: 'signIn' });
            }}
            tintColor={palate.light.secondary}
            color={palate.light.textSecondary}
            style={styles.btn}
            title="Đăng nhập"
          />
          <Button
            onPress={() => {
              navigation.navigate('Sign', { state: 'signUp' });
            }}
            tintColor={palate.light.secondary}
            color={palate.light.textSecondary}
            style={styles.btn}
            title="Đăng ký"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default memo(LandingPageDefault);
