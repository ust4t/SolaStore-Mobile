import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
padding:${props => props.theme.space[1]};
alignItems:center;
`
const IconWrapper = styled(View)`
backgroundColor:${props => props.theme.color.white};
padding:${props => props.theme.space[1]};
borderRadius:${props => props.theme.radius[2]};

`
const CategoryTitle = styled(Text)`
color:${props => props.theme.color.primary};
fontSize:${props => props.theme.text.extraSmall};
fontWeight:bold;
marginTop:${props => props.theme.space[1]};


`
const CategoryIcon = styled(Image)`
    height:50px;
    width:50px;
`

const CategoryListRow = ({
    item,
    index,
    goToProductList
}) => {
    const {selectedCategoryName,squareCategoryPictureGuidName}=item;
    return (
        <Wrapper key={index} onPress={goToProductList}>
            <IconWrapper>
                <CategoryIcon source={{ uri: squareCategoryPictureGuidName}} />
            </IconWrapper>
            <CategoryTitle>
                {selectedCategoryName}
            </CategoryTitle>
        </Wrapper>
    );
}

export default React.memo(CategoryListRow);
