import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import CategoryListRow from './category-list-row.component';
import PopularProductRow from './popular-list-row.component';

const SupWrapper = styled(View)`
    paddingLeft:${props => props.theme.space[1]};
    paddingTop:${props => props.theme.space[1]};
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.primary};
    fontSize:${props => props.theme.text.h2};
    
`
const ProductVerticalFlatList = styled(FlatList).attrs(props => ({
    horizontal: false
}))`

`


const PopularList = ({
    popularProducts
}) => (
    <SupWrapper>
        <Label>Popular</Label>
        <ProductVerticalFlatList
            data={popularProducts}
            renderItem={({ item, index }) => <PopularProductRow item={item} index={index} />} />

    </SupWrapper>
);

export default React.memo(PopularList);