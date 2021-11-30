import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
class BasketScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeArea>
                <Text> basket.screen </Text>
            </SafeArea>
        );
    }
}

export default BasketScreen;
