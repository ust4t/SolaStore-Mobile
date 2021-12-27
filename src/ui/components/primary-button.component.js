import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

const TouchableFlex = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.primary};
    borderRadius:${props => props.theme.radius[4]};
    padding:${props => props.theme.space[props.paddingCount]};
    justifyContent:center;
    alignItems:center;
    flex:1;

`
const TouchableWidth = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.primary};
    borderRadius:${props => props.theme.radius[4]};
    padding:${props => props.theme.space[props.paddingCount]};
    justifyContent:center;
    alignItems:center;
    width:100%;

`
const TouchableText = styled(Text)`
    color:${props => props.theme.color.white};
    fontWeight:bold;
`
const PrimaryButton = ({
    text = "Tamam", action, paddingCount = 3, flexOrWidth = 1
}) => (
    <>
        {flexOrWidth == 1 ?
            <TouchableFlex onPress={action} paddingCount={paddingCount}>
                <TouchableText>
                    {text}
                </TouchableText>

            </TouchableFlex> :
            <TouchableWidth onPress={action} paddingCount={paddingCount}>
                <TouchableText>
                    {text}
                </TouchableText>

            </TouchableWidth>
        }
    </>

);

export default PrimaryButton;
