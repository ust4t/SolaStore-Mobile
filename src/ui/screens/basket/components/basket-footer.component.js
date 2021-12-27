import I18n from 'i18n-js';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../../../components/primary-button.component';
import { ErrorText, SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';

const SupWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.white};
    padding:${props => props.theme.space[2]};
    paddingLeft:${props => props.theme.space[4]};
    paddingRight:${props => props.theme.space[4]};

    width:100%;
    bottom:0;
    position:${props => props.position}
    
`
const SubTotalWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    justifyContent:space-between;
`
const SubTotalText = styled(Text)`
    color:${props => props.theme.color.primary};
`
const SubTotalPriceText = styled(Text)`
color:${props => props.theme.color.error};
fontWeight:bold;
fontSize:${props => props.theme.text.h2};
`

const BasketFooter = ({
    totalPrice,
    action,
    label = I18n.t("$OdemeOdeme"),
    text = I18n.t("$AnaSayfaToplam"),
    position = "absolute"
}) => (
    <SupWrapper position={position}>
        <SubTotalWrapper>
            <SubTotalText>
                {text}
            </SubTotalText>
            <SubTotalPriceText>
                $ {totalPrice}
            </SubTotalPriceText>
        </SubTotalWrapper>
        <SeperatorFromTopOrBottom />
        <PrimaryButton text={label} action={action} />

        {
            position !== "absolute" &&
            <View style={{ width: "100%", alignItems: "center" }}>
                <ErrorText>
                    {I18n.t("$UyarilarGuvenMesaji")}
                </ErrorText>
            </View>

        }

    </SupWrapper>
);

export default React.memo(BasketFooter);
