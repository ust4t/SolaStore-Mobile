import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ProductList from '../screens/product/product.list/screens/product-list.screen';
import SearchScreen from '../screens/search/screens/search.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const SearchNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="SearchScreen" component={SearchScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />

    </Stack.Navigator>
);

export default SearchNavigator;
