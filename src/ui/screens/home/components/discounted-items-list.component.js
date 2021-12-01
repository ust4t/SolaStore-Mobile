import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import DiscountedItem from './discounted-items-list-row.component';

const SupWrapper = styled(View)`
  
    paddingTop:${props => props.theme.space[3]};
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props => props.theme.text.h2};
    paddingLeft:${props => props.theme.space[3]};
    fontWeight:bold;
    
`
const ProductHorizontalFlatList = styled(FlatList).attrs(props => ({
    horizontal: true,
    contentContainerStyle: {
        paddingRight:parseInt(props.theme.space[3].substring(0,2))
    }
 
}))`
paddingTop:${props => props.theme.space[2]};
paddingLeft:${props => props.theme.space[3]};
`
const DiscountedItems = ({
    products,
    goToProductDetail
}) => (
    <SupWrapper>
        <Label>Sale Discount</Label>
        <ProductHorizontalFlatList
            showsHorizontalScrollIndicator={false}
            data={products}
            renderItem={({ item, index }) => <DiscountedItem item={item} index={index} goToProductDetail={goToProductDetail}/>} />

    </SupWrapper>
);

export default DiscountedItems;
