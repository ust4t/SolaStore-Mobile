import I18n from 'i18n-js';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components';
import DiscountedItem from './discounted-items-list-row.component';

const SupWrapper = styled(View)`
  padding-top: ${props => props.theme.space[3]};
`;
const Label = styled(Text)`
  color: ${props => props.theme.color.tertiary};
  font-size: ${props => props.theme.text.h2};
  padding-left: ${props => props.theme.space[3]};
  font-weight: bold;
`;
const ProductHorizontalFlatList = styled(FlatList).attrs(props => ({
  horizontal: true,
  contentContainerStyle: {
    paddingRight: parseInt(props.theme.space[3].substring(0, 2)),
  },
}))`
  padding-top: ${props => props.theme.space[2]};
  padding-left: ${props => props.theme.space[3]};
`;
const DiscountedItems = ({products, goToProductDetail}) => (
  <SupWrapper>
    <Label>{I18n.t('$AnaSayfaİndirim')}</Label>
    <ProductHorizontalFlatList
      showsHorizontalScrollIndicator={false}
      data={products}
      renderItem={({item, index}) => (
        <DiscountedItem
          item={item}
          index={index}
          goToProductDetail={goToProductDetail}
        />
      )}
    />
  </SupWrapper>
);

export default DiscountedItems;
