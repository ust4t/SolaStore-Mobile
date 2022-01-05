import React, { useEffect } from 'react';
import { Platform, StatusBar, Text ,StyleSheet,SafeAreaView,View} from 'react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { color } from './src/infrastructure/theme/color';
import MainNavigator from './src/ui/navigators/main.navigator';
import { Provider } from 'mobx-react';
import indexStore from './src/infrastructure/stores/index.store';
import messaging from '@react-native-firebase/messaging';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor:color.primary }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={color.primary} {...props} />
      </SafeAreaView>
    </View>
  );

  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
const App = ({

}) => {
    // useEffect(async () => {
    //     await messaging().registerDeviceForRemoteMessages();
    //     await messaging().requestPermission();
    //     console.log(await messaging().getToken())
    // }, [])
   
    return (
        <ThemeProvider theme={theme}>
            <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />

            <Provider {...indexStore}>
                <MainNavigator />
            </Provider>

        </ThemeProvider>

    );
}

export default App;

