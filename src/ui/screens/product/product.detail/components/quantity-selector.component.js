import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { addIcon, removeIcon } from '../../../../../util/icons';
import { SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
const Wrapper = styled(View)`
    flex:1;
    flexDirection:row;
    alignItems:center;
    

`
const IconWrapper = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.lightGray};
    padding:${props => props.theme.space[1]};

`
const CountWrapper = styled(View)`
backgroundColor:${props => props.theme.color.lightGray};
paddingLeft:${props => props.theme.space[3]};
paddingRight:${props => props.theme.space[3]};
`
const CountText = styled(Text)`
padding:${props => props.theme.space[1]};

`

const CounterIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.primary,
    size: 20
}))`
`

const Br = styled(View)`
backgroundColor:${props => props.theme.color.lightGray};
padding:${props => props.theme.space[2]};
`
const QuantitySelector = ({
    count = 1,
    increase,
    decrease
}) => (
    <Wrapper >
        <IconWrapper onPress={decrease}>
            <CounterIcon name={removeIcon} />
        </IconWrapper>

        <SeperatorFromRightOrLeft />
        <CountWrapper>
            <CountText>
                {count}
            </CountText>

        </CountWrapper>
        <SeperatorFromRightOrLeft />
        <IconWrapper onPress={increase}>
            <CounterIcon name={addIcon} />
        </IconWrapper>

    </Wrapper>
);

export default QuantitySelector;
