import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { imageUrl, midImageUrl } from '../../../../../util/constants';

const SupWrapper = styled(TouchableOpacity)`
    padding:${props=>props.theme.space[2]};
`
const VariationImage = styled(Image)`
width:100px;
height:150px;
    backgroundColor:${props => props.theme.color.lightGray};
`


const ProductVariation = ({
    item,
    index,
    action
}) => {
    const { productID, pictures } = item
    return (
        <SupWrapper key={index} onPress={() => action(item)}>
            <VariationImage
                // source={{ uri: pictures[0] }}
                source={{uri:pictures[0] ? midImageUrl+pictures[0].guidName : ""}} />
        </SupWrapper>
    );
}

export default ProductVariation;
