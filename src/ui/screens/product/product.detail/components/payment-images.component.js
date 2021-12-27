import React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import { SeperatorFromTopOrBottom,Line } from '../../../../components/shared-styled.components';

const SupWrapper = styled(View)`
width:100%;

`
const SubWrapper = styled(View)`
width:100%;
    flexDirection:row;
    justifyContent:space-around;
`
const PaymentImage = styled(Image)`
    width:50px;
    heigth:25px;
`


const PaymentImages = ({

}) => (
    <SupWrapper>
        <SeperatorFromTopOrBottom />
        <SeperatorFromTopOrBottom />
        <SeperatorFromTopOrBottom />
        <SeperatorFromTopOrBottom />
        <Line></Line>
        <SubWrapper>
            <PaymentImage resizeMode="contain" source={require("../../../../../../assets/medias/1.jpg")} />
            <PaymentImage resizeMode="contain" source={require("../../../../../../assets/medias/2.jpg")} />
            <PaymentImage resizeMode="contain" source={require("../../../../../../assets/medias/3.jpg")} />
            <PaymentImage resizeMode="contain" source={require("../../../../../../assets/medias/4.jpg")} />
            <PaymentImage resizeMode="contain" source={require("../../../../../../assets/medias/5.jpg")} />
            <PaymentImage resizeMode="contain" source={require("../../../../../../assets/medias/6.jpg")} />
        </SubWrapper>

    </SupWrapper>
);

export default React.memo(PaymentImages);
