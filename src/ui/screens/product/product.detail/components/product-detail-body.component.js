import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import QuantitySelector from './quantity-selector.component';
import ColorSelector from './color-selector.component';
import PrimaryButton from '../../../../components/primary-button.component';
import { useState } from 'react/cjs/react.production.min';
import { SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';
import ProductVariation from './product-variation.component';
import I18n from 'i18n-js';

const SupWrapper = styled(View)`
 
    padding:${props => props.theme.space[3]};
    borderTopLeftRadius:${props => props.theme.radius[4]};
    borderTopRightRadius:${props => props.theme.radius[4]};
    backgroundColor:${props => props.theme.color.white};
    flex:1;
    paddingBottom:200px;
`
const HeaderWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    justifyContent:space-between;

`
const NameAndStarWrapper = styled(View)`
`
const Name = styled(Text)`
color:${props => props.theme.color.tertiary};
fontWeight:bold;
fontSize:${props => props.theme.text.h2};
`
const Price = styled(Text)`
color:${props => props.theme.color.primary};
fontWeight:bold;
fontSize:${props => props.theme.text.h2};

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
    marginTop:${props => props.theme.space[1]};
`
const StarCount = styled(Text)`
    fontSize:${props => props.theme.text.extraSmall};
    marginLeft:${props => props.theme.space[1]};
`

const StarIcon = styled(Icon).attrs(props => (
    {
        color: props.theme.color.orange,
        size: 15,
        name: "md-star"
    }
))``

const VariationItemWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    marginTop:${props => props.theme.space[2]};
`

const VariationName = styled(Text)`
    flex:1;
    color:${props => props.theme.color.tertiary};
`

const Description = styled(Text)`
color:${props => props.theme.color.primary};
`




const ProductDetailBody = ({
    name, price, description, variations, onVariationSelected, count, decrease, increase,
    sizes, oldPrice
}) => {


    return (
        <SupWrapper >
            <HeaderWrapper>
                <NameAndStarWrapper>
                    <Name>
                        {name}
                    </Name>
                    {/* <IconWrapper>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarCount>4.5</StarCount>

                    </IconWrapper> */}
                </NameAndStarWrapper>
                <PriceWrapper>
                    <Price>
                        ${price}
                    </Price>
                    {oldPrice != 0 &&
                        <DiscountedPriceText>{oldPrice}</DiscountedPriceText>}
                </PriceWrapper>


            </HeaderWrapper>
            <VariationItemWrapper>

                <VariationName>
                    {I18n.t("$SiparisAdet")} :
                </VariationName>
                <QuantitySelector
                    count={count}
                    increase={increase}
                    decrease={decrease} />
            </VariationItemWrapper>

            <VariationItemWrapper>

                <VariationName>
                    {I18n.t("$KategoriBeden")} :
                </VariationName>
                <Description>
                    {sizes}
                </Description>
            </VariationItemWrapper>


            <VariationItemWrapper>

                <VariationName>
                    {I18n.t("$UrunlerRenkSecenekleri")} :
                </VariationName>

                {/* <ColorSelector /> */}
            </VariationItemWrapper>

            <FlatList
                horizontal={true}
                data={variations}
                renderItem={({ item, index }) => <ProductVariation item={item} index={index} action={onVariationSelected} />}
            />

            <VariationItemWrapper>

                <VariationName>
                    {I18n.t("$UrunlerAciklama")} :
</VariationName>

            </VariationItemWrapper>
            <SeperatorFromTopOrBottom />
            <Description>
                {description}
            </Description>










        </SupWrapper>
    );
}

export default React.memo(ProductDetailBody);
