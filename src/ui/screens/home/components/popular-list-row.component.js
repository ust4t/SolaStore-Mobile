import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { imageUrl, midImageUrl } from '../../../../util/constants';
import { SeperatorFromRightOrLeft } from '../../../components/shared-styled.components';
const SupWrapper = styled(View)`
    padding:${props => props.theme.space[1]};
`
const SubWrapper = styled(TouchableOpacity)`
    flexDirection:row;
    alignItems:center;
    borderRadius:${props => props.theme.radius[2]};
`
const Wrapper = styled(View)`
padding:${props => props.theme.space[1]};
`
const ProductImage = styled(Image)`
    width:100px;
    height:150px;
    borderRadius:${props => props.theme.radius[2]};
    
`
const ProductPrice = styled(Text)`

color:${props => props.theme.color.primary};
fontWeight:bold;
fontSize:${props => props.theme.text.subtitle};
`
const ProductName = styled(Text)`
color:${props => props.theme.color.black};
fontWeight:bold;
`
const DiscountedPriceText = styled(Text)`
color:${props => props.theme.color.black};
fontSize:${props => props.theme.text.extraSmall};
textDecorationLine:line-through;
marginLeft:${props => props.theme.space[1]};
opacity:0.4;
`
const PriceWrapper = styled(View)`
flexDirection:row;
alignItems:center;
justifyContent:center;
`

const IconWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
`
const StarCount = styled(Text)`
    fontSize:${props => props.theme.text.extraSmall};
    marginLeft:${props => props.theme.space[1]};
`

const StarIcon = styled(Icon).attrs(props => (
    {
        color: props.theme.color.orange,
        size: 20,
        name: "md-star"
    }
))`

`
const PopularProductRow = ({
    item,
    index,
    goToProductDetail
}) => {
    const { productShortName, price, oldPrice, productID, pictures } = item
    console.log(imageUrl + pictures[0])
    return (
        <SupWrapper key={index}>
            <SubWrapper onPress={() => goToProductDetail(productID)}>
                <ProductImage source={{ uri: pictures[0] ? midImageUrl + pictures[0].guidName : "" }} resizeMode="contain" />

                <Wrapper>
                    <ProductName>{productShortName}</ProductName>
                    <SeperatorFromRightOrLeft />


                    <PriceWrapper>
                        <ProductPrice>$ {price}</ProductPrice>
                        {oldPrice != 0 &&
                            <DiscountedPriceText>{oldPrice}</DiscountedPriceText>}
                    </PriceWrapper>

                    {/* <IconWrapper>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarCount>4.5</StarCount>

                    </IconWrapper> */}
                </Wrapper>

            </SubWrapper>
        </SupWrapper>
    );
}

export default PopularProductRow;
