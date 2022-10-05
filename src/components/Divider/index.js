import { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { palate } from '~/theme/palate.js';

/*
  prop: {
    content,
    thickness,
    paddingHorizontal,
    color,
    size,
    textTransform,
    marginVertical,
    lineColor,
  }
*/

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
  },
});

function Divider({
  content,
  thickness = 2,
  paddingHorizontal = 10,
  color = palate.light.text,
  size = 16,
  textTransform = 'capitalize',
  marginVertical = 10,
  lineColor = palate.light.text,
}) {
  return (
    <View style={{ ...styles.root, marginVertical }}>
      <View
        style={{
          ...styles.line,
          height: thickness,
          backgroundColor: lineColor,
        }}
      />
      <Text style={{ paddingHorizontal, color, fontSize: size, textTransform }}>{content}</Text>
      <View
        style={{
          ...styles.line,
          height: thickness,
          backgroundColor: lineColor,
        }}
      />
    </View>
  );
}

export default memo(Divider);
