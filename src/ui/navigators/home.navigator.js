import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ProductList from '../screens/product/product.list/screens/product-list.screen';
import ProductVideoPlayer from '../screens/product/product.video/screens/product-video-player.screen';
import UserFavoriteListScreen from '../screens/user/user.favorites/screens/user-favorites.screen';
import ContactScreen from '../screens/contact/contact.screen';
import SettingScreen from '../screens/settings/screens/setting.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const HomeNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="QrInfoScreen" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
        <Stack.Screen options={{ headerShown: false }} name="ProductVideoPlayer" component={ProductVideoPlayer} />

        <Stack.Screen options={{ headerShown: false }} name="UserFavoriteListScreen" component={UserFavoriteListScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ContactScreen" component={ContactScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
);

export default HomeNavigator;
