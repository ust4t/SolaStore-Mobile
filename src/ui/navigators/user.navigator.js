import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import UserScreen from '../screens/user/screens/user.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLocalObservable } from 'mobx-react-lite';
import userStore from '../../infrastructure/stores/user.store';
import UserLogin from '../screens/login/screens/user-login.screen';
import { inject, observer } from 'mobx-react';
import RegisterScreen from '../screens/register/screens/register.screen';
enableScreens(true);
const Stack = createNativeStackNavigator();


const UserNavigator = inject("UserStore")(observer(({
    UserStore
}) => {
    return (
        <Stack.Navigator>
            {
                UserStore.isLogined ?
                    <Stack.Screen options={{ headerShown: false }} name="QrInfoScreen" component={UserScreen} /> :
                    <>
                        <Stack.Screen options={{ headerShown: false }} name="UserLogin" component={UserLogin} />
                        <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
                    </>
            }

        </Stack.Navigator>
    )
}))



export default UserNavigator;
