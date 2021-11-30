import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ProductList from '../screens/product/product.list/screens/product-list.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const HomeNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="QrInfoScreen" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
    </Stack.Navigator>
);

export default HomeNavigator;
