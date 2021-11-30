import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationList from '../screens/notification/notification.list/screens/notification-list.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const NotificationNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="NotificationList" component={NotificationList} />
    </Stack.Navigator>
);

export default NotificationNavigator;
