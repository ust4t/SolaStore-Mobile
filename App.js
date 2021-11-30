import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { color } from './src/infrastructure/theme/color';
import MainNavigator from './src/ui/navigators/main.navigator';

const App = ({

}) => (
    <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={color.primary} />
        <MainNavigator />
    </ThemeProvider>

);

export default App;

