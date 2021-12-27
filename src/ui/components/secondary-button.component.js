import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

const Touchable = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.white};
    borderRadius:${props => props.theme.radius[4]};
    padding:${props=>props.theme.space[props.paddingCount]};
    justifyContent:center;
    alignItems:center;
    borderWidth:1px;
    borderColor:${props => props.theme.color.primary};
    flex:1;

`
const TouchableText = styled(Text)`
    color:${props => props.theme.color.black};
    fontWeight:bold;
`
const SecondaryButton = ({
    text="Tamam",action,paddingCount=2
}) => (
    <Touchable onPress={action} paddingCount={paddingCount}>
        <TouchableText>
            {text}
        </TouchableText>

    </Touchable>
);

export default React.memo(SecondaryButton);
