import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(TouchableOpacity)`

`
const HeaderText = styled(Text)`
    borderWidth:${props => props.selectedRepId == -1 ? "1px" : 0};
    borderColor:${props=>props.theme.color.primary};
    textAlign:center;

`


const SalesRepHeader = ({
    action,
    selectedRepId
}) => (
    <SupWrapper onPress={() => action(-1)}>
        <HeaderText selectedRepId={selectedRepId}>
            İlk siparişim Satış temsilcim yok
            </HeaderText>
    </SupWrapper>
);

export default React.memo(SalesRepHeader);
