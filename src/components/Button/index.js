import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { palate } from '~/theme/palate.js';

function Button({ activeOpacity = 0.5, children, styleContent, styleParent, onPress, content })  {
  return (
    <TouchableOpacity style={styleParent} activeOpacity={activeOpacity} onPress={onPress}>
      { children ? children : <Text style={styleContent}>{ content }</Text> }
    </TouchableOpacity>
  );
}

export default memo(Button);
