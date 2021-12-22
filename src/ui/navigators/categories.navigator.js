import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesListScreen from '../screens/categories/categories.list/screens/categories-list.screen';
import SubCategories from '../screens/categories/categories.sub/sub-categories-list.screen';
import ProductList from '../screens/product/product.list/screens/product-list.screen';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import ProductVideoPlayer from '../screens/product/product.video/screens/product-video-player.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const CategoriesNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="CategoriesListScreen" component={CategoriesListScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SubCategories" component={SubCategories} />
        <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
         <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
         <Stack.Screen options={{ headerShown: false }} name="ProductVideoPlayer" component={ProductVideoPlayer} />
        
        
    </Stack.Navigator>
);

export default CategoriesNavigator;
