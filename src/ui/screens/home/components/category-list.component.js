import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import CategoryListRow from './category-list-row.component';

const SupWrapper = styled(View)`

    paddingTop:${props=>props.theme.space[3]};
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props=>props.theme.text.h2};
    paddingLeft:${props => props.theme.space[3]};
    fontWeight:bold;
    
`
const CategoryHorizontalFlatList = styled(FlatList).attrs(props => ({
    horizontal: true,
    showHorizontalScrollIndicator:false
}))`
paddingTop:${props=>props.theme.space[2]};
paddingLeft:${props => props.theme.space[3]};
`


const CategoryList = ({
    categories,
    goToProductList
}) => (
    <SupWrapper>
        <Label>Category</Label>
        <CategoryHorizontalFlatList
            data={categories}
            renderItem={({ item, index }) => <CategoryListRow item={item} index={index} goToProductList={goToProductList}/>} />

    </SupWrapper>
);

export default React.memo(CategoryList);