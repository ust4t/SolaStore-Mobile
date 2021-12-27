import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import styled from 'styled-components';
import { SafeArea } from '../../../components/shared-styled.components';
const deviceWidth = Dimensions.get('window').width;
const SliderView = styled(View)`
width:${props => deviceWidth}px;
padding:${props => props.theme.space[2]};
`
const FirstPage = ({

}) => (
    <SliderView >
        <Text>
            Buralarda kullanmak üzere resim bulabilir miyiz?
       </Text>
    </SliderView>
);

export default React.memo(FirstPage);
