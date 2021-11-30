import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
const SupWrapper = styled(View)`
    padding:${props => props.theme.space[1]};
`
const SubWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
`
const Wrapper = styled(View)`
padding:${props=>props.theme.space[1]};
`
const ProductImage = styled(Image)`
    width:100px;
    height:150px;
    borderRadius:${props => props.theme.radius[2]};
    backgroundColor:${props=>props.theme.color.gray};
`
const ProductPrice = styled(Text)`

color:${props => props.theme.color.primary};
fontWeight:bold;
`
const ProductName = styled(Text)`

color:${props => props.theme.color.black};

`

const IconWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
`
const StarCount=styled(Text)`
    fontSize:${props=>props.theme.text.extraSmall};
    marginLeft:${props=>props.theme.space[1]};
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
    index
}) => (
    <SupWrapper key={index}>
        <SubWrapper>
            <ProductImage source={{ uri: item.productImageUri }} />

            <Wrapper>
                <ProductName>{item.productName}</ProductName>
                <ProductPrice>{item.price}</ProductPrice>

                <IconWrapper>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarCount>4.5</StarCount>

                </IconWrapper>
            </Wrapper>

        </SubWrapper>
    </SupWrapper>
);

export default PopularProductRow;
