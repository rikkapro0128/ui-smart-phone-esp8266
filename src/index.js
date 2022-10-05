// import at the very top of everything.
import App from '~/App.js';
import { Provider } from 'react-redux';
import { store } from '~/store';
import { SafeAreaView as SafeAreaViewIOS, Platform } from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';

function Main() {
  return (
    <Provider store={store}>
      {Platform.OS === 'ios' ? (
        <SafeAreaViewIOS style={{ flex: 1 }}>
          <App />
        </SafeAreaViewIOS>
      ) : (
        <SafeAreaViewAndroid style={{ flex: 1 }}>
          <App />
        </SafeAreaViewAndroid>
      )}
    </Provider>
  );
}

export default Main;
