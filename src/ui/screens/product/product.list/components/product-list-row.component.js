import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { heartDislikeIcon } from '../../../../../util/icons';


const SupWrapper = styled(View)`
    width:${props => ((Dimensions.get('window').width / 2) - (props.theme.space[3].substring(0, 2)))}px;
    padding:${props => props.theme.space[2]};
    
`
const SubWrapper = styled(TouchableOpacity)`

`

const ProductImage = styled(Image)`
width:100%;
height:${props=>497*(((Dimensions.get('window').width / 2)-(parseInt(props.theme.space[3].substring(0, 2))+2*parseInt(props.theme.space[2].substring(0, 2))))/331)};


borderRadius:${props => props.theme.radius[2]};

`
const DescriptionWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    paddingTop:${props => props.theme.space[1]};
`
const DescriptionLeft = styled(View)`
flex:1;
`
const DescriptionRight = styled(View)`
flexDirection:row;
alignItems:center;
justifyContent:center;
`
const DiscountedPriceText = styled(Text)`
color:${props => props.theme.color.black};
fontSize:${props => props.theme.text.extraSmall};
textDecorationLine:line-through;
marginLeft:${props => props.theme.space[1]};
opacity:0.4;
`
const NameText = styled(Text)`
color:${props => props.theme.color.primary};
`

const PriceText = styled(Text)`
color:${props => props.theme.color.primary};
fontWeight:bold;
fontSize:${props => props.theme.text.subtitle};
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
        size: 8,
        name: "md-star"
    }
))`

`

const HeartDislikeIcon = styled(Icon).attrs(props => (
    {
        color: props.theme.color.error,
        size: 20,
        name: heartDislikeIcon
    }
))`
position:absolute;
top:10px;
right:10px;
zIndex:99;
elevation:99;

`
import Icon from 'react-native-vector-icons/Ionicons'
import { midImageUrl } from '../../../../../util/constants';
import { SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
const ProductListRow = ({
    item,
    index,
    goToProductDetail,


    inFavorites = false,
    removeFavoriteProduct
}) => {
    const { productShortName,
        price,
        oldPrice,
        pictures,
        productID } = item;
    return (

        <SupWrapper key={index}>
            <SubWrapper onPress={() => goToProductDetail(productID)}>
                {
                    inFavorites && <HeartDislikeIcon onPress={() => removeFavoriteProduct(productID)} />
                }
                <ProductImage source={{ uri: pictures[0] ? midImageUrl + pictures[0].guidName : "" }} resizeMode="contain"
                // style={{ flex: 1, resizeMode: "contain", aspectRatio: 1 }} 
                />
                <DescriptionWrapper>

                    <DescriptionLeft>
                        <NameText>
                            {productShortName}
                        </NameText>
                        {/* <IconWrapper>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarCount>4.5</StarCount>

                        </IconWrapper> */}
                    </DescriptionLeft>
                    <SeperatorFromRightOrLeft />

                    <DescriptionRight>
                        <PriceText>${price}</PriceText>
                        {
                            oldPrice != 0 &&
                            <DiscountedPriceText>
                                {oldPrice}
                            </DiscountedPriceText>
                        }
                    </DescriptionRight>
                </DescriptionWrapper>
            </SubWrapper>

        </SupWrapper>

    )
}

export default ProductListRow;
