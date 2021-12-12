import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

const Touchable = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.error};
    borderRadius:${props => props.theme.radius[4]};
    padding:${props => props.theme.space[2]};
    justifyContent:center;
    alignItems:center;
    flex:1;
   

`
const TouchableText = styled(Text)`
    color:${props => props.theme.color.white};
    fontWeight:bold;
`
const ErrorButton = ({
    text = "Tamam", action
}) => (
    <Touchable onPress={action}>
        <TouchableText>
            {text}
        </TouchableText>

    </Touchable>
);

export default React.memo(ErrorButton);
