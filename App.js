import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { color } from './src/infrastructure/theme/color';
import MainNavigator from './src/ui/navigators/main.navigator';
import { Provider } from 'mobx-react';
import indexStore from './src/infrastructure/stores/index.store';
const App = ({

}) => (
    <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={color.primary} />
        <Provider {...indexStore}>
            <MainNavigator />
        </Provider>

    </ThemeProvider>

);

export default App;

