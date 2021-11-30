import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import CategoryListRow from './category-list-row.component';

const SupWrapper = styled(View)`
    paddingLeft:${props=>props.theme.space[1]};
    paddingTop:${props=>props.theme.space[1]};
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.primary};
    fontSize:${props=>props.theme.text.h2};
    
`
const CategoryHorizontalFlatList = styled(FlatList).attrs(props => ({
    horizontal: true
}))`

`


const CategoryList = ({
    categories
}) => (
    <SupWrapper>
        <Label>Category</Label>
        <CategoryHorizontalFlatList
            data={categories}
            renderItem={({ item, index }) => <CategoryListRow item={item} index={index} />} />

    </SupWrapper>
);

export default React.memo(CategoryList);