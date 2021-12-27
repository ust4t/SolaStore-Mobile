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
        <SupWrapper key={index} style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1,
        }}>
            <SubWrapper>
                <ValText>
                    <DescText>{I18n.t("$SiparisSiparisNo")}: </DescText>
                    {orderID}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("$SiparisUrunAdi")}: </DescText>
                    {productName}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("$SiparisTutar")}: </DescText>
                    ${price}
                </ValText>
                <ValText>
                    <DescText>{I18n.t("$SiparisAdet")}: </DescText>
                    {quantity}
                </ValText>
            </SubWrapper>
        </SupWrapper>
    )
}

export default React.memo(OrderDetailItem);
