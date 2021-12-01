import React from 'react';
import { View ,Text} from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../../../components/primary-button.component';
import { SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';

const SupWrapper=styled(View)`
    backgroundColor:${props=>props.theme.color.white};
    padding:${props=>props.theme.space[2]};
    paddingLeft:${props=>props.theme.space[4]};
    paddingRight:${props=>props.theme.space[4]};
    position:absolute;
    bottom:0;
    width:100%;
`
const SubTotalWrapper=styled(View)`
    flexDirection:row;
    alignItems:center;
    justifyContent:space-between;
`
const SubTotalText=styled(Text)`
    color:${props=>props.theme.color.primary};
`
const SubTotalPriceText=styled(Text)`
color:${props=>props.theme.color.error};
fontWeight:bold;
fontSize:${props=>props.theme.text.h2};
`

const BasketFooter = ({
    subTotal="260$"
}) => (
    <SupWrapper>
        <SubTotalWrapper>
            <SubTotalText>
                SubTotal
            </SubTotalText>
            <SubTotalPriceText>
                {subTotal}
            </SubTotalPriceText>
        </SubTotalWrapper>
        <SeperatorFromTopOrBottom />
       <PrimaryButton text={"CHECK OUT"} action={()=>alert('Henüz atanmamış!')} />
    </SupWrapper>
);

export default React.memo(BasketFooter);
