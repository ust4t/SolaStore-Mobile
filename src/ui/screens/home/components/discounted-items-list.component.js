import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import DiscountedItem from './discounted-items-list-row.component';

const SupWrapper = styled(View)`
    paddingLeft:${props => props.theme.space[1]};
    paddingTop:${props => props.theme.space[1]};
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.primary};
    fontSize:${props => props.theme.text.h2};
    
`
const ProductHorizontalFlatList = styled(FlatList).attrs(props => ({
    horizontal: true
}))`

`
const DiscountedItems = ({
    products
}) => (
    <SupWrapper>
        <Label>Sale Discount</Label>
        <ProductHorizontalFlatList
            data={products}
            renderItem={({ item, index }) => <DiscountedItem item={item} index={index} />} />

    </SupWrapper>
);

export default DiscountedItems;
