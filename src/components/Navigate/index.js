import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { memo } from 'react';
import { Back } from '~/Icons';
import { palate } from '~/theme/palate.js';

const styles = StyleSheet.create({
  root: {
    height: 60,
    width: '100%',
    backgroundColor: '#2B2D42',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Navigate({ to, onRequestNavigate, back }) {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onRequestNavigate(to ? to : '');
        }}
      >
        <Back style={{ padding: 5 }} width={32} height={32} fill={palate.light.bgSecondary} />
      </TouchableOpacity>
    </View>
  );
}

export default memo(Navigate);
