import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeNavigator from './home.navigator';
import UserNavigator from './user.navigator';
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

enableScreens(true);
const Tab = createBottomTabNavigator();
const hideBottomList = [];



class MainNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName = "md-home";

                            if (route.name === 'homeNavigator') {
                                iconName = "md-home"
                            } else if (route.name === 'userNavigator') {
                                iconName = "md-person"
                            }
                            // else if (route.name === 'InfoContainer') {
                            //     iconName = "md-information-circle-outline"
                            // }
                            // else if (route.name === 'TransactionContainer') {
                            //     iconName = transactionIcon
                            // }

                            // if (focused) {
                            //     return <Icon name={iconName} size={size + 5} color={color} />;
                            // }
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        headerShown: false,
                        tabBarStyle: {
                            borderTopColor: 'rgba(0, 0, 0, .2)',
                        },
                        // tabBarInactiveTintColor: 'red',
                        // tabBarActiveTintColor: colors.bg.primary,
                        tabBarShowLabel: false
                    })}>
                    <Tab.Screen name="homeNavigator" component={HomeNavigator} />
                    <Tab.Screen name="userNavigator" component={UserNavigator} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

export default MainNavigator;
