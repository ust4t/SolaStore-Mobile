import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components';
import {mainCampaignsUrl} from '../../../../util/constants';

const Wrapper = styled(TouchableOpacity)`
  padding: ${props => props.theme.space[1]};
  padding-bottom: 0px;
  padding-top: 0px;
  align-items: center;
`;
const IconWrapper = styled(View)`
  background-color: ${props => props.theme.color.white};

  border-radius: ${props => props.theme.radius[2]};
`;

const CategoryIcon = styled(Image)`
  width: ${props => props.oneCmpImageWidth}px;
  height: ${props => props.oneCmpImageHeight}px;
  border-radius: ${props => props.theme.radius[2]};
`;

const HomeCampaignRow = ({
  item,
  index,
  oneCmpImageWidth,
  oneCmpImageHeight,
  goToProductList,
}) => {
  const {pictureGuidName, pictureLink} = item;
  return (
    <Wrapper
      key={index}
      onPress={() =>
        goToProductList({
          categoryID: pictureLink.substr(
            pictureLink.indexOf('x/') + 2,
            pictureLink.length,
          ),
        })
      }>
      <IconWrapper>
        <CategoryIcon
          source={{uri: mainCampaignsUrl + pictureGuidName}}
          resizeMode="stretch"
          oneCmpImageWidth={oneCmpImageWidth}
          oneCmpImageHeight={oneCmpImageHeight}
        />
      </IconWrapper>
    </Wrapper>
  );
};

export default React.memo(HomeCampaignRow);
