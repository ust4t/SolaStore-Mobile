import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {brandUrl, imageUrl} from '../../../../util/constants';

const Wrapper = styled(TouchableOpacity)`
  padding: ${props => props.theme.space[1]};
  alignitems: center;
  paddingbottom: 0px;
  paddingtop: 0px;
`;
const IconWrapper = styled(View)`
  backgroundcolor: ${props => props.theme.color.white};

  borderradius: ${props => props.theme.radius[2]};
`;
const CategoryTitle = styled(Text)`
  color: ${props => props.theme.color.primary};
  fontsize: ${props => props.theme.text.extraSmall};
  fontweight: bold;
  margintop: ${props => props.theme.space[1]};
`;
const CategoryIcon = styled(Image)`
  width: ${props => props.oneBrandImageWidth}px;
  height: ${props => props.oneBrandImageHeight}px;
  borderradius: ${props => props.theme.radius[2]};
`;

const HomeBrandRowComponent = ({
  item,
  index,
  goProductsWithBrand,
  oneBrandImageWidth,
  oneBrandImageHeight,
}) => {
  const {brandID, brandName, guidName, guidName2} = item;
  return (
    <Wrapper key={index} onPress={() => goProductsWithBrand(item)}>
      <IconWrapper>
        <CategoryIcon
          source={{uri: brandUrl + guidName}}
          resizeMode="stretch"
          oneBrandImageWidth={oneBrandImageWidth}
          oneBrandImageHeight={oneBrandImageHeight}
        />
      </IconWrapper>
    </Wrapper>
  );
};

export default React.memo(HomeBrandRowComponent);
