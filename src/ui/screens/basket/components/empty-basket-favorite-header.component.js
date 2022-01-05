import I18n from 'i18n-js';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../../../components/primary-button.component';
import { SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import Icon from 'react-native-vector-icons/Ionicons'
import { basketIcon } from '../../../../util/icons';

const Supwrapper = styled(View)`
    padding:${props => props.theme.space[2]};
    paddingBottom:${props => props.theme.space[0]};
    alignItems:center;
    justifyContent:center;
`
const Label = styled(Text)`

`
const IconWrapper = styled(View)`
    width:100px;
    height:100px;
    borderRadius:50px;
    backgroundColor:${props => props.theme.color.white};
    alignItems:center;
    justifyContent:center;
`
const BIcon = styled(Icon).attrs(props => ({
    name: basketIcon,
    size: 50
}))``
const TitleWrapper = styled(View)`
    width:100%;
    backgroundColor:${props => props.theme.color.white};
`

const Title = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props => props.theme.text.h2};
    paddingLeft:${props => props.theme.space[3]};
    fontWeight:bold;
    
`
const EmptyBasketHeader = ({
    goBack,
    totalFavoritesCount
}) => (
    <Supwrapper>
         <SeperatorFromTopOrBottom />
         <SeperatorFromTopOrBottom />
         <SeperatorFromTopOrBottom />
        <IconWrapper>
            <BIcon />
        </IconWrapper>
        <SeperatorFromTopOrBottom />
        <Label>
            {I18n.t("$CartSepetBos")}
        </Label>
        <SeperatorFromTopOrBottom />

        <PrimaryButton text={I18n.t("$SiparisAlisveriseDevamEt")} action={goBack} flexOrWidth={2} />
        <SeperatorFromTopOrBottom />
        <SeperatorFromTopOrBottom />
        <SeperatorFromTopOrBottom />

        {totalFavoritesCount != 0 &&
            <Title
                style={{
                    textShadowColor: "gray",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 2
                }}
            > {I18n.t("$AnaSayfaFavorilerim")}</Title>
        }



    </Supwrapper>
);

export default React.memo(EmptyBasketHeader);
