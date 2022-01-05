import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { brandUrl, imageUrl } from '../../../../util/constants';

const Wrapper = styled(TouchableOpacity)`
padding:${props => props.theme.space[1]};
alignItems:center;
paddingBottom:0px;
paddingTop:0px;

`
const IconWrapper = styled(View)`
backgroundColor:${props => props.theme.color.white};

borderRadius:${props => props.theme.radius[2]};
borderWidth:0.2px;
borderColor:${props => props.theme.color.primary};

`
const CategoryTitle = styled(Text)`
color:${props => props.theme.color.primary};
fontSize:${props => props.theme.text.extraSmall};
fontWeight:bold;
marginTop:${props => props.theme.space[1]};
`
const CategoryIcon = styled(Image)`

    width:${props => props.oneBrandImageWidth}px;
    height:${props => props.oneBrandImageHeight}px;;
    borderRadius:${props => props.theme.radius[2]};
    
`

const HomeBrandRowComponent = ({
    item,
    index,
    goProductsWithBrand,
    oneBrandImageWidth,
    oneBrandImageHeight

}) => {
    const { brandID, brandName, guidName, guidName2 } = item;
    return (
        <Wrapper key={index}
            onPress={() => goProductsWithBrand(item)}
        >
            <IconWrapper
            >
                <CategoryIcon
                    source={{ uri: brandUrl + guidName }}
                    resizeMode="stretch"
                    oneBrandImageWidth={oneBrandImageWidth}
                    oneBrandImageHeight={oneBrandImageHeight} />
            </IconWrapper>

        </Wrapper>
    );
}

export default React.memo(HomeBrandRowComponent);

