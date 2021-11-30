import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationList from '../screens/notification/notification.list/screens/notification-list.screen';
import BasketScreen from '../screens/basket/screens/basket.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const BasketNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="BasketScreen" component={BasketScreen} />
    </Stack.Navigator>
);

export default BasketNavigator;
