import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserFavoriteListScreen from '../screens/user/user.favorites/screens/user-favorites.screen';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ProductList from '../screens/product/product.list/screens/product-list.screen';
import ProductVideoPlayer from '../screens/product/product.video/screens/product-video-player.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const FavoritesNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="UserFavoriteListScreen" component={UserFavoriteListScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{ headerShown: false }} name="ProductVideoPlayer" component={ProductVideoPlayer} />
       


    </Stack.Navigator>
);

export default FavoritesNavigator;
