import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

const Touchable = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.primary};
    borderRadius:${props => props.theme.radius[4]};
    padding:${props=>props.theme.space[3]};
    justifyContent:center;
    alignItems:center;

`
const TouchableText = styled(Text)`
    color:${props => props.theme.color.white};
    fontWeight:bold;
`
const PrimaryButton = ({
    text="Tamam",action
}) => (
    <Touchable onPress={action}>
        <TouchableText>
            {text}
        </TouchableText>

    </Touchable>
);

export default PrimaryButton;
