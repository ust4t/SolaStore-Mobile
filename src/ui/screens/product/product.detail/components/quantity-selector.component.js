import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { addIcon, removeIcon } from '../../../../../util/icons';
const Wrapper = styled(View)`
    flex:1;
    flexDirection:row;
    alignItems:center;
    justifyContent:space-around;

`
const IconWrapper = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.lightGray};
    padding:${props=>props.theme.space[1]};

`
const CountWrapper = styled(View)`
backgroundColor:${props => props.theme.color.lightGray};
paddingLeft:${props=>props.theme.space[3]};
paddingRight:${props=>props.theme.space[3]};
`
const CountText = styled(Text)`
padding:${props=>props.theme.space[1]};

`

const CounterIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.primary,
    size: 20
}))`
`

const Br=styled(View)`
backgroundColor:${props => props.theme.color.lightGray};
padding:${props=>props.theme.space[2]};
`
const QuantitySelector = ({
    count = 1
}) => (
    <Wrapper >
  
        <IconWrapper onPress={()=>alert("Atanmamış!")}>
            <CounterIcon name={addIcon} />
        </IconWrapper>
        <CountWrapper>
            <CountText>
                {count}
            </CountText>

        </CountWrapper>
        <IconWrapper onPress={()=>alert("Atanmamış!")}>
            <CounterIcon name={removeIcon} />
        </IconWrapper>
    </Wrapper>
);

export default QuantitySelector;
