import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

enableScreens(true);
const Stack = createNativeStackNavigator();



const HomeNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="QrInfoScreen" component={HomeScreen} />
    </Stack.Navigator>
);

export default HomeNavigator;
