import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { addIcon, removeIcon } from '../../../../../util/icons';
const Wrapper = styled(View)`
    flex:1;
    flexDirection:row;
    alignItems:center;
    justifyContent:space-around;
    
`
const ColorView = styled(View)`
    width:24px;
    height:24px;
    borderRadius:12px;
`
const ColorSelector = ({
    colors = ["#264653", "#e9c46a", "#e76f51", "#e63946"]
}) => (
    <Wrapper>
        {
            colors.map((item, index) => {
                return (
                    <ColorView style={{ backgroundColor: item }} key={index}>
                    </ColorView>
                )
            })
        }
        <ColorView />

    </Wrapper>
);

export default ColorSelector;
