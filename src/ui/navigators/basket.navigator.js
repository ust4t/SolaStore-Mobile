import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/home/screens/home.screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationList from '../screens/notification/notification.list/screens/notification-list.screen';
import BasketScreen from '../screens/basket/screens/basket.screen';
import CheckoutScreen from '../screens/checkout/screens/checkout.screen';
import ProductDetail from '../screens/product/product.detail/screens/product-detail.screen';
import PaymentCC from '../screens/payment/payment.cc/screens/payment-cc.screen';

enableScreens(true);
const Stack = createNativeStackNavigator();



const BasketNavigator = ({

}) => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="BasketScreen" component={BasketScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{ headerShown: false }} name="PaymentCC" component={PaymentCC} />
    </Stack.Navigator>
);

export default BasketNavigator;
