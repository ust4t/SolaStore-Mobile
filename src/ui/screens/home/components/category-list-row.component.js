import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {imageUrl} from '../../../../util/constants';

const Wrapper = styled(TouchableOpacity)`
  padding: ${props => props.theme.space[1]};
  align-items: center;
`;
const IconWrapper = styled(View)`
  background-color: ${props => props.theme.color.white};

  border-radius: ${props => props.theme.radius[2]};
`;
const CategoryTitle = styled(Text)`
  color: ${props => props.theme.color.primary};
  font-size: ${props => props.theme.text.extraSmall};
  font-weight: bold;
  margin-top: ${props => props.theme.space[1]};
`;
// width:75px;
//     height:112px;
const CategoryIcon = styled(Image)`
  width: 85px;
  height: ${(85 / 150) * 225}px;
  border-radius: ${props => props.theme.radius[2]};
`;

const CategoryListRow = ({item, index, goToProductList}) => {
  const {selectedCategoryName, squareCategoryPictureGuidName, categoryID} =
    item;
  return (
    <Wrapper key={index} onPress={() => goToProductList(item)} style={{}}>
      <IconWrapper>
        {squareCategoryPictureGuidName ? (
          <CategoryIcon
            source={{
              uri: imageUrl + squareCategoryPictureGuidName,
            }}
            resizeMode="stretch"
          />
        ) : (
          <CategoryIcon
            source={require('../../../../../assets/medias/sola.jpg')}
            resizeMode="stretch"
          />
        )}
      </IconWrapper>
      <CategoryTitle>{selectedCategoryName}</CategoryTitle>
    </Wrapper>
  );
};

export default React.memo(CategoryListRow);
