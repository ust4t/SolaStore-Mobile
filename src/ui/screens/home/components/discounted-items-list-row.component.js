import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { imageUrl, midImageUrl } from '../../../../util/constants';

const SupWrapper = styled(View)`
padding:${props => props.theme.space[1]};
`
const SubWrapper = styled(TouchableOpacity)`


borderRadius:${props => props.theme.radius[2]};
padding:${props => props.theme.space[1]};
alignItems:center;

`
const ProductImage = styled(Image)`
width:100px;
height:150px;
borderRadius:${props => props.theme.radius[2]};
`

const ProductDescriptionWrapper = styled(View)`

`

const PriceWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;

`
const ProductName = styled(Text)`
color:${props => props.theme.color.black};
fontWeight:bold;
`
const OriginalPriceText = styled(Text)`
color:${props => props.theme.color.primary};
fontWeight:bold;
`
const DiscountedPriceText = styled(Text)`
color:${props => props.theme.color.black};
fontSize:${props => props.theme.text.extraSmall};
textDecorationLine:line-through;
marginLeft:${props => props.theme.space[2]};
opacity:0.4;
`

const DiscWrapper = styled(View)`


position:absolute;
right:${props => props.theme.space[2]};
top:0px;
zIndex:99;
elevation:99;

`
const DiscWrapperTwo = styled(View)`
backgroundColor:${props => props.theme.color.orange};
padding:${props => props.theme.space[1]};

`

const DiscText = styled(Text)`
color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.extraSmall};
`

const Triangles = styled(View)`
borderTopColor:${props => props.theme.color.orange};
`



const DiscountedProductRow = ({
    item,
    index,
    goToProductDetail
}) => {
    const { productShortName, price, oldPrice, productID, pictures } = item
    return (
        <SupWrapper key={index}>

            <SubWrapper onPress={() => goToProductDetail(productID)}>
                <DiscWrapper >
                    <DiscWrapperTwo>
                        <DiscText>Disc</DiscText>
                        <DiscText style={{ fontWeight: 'bold' }}>
                            {(100 - (price / oldPrice) * 100).toFixed(0)} %
                        </DiscText>
                    </DiscWrapperTwo>

                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <Triangles style={{
                            width: 0,
                            height: 0,
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderRightWidth: 10,
                            borderTopWidth: 10,
                            borderRightColor: "transparent",

                        }}></Triangles>
                        <Triangles style={{
                            width: 0,
                            height: 0,
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderRightWidth: 10,
                            borderTopWidth: 10,
                            borderRightColor: "transparent",

                            transform: [{ rotate: "90deg" }]
                        }}></Triangles>
                    </View>

                </DiscWrapper>
                <ProductImage source={{ uri: pictures[0] ? midImageUrl + pictures[0].guidName : "" }} resizeMode="contain" />

                <ProductDescriptionWrapper>

                    <ProductName>{productShortName}</ProductName>

                    <PriceWrapper>
                        <OriginalPriceText>$ {price}</OriginalPriceText>
                        <DiscountedPriceText>$ {oldPrice}</DiscountedPriceText>
                    </PriceWrapper>

                </ProductDescriptionWrapper>

            </SubWrapper>

        </SupWrapper>
    );

}

export default React.memo(DiscountedProductRow);
