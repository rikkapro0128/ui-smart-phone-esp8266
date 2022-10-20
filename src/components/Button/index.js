import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { palate } from '~/theme/palate.js';

function Button({ children, content, bgColor = palate.light.main, color = palate.light.bgSecondary, padding = 10, onPress })  {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      { children ? children : <Text style={{
        backgroundColor: bgColor,
        color: color,
        padding: padding,
        borderRadius: 6,
        marginLeft: 10,
      }}>{ content }</Text> }
    </TouchableOpacity>
  );
}

export default memo(Button);
