import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { arrowBack } from '../../util/icons';

const SupWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    backgroundColor:${props => props.theme.color.white};

`
const IconWrapper = styled(View)`
    width:50px;
    height:50px;
    justifyContent:center;
    alignItems:center;

`
const Label = styled(Text)`
    color:${props => props.theme.color.primary};
    fontWeight:bold;
    flex:1;
    textAlign:center;
`
const BackIconWrapper = styled(TouchableOpacity)`
    width:30px;
    height:30px;
    borderRadius:15px;
    backgroundColor:${props => props.theme.color.primary};
    justifyContent:center;
    alignItems:center;
`
const BackIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.white,
    size: 20
}))``
const ScreenHeader = ({
    title = "Page",
    goBack,

}) => (
    <SupWrapper >
        <IconWrapper>
            <BackIconWrapper onPress={goBack}>
                <BackIcon name={arrowBack} />
            </BackIconWrapper>
        </IconWrapper>
        <Label>{title}</Label>
        <IconWrapper></IconWrapper>
    </SupWrapper>
);

export default ScreenHeader;
