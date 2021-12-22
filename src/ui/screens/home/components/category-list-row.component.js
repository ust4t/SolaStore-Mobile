import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { imageUrl } from '../../../../util/constants';

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
// width:75px;
//     height:112px;
const CategoryIcon = styled(Image)`
width:85px;
    height:${85 / 150 * 225}px;
    borderRadius:${props => props.theme.radius[2]};
    
`

const CategoryListRow = ({
    item,
    index,
    goToProductList
}) => {
    const { selectedCategoryName, squareCategoryPictureGuidName, categoryID } = item;
    return (
        <Wrapper key={index} onPress={() => goToProductList(item)} style={{

        }}>
            <IconWrapper>
                <CategoryIcon source={{ uri: imageUrl + squareCategoryPictureGuidName }} resizeMode="stretch" />
            </IconWrapper>
            <CategoryTitle>
                {selectedCategoryName}
            </CategoryTitle>
        </Wrapper>
    );
}

export default React.memo(CategoryListRow);
