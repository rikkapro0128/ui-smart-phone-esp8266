import { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Switch from '~/components/Widget/switch.js';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const AppInstance = initializeApp({
  databaseURL: 'https://dbtest-73c5f-default-rtdb.firebaseio.com',
}, 'AppDatabase');

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(AppInstance);

function Demo() {

  const [switchs, setSwitchs] = useState(
    [
      {
        name: 'Chuồng gà',
        type: 'Công tắc',
        state: false,
      },
      {
        name: 'Chuồng heo',
        type: 'Công tắc',
        state: false,
      },
      {
        name: 'Vườn nho',
        type: 'Công tắc',
        state: false,
      },
    ]
  );

  function changeSwicth(type, state) {
    if (type === 'Chuồng gà') {
      set(ref(db, '(17d28c)btn1/OnOff/on'), state);
    } else if (type === 'Chuồng heo') {
      set(ref(db, '(17d28c)btn2/OnOff/on'), state);
    } else if (type === 'Vườn nho') {
      set(ref(db, '(17d28c)btn3/OnOff/on'), state);
    }
  }

  return (
    <View style={{
      padding: 20,
      flexDirection: 'row',
    }}>
      {
        switchs.map(payload => (
          <Switch key={payload.name} onChange={changeSwicth} payload={payload} />
        ))
      }
    </View>
  );
}

export default memo(Demo);
