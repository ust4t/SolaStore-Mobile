import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(View)`
padding:${props => props.theme.space[1]};
`
const SubWrapper = styled(View)`
backgroundColor:${props=>props.theme.color.gray};
padding:${props => props.theme.space[1]};
borderRadius:${props => props.theme.radius[2]};

`
const ProductImage = styled(Image)`
    width:100px;
    height:140px;
`

const ProductDescriptionWrapper = styled(View)`

`

const PriceWrapper = styled(View)`
    flexDirection:row;
`
const ProductName = styled(Text)`
color:${props => props.theme.color.black};
`
const OriginalPriceText = styled(Text)`
color:${props => props.theme.color.primary};
`
const DiscountedPriceText = styled(Text)`
color:${props => props.theme.color.black};
fontSize:${props => props.theme.text.extraSmall};
textDecorationLine:line-through;
`

const DiscWrapper = styled(View)`
backgroundColor:${props => props.theme.color.orange};
padding:${props => props.theme.space[1]};
position:absolute;
right:${props => props.theme.space[1]};
top:0px;
`

const DiscText = styled(Text)`
color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.extraSmall};
`



const DiscountedProductRow = ({
    item,
    index
}) => (
    <SupWrapper key={index}>

        <SubWrapper>
            <DiscWrapper>
                <DiscText>Disc</DiscText>
                <DiscText>50%</DiscText>
            </DiscWrapper>
            <ProductImage source={{ uri: item.productImageUri }} />

            <ProductDescriptionWrapper>

                <ProductName>{item.productName}</ProductName>

                <PriceWrapper>
                    <OriginalPriceText>{item.originalPrice}</OriginalPriceText>
                    <DiscountedPriceText>{item.discountedPrice}</DiscountedPriceText>
                </PriceWrapper>

            </ProductDescriptionWrapper>

        </SubWrapper>

    </SupWrapper>
);

export default React.memo(DiscountedProductRow);
