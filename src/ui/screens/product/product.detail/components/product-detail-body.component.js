import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import QuantitySelector from './quantity-selector.component';
import ColorSelector from './color-selector.component';
import PrimaryButton from '../../../../components/primary-button.component';
import { useState } from 'react/cjs/react.production.min';

const SupWrapper = styled(View)`
 
    padding:${props => props.theme.space[3]};
    borderTopLeftRadius:${props => props.theme.radius[2]};
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
color:${props => props.theme.color.primary};
fontWeight:bold;
`
const Price = styled(Text)`
color:${props => props.theme.color.primary};
fontWeight:bold;
fontSize:${props => props.theme.text.h2};
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
    color:${props => props.theme.color.primary};
`

const Description = styled(Text)`
color:${props => props.theme.color.primary};
`




const ProductDetailBody = ({
    product = { name: "Orange Summer", price: "$97" }
}) => {
    const { name, price } = product;
   
    return (
        <SupWrapper >
            <HeaderWrapper>
                <NameAndStarWrapper>
                    <Name>
                        {name}
                    </Name>
                    <IconWrapper>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarCount>4.5</StarCount>

                    </IconWrapper>
                </NameAndStarWrapper>
                <Price>
                    {price}
                </Price>

            </HeaderWrapper>
            <VariationItemWrapper>

                <VariationName>
                    Select Quality :
                </VariationName>
                <QuantitySelector />
            </VariationItemWrapper>

            <VariationItemWrapper>

                <VariationName>
                    Choose a color :
                </VariationName>
                <ColorSelector />
            </VariationItemWrapper>

            <VariationItemWrapper>

                <VariationName>
                    Description
</VariationName>

            </VariationItemWrapper>
            <Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Description>








        </SupWrapper>
    );
}

export default React.memo(ProductDetailBody);
