// import at the very top of everything.
import App from '~/App.js';
import { Provider } from 'react-redux';
import { store } from '~/store';
import { SafeAreaView as SafeAreaViewIOS, Platform } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        {Platform.OS === 'ios' ? (
          <SafeAreaViewIOS style={{ flex: 1 }}>
            <App />
          </SafeAreaViewIOS>
        ) : (
          <SafeAreaViewAndroid style={{ flex: 1 }}>
            <App />
          </SafeAreaViewAndroid>
        )}
      </PaperProvider >
    </Provider>
  );
}

export default Main;
