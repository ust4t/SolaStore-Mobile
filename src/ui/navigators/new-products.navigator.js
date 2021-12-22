import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/product/product.list/screens/product-list.screen';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ProductVideoPlayer from '../screens/product/product.video/screens/product-video-player.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const NewProductNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
        <Stack.Screen options={{ headerShown: false }} name="ProductListSearch" component={ProductList} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{ headerShown: false }} name="ProductVideoPlayer" component={ProductVideoPlayer} />
    </Stack.Navigator>
);

export default NewProductNavigator;
