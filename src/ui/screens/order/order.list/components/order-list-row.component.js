import I18n from 'i18n-js';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(View)`
    backgroundColor:white;
    padding:${props => props.theme.space[2]};
    marginTop:${props => props.theme.space[2]};
`
const SubWrapper = styled(TouchableOpacity)`

`
const DescText = styled(Text)`
    fontWeight:bold;

`
const ValText = styled(Text)`
`
const OrderListRow = ({
    item,
    index,
    goToDetail
}) => {
    const { orderID, totalAmount, addingDate, salesRepresantID, paymentType } = item;
    return (
        <SupWrapper key={index}>
            <SubWrapper onPress={() => goToDetail(orderID,totalAmount)}>
                <ValText>
                    <DescText>{I18n.t("orderNo")}: </DescText>
                    {orderID}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("orderTotal")}: </DescText>
                    ${totalAmount}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("orderDate")}: </DescText>
                    {addingDate.substring(0, 10)}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("repId")}: </DescText>
                    {salesRepresantID}
                </ValText>
            </SubWrapper>
        </SupWrapper>
    );
}

export default React.memo(OrderListRow);
