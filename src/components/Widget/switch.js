import { memo, useState } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { palate } from '~/theme/palate.js';
import ToggleSwitch from 'toggle-switch-react-native';

function Switch({ payload, onChange }) {
  const [status, setStatus] = useState(false);

  function handleChange() {
    setStatus(state => {
      onChange(payload.name, !state);
      return !state;
    });

  }

  return (
    <TouchableWithoutFeedback onPress={handleChange}>
      <View style={{
        backgroundColor: '#16161a',
        margin: 10,
        padding: 20,
        flex: 1,
        borderRadius: 6,
        borderColor: palate.light.main,
        borderWidth: 1,
      }}>
        <Text style={{ textAlign: 'center' }}>{ payload.type }</Text>
        <View style={{
          alignItems: 'center',
          marginVertical: 10,
        }}>
          <ToggleSwitch
            animationSpeed={100}
            isOn={status}
            onColor={'#2cb67d'}
            offColor="#94a1b2"
            // label="Example label"
            labelStyle={{ color: 'black', fontWeight: '900' }}
            size="medium"
            onToggle={handleChange}
          />
        </View>
        <Text numberOfLines={1} lineBreakMode={'middle'}>{ payload.name }</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(Switch);
