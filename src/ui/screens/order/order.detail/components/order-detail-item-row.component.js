import I18n from 'i18n-js';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(View)`
    backgroundColor:white;
    padding:${props => props.theme.space[2]};
    marginTop:${props => props.theme.space[2]};
`
const SubWrapper = styled(View)`

`
const DescText = styled(Text)`
    fontWeight:bold;

`
const ValText = styled(Text)`
`

const OrderDetailItem = ({
    item,
    index
}) => {
    const { orderID, quantity, price, productName } = item

    return (
        <SupWrapper key={index}>
            <SubWrapper>
                <ValText>
                    <DescText>{I18n.t("orderNo")}: </DescText>
                    {orderID}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("product")}: </DescText>
                    {productName}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("price")}: </DescText>
                    ${price}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("quantity")}: </DescText>
                    {quantity}
                </ValText>
            </SubWrapper>
        </SupWrapper>
    )
}

export default React.memo(OrderDetailItem);
