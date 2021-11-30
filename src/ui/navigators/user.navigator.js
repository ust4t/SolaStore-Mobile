import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import UserScreen from '../screens/user/screens/user.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
enableScreens(true);
const Stack = createNativeStackNavigator();



const UserNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="QrInfoScreen" component={UserScreen} />
    </Stack.Navigator>
);

export default UserNavigator;
