import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {trashIcon} from '../../../../util/icons';
import styled from 'styled-components';
import QuantitySelector from '../../product/product.detail/components/quantity-selector.component';
import {imageUrl} from '../../../../util/constants';
const SupWrapper = styled(View)`
  background-color: ${props => props.theme.color.white};
  padding: ${props => props.theme.space[2]};
  margin-top: ${props => props.theme.space[1]};
`;
const SubWrapper = styled(View)`
  flex-direction: row;
  margin-top: ${props => props.theme.space[1]};
`;
const ItemImage = styled(Image)`
  width: 60px;
  height: 90px;
  border-radius: ${props => props.theme.radius[1]};
`;
const ItemDescriptionWrapper = styled(View)`
  margin-left: ${props => props.theme.space[1]};
  justify-content: space-between;
`;
const ItemName = styled(Text)`
  color: ${props => props.theme.color.primary};
`;
const Price = styled(Text)`
  color: ${props => props.theme.color.primary};

  font-weight: bold;
`;

const VariationText = styled(Text)`
  font-size: ${props => props.theme.text.extraSmall};
`;

const PriceAndCountWrapper = styled(View)`
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CountText = styled(Text)``;
const CheckoutItemListRpw = ({item, index}) => {
  const {productShortName, price, currency, quantity, pictureOneGuidName} =
    item;
  return (
    <SupWrapper key={index}>
      <SubWrapper>
        <ItemImage
          source={{uri: `${imageUrl}${pictureOneGuidName}`}}
          resizeMode="contain"
        />
        <ItemDescriptionWrapper>
          <ItemName>{productShortName}</ItemName>
          {/* <VariationText>Color:Dark Grey</VariationText>
                    <VariationText>Size : L</VariationText> */}

          <PriceAndCountWrapper>
            {/* <Price>{`${price} ${currency}`}</Price> */}
            <Price>{`${currency} ${price * quantity}`}</Price>
            <CountText>{`x${quantity}`}</CountText>
          </PriceAndCountWrapper>
        </ItemDescriptionWrapper>
      </SubWrapper>
    </SupWrapper>
  );
};

export default React.memo(CheckoutItemListRpw);
