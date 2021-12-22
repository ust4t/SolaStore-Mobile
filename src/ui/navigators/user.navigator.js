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
import UserFavoriteListScreen from '../screens/user/user.favorites/screens/user-favorites.screen';
import OrderListScreen from '../screens/order/order.list/screens/order-list.screen';
import ProfileScreen from '../screens/user/user.profile/screens/profile.screen';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ContactScreen from '../screens/contact/contact.screen';
import SettingScreen from '../screens/settings/screens/setting.screen';
import OrderDetail from '../screens/order/order.detail/screens/order-detail.screen';
import NewPasswordScreen from '../screens/user/user.new-password/screens/new-password.screen';
import UserMenu from '../screens/user/user.menu/screens/user-menu.screen';
enableScreens(true);
const Stack = createNativeStackNavigator();


const UserNavigator = inject("UserStore")(observer(({
    UserStore
}) => {
    return (
        <Stack.Navigator>
            {
                UserStore.userID ?
                    <>
                        <Stack.Screen options={{ headerShown: false }} name="QrInfoScreen" component={UserScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="UserFavoriteListScreen" component={UserFavoriteListScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="OrderListScreen" component={OrderListScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
                        <Stack.Screen options={{ headerShown: false }} name="ContactScreen" component={ContactScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="SettingScreen" component={SettingScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="OrderDetail" component={OrderDetail} />
                        <Stack.Screen options={{ headerShown: false }} name="NewPasswordScreen" component={NewPasswordScreen} />
                    </>
                    :
                    <>
                     
                        <Stack.Screen options={{ headerShown: false }} name="UserMenu" component={UserMenu} />
                        <Stack.Screen options={{ headerShown: false }} name="UserFavoriteListScreen" component={UserFavoriteListScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="UserLogin" component={UserLogin} />
                        <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="ContactScreen" component={ContactScreen} />
                        <Stack.Screen options={{ headerShown: false }} name="SettingScreen" component={SettingScreen} />
                    </>
            }

        </Stack.Navigator>
    )
}))



export default UserNavigator;
