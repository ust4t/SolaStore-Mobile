import React, { useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { color } from './src/infrastructure/theme/color';
import MainNavigator from './src/ui/navigators/main.navigator';
import { Provider } from 'mobx-react';
import indexStore from './src/infrastructure/stores/index.store';
import messaging from '@react-native-firebase/messaging';
const App = ({

}) => {
    // useEffect(async () => {
    //     await messaging().registerDeviceForRemoteMessages();
    //     await messaging().requestPermission();
    //     console.log(await messaging().getToken())
    // }, [])
    return (
        <ThemeProvider theme={theme}>
            <StatusBar backgroundColor={color.primary} />

            <Provider {...indexStore}>
                <MainNavigator />
            </Provider>

        </ThemeProvider>

    );
}

export default App;

