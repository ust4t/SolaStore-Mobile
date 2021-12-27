import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { heartDislikeIcon } from '../../../../../util/icons';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import { midImageUrl } from '../../../../../util/constants';
import { SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
import FavoriteButton from '../../product.detail/components/favorite-button.component';
import { observer } from 'mobx-react';

const SupWrapper = styled(View)`
    width:${props => props.CalculatedWrapperSize ?
        props.CalculatedWrapperSize :
        ((Dimensions.get('window').width / 2) - (props.theme.space[3].substring(0, 2)))}px;
    
    padding:${props => props.theme.space[2]};
    height:${props => props.CalculatedSupWrapperHeight ?
        props.CalculatedSupWrapperHeight :
        (497 * (((Dimensions.get('window').width / 2) - (parseInt(props.theme.space[3].substring(0, 2)) + 2 * parseInt(props.theme.space[2].substring(0, 2)))) / 331))
    }px;
    
`
const SubWrapper = styled(TouchableOpacity)`

`

const ProductImage = styled(Image)`
width:100%;
height:${props => props.CalculatedImageSize ?
        props.CalculatedImageSize :
        497 * (((Dimensions.get('window').width / 2) - (parseInt(props.theme.space[3].substring(0, 2)) + 2 * parseInt(props.theme.space[2].substring(0, 2)))) / 331)}px;


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
fontSize:${props => props.theme.text.small};
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

const DiscountWrapper = styled(View)`
    position:absolute;
    top:${props => props.theme.space[1]};
    left:${props => props.theme.space[1]};
    padding:${props => props.theme.space[1]};
    backgroundColor:${props => props.theme.color.error};
    borderRadius:${props => props.theme.radius[1]};
    opacity:0.5;

`
const DiscountText = styled(Text)`
    color:${props => props.theme.color.white};
    fontSize:${props => props.theme.text.small};
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


const ProductListRow = ({
    item,
    index,
    goToProductDetail,


    // inFavorites = false,
    // removeFavoriteProduct,
    CalculatedImageSize,
    CalculatedWrapperSize,
    CalculatedSupWrapperHeight,
    addToFavorites,
    UserStore
}) => {
    const { productShortName,
        price,
        oldPrice,
        pictures,
        productID,
        isFavorite = false } = item;

    const FavoriteViewer = observer(({ userStore }) => {
        return <FavoriteButton action={() => addToFavorites(item)}
            isFavorite={
                userStore.favorites.find(i => i.productID == productID)
            }
            spaceCount={1} />
    }
    )


    return (

        <SupWrapper key={productID}
            CalculatedWrapperSize={CalculatedWrapperSize}
            CalculatedSupWrapperHeight={CalculatedSupWrapperHeight}>
            <SubWrapper onPress={() => goToProductDetail(productID)}

            >
                {/* {
                    UserStore.favorites.find(i => i.productID == productID) && <Text>aaa</Text>
                } */}
                <FavoriteViewer userStore={UserStore} />


                {/* {
                    inFavorites && <HeartDislikeIcon onPress={() => removeFavoriteProduct(productID)} />
                } */}
                <ProductImage source={{
                    uri: pictures[0] ? midImageUrl + pictures[0].guidName : "",
                    priority: FastImage.priority.low,
                }}
                    // resizeMode={FastImage.resizeMode.contain}
                    resizeMode="contain"
                    CalculatedImageSize={CalculatedImageSize}
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
                {
                    oldPrice != 0 &&
                    <DiscountWrapper>
                        <DiscountText>
                            -${oldPrice - price}
                        </DiscountText>
                    </DiscountWrapper>
                }

            </SubWrapper>


        </SupWrapper>

    )
}

export default React.memo(ProductListRow);
