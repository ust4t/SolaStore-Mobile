import I18n from 'i18n-js';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { imageUrl } from '../../../../util/constants';
import SecondaryButton from '../../../components/secondary-button.component';

const SupWrapper = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.white};
    padding:${props => props.theme.space[1]};
    marginTop:${props => props.theme.space[1]};
    flexDirection:row;
    
`
const SubWrapper = styled(View)`
    marginTop:${props => props.theme.space[1]};
    flex:1;
    
    
`
const ItemImage = styled(Image)`
    width:60px;
    height:90px;
    borderRadius:${props => props.theme.radius[1]};
  
`
const ItemDescriptionWrapper = styled(View)`
marginLeft:${props => props.theme.space[1]};
justifyContent:space-between;

`
const ItemName = styled(Text)`
color:${props => props.theme.color.primary};
`

const RowBottom = styled(View)`
    flexDirection:row;
    alignItems:center;

`
const BottomLeft = styled(View)`
    flex:1;
    flexDirection:row;
alignItems:center;
marginLeft:${props => props.theme.space[1]};

`

const PriceText = styled(Text)`
color:${props => props.theme.color.primary};
fontWeight:bold;
fontSize:${props => props.theme.text.subtitle};
`
const OldPriceText = styled(Text)`
color:${props => props.theme.color.black};
fontSize:${props => props.theme.text.small};
textDecorationLine:line-through;
marginLeft:${props => props.theme.space[1]};
opacity:0.4;

`





const EmptyBasketFavoriteRow = ({
    item,
    index,
    addToBasket,
    goToProductDetail
}) => {
    const { productShortName, picture_1, oldPrice, price, productID, masterProductID } = item;
    return (
        <SupWrapper key={index} onPress={() => goToProductDetail(
            masterProductID ? masterProductID : productID,
            productID
        )}>
            <ItemImage source={{ uri: `${imageUrl}${picture_1}` }} resizeMode="contain" />
            <SubWrapper style={{ justifyContent: "space-around" }}>

                <ItemDescriptionWrapper>
                    <ItemName>{productShortName}</ItemName>
                    {/* <VariationText>Color:Dark Grey</VariationText>
                    <VariationText>Size : L</VariationText> */}


                </ItemDescriptionWrapper>

                <RowBottom>
                    <BottomLeft>

                        <PriceText>${price}</PriceText>
                        {
                            oldPrice != 0 &&
                            <OldPriceText>
                                {oldPrice}
                            </OldPriceText>
                        }

                    </BottomLeft>

                    <SecondaryButton text={I18n.t("$AnaSayfasepeteekle")} action={() => addToBasket(productID)} paddingCount={1} />
                </RowBottom>






            </SubWrapper>




        </SupWrapper>
    );
}

export default EmptyBasketFavoriteRow;
