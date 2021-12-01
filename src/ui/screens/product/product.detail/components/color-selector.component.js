import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { addIcon, removeIcon } from '../../../../../util/icons';
const Wrapper = styled(View)`
    flex:1;
    flexDirection:row;
    
   
    
`
const ColorView = styled(TouchableOpacity)`
    width:28px;
    height:28px;
    borderRadius:14px;
`
const ColorSelector = ({
    colors = ["#264653", "#e9c46a", "#e76f51", "#e63946"]
}) => (
    <Wrapper style={{justifyContent:"space-around"}}>
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
