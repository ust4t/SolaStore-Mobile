import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components';

const Touchable = styled(TouchableOpacity)`
  background-color: ${props => props.theme.color.error};
  border-radius: ${props => props.theme.radius[4]};
  padding: ${props => props.theme.space[2]};
  justify-content: center;
  align-items: center;
`;

const TouchableText = styled(Text)`
  color: ${props => props.theme.color.white};
  font-weight: bold;
`;

const ErrorButton = ({text = 'Tamam', action, flex = '1'}) => (
  <Touchable
    onPress={action}
    style={{
      flex: flex == '1' ? 1 : 0,
    }}>
    <TouchableText numberOfLines={1} ellipsizeMode="tail">
      {text}
    </TouchableText>
  </Touchable>
);

export default React.memo(ErrorButton);
