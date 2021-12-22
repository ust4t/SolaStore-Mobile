import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { brandUrl, imageUrl } from '../../../../util/constants';

const Wrapper = styled(TouchableOpacity)`
padding:${props => props.theme.space[1]};
alignItems:center;
`
const IconWrapper = styled(View)`
backgroundColor:${props => props.theme.color.white};

borderRadius:${props => props.theme.radius[2]};

`
const CategoryTitle = styled(Text)`
color:${props => props.theme.color.primary};
fontSize:${props => props.theme.text.extraSmall};
fontWeight:bold;
marginTop:${props => props.theme.space[1]};
`
const CategoryIcon = styled(Image)`

    width:120px;
    height:120px;
    borderRadius:${props => props.theme.radius[2]};
    
`

const HomeBrandRowComponent = ({
    item,
    index,
    goProductsWithBrand
   
}) => {
    const { brandID,brandName,guidName,guidName2 } = item;
    return (
        <Wrapper key={index} 
         onPress={() => goProductsWithBrand(item)} 
        style={{

        }}>
            <IconWrapper>
                <CategoryIcon source={{ uri:brandUrl+ guidName }} resizeMode="stretch" />
            </IconWrapper>

        </Wrapper>
    );
}

export default React.memo(HomeBrandRowComponent);

