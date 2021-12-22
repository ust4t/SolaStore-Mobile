import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { trashIcon } from '../../../../util/icons';
import styled from 'styled-components';
import QuantitySelector from '../../product/product.detail/components/quantity-selector.component';
import { imageUrl, midImageUrl } from '../../../../util/constants';
import I18n from 'i18n-js';
const SupWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.white};
    padding:${props => props.theme.space[2]};
    marginTop:${props => props.theme.space[1]};
    marginBottom:${props => props.theme.space[1]};
`
const SubWrapper = styled(TouchableOpacity)`
    flexDirection:row;
    marginTop:${props => props.theme.space[2]};
`
const ItemImage = styled(Image)`
width:100px;
height:150px;
borderRadius:${props => props.theme.radius[2]};
   
`
const ItemDescriptionWrapper = styled(View)`
marginLeft:${props => props.theme.space[1]};
justifyContent:space-around;

`
const ItemName = styled(Text)`
color:${props => props.theme.color.primary};
`
const Price = styled(Text)`
color:${props => props.theme.color.primary};
fontSize:${props => props.theme.text.subtitle};
fontWeight:bold;
`

const VariationText = styled(Text)`
fontSize:${props => props.theme.text.extraSmall};
`

const Footer = styled(View)`
    width:100%;
    flexDirection:row;
    padding:${props => props.theme.space[2]};
    alignItems:center;
    
`
const QuantitySelectorWrapper = styled(View)`
flex:1;

`
const SubTotalWrapper = styled(View)`
flex:1;
    flexDirection:row;
    justifyContent:space-between;
`
const SubTotalText = styled(Text)`
color:${props => props.theme.color.error};
fontWeight:bold;
`

const Header = styled(View)`
    width:100%;
    alignItems:flex-end;
    
`
const RemoveTouchable = styled(TouchableOpacity)`
paddingLeft:${props => props.theme.space[3]};
paddingRight:${props => props.theme.space[3]};
`
const RemoveIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.error,
    size: 20,
    name: trashIcon
}))`

`
const BasketItem = ({
    item,
    index,
    showPermissionModal,
    increase,
    decrease,
    goToProductDetail
}) => {
    const { productShortName, price, currency, quantity, pictureOneGuidName, productID } = item;
    return (
        <SupWrapper key={index} >
            <Header >
                <RemoveTouchable onPress={() => showPermissionModal(productID)}>
                    <RemoveIcon />
                </RemoveTouchable>

            </Header>
            <SubWrapper onPress={() => goToProductDetail(productID)}>
                <ItemImage source={{ uri: midImageUrl + pictureOneGuidName }} resizeMode="contain" />
                <ItemDescriptionWrapper>
                    <ItemName>{productShortName}</ItemName>
                    {/* <VariationText>Color:Dark Grey</VariationText>
                    <VariationText>Size : L</VariationText> */}
                    <Price>{`${currency} ${price}`}</Price>
                </ItemDescriptionWrapper>


            </SubWrapper>

            <Footer>
                <QuantitySelectorWrapper>
                    <QuantitySelector
                        count={quantity}
                        increase={() => increase(productID)}
                        decrease={() => decrease(productID)} />
                </QuantitySelectorWrapper>

                <SubTotalWrapper>
                    <ItemName>{I18n.t("$SiparisTutar")} :     </ItemName>
                    <SubTotalText>$ {`${price * quantity} ${currency}`}</SubTotalText>
                </SubTotalWrapper>
            </Footer>
        </SupWrapper>
    );
}

export default React.memo(BasketItem);
