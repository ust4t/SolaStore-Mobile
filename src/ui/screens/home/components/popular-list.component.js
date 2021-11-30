import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import CategoryListRow from './category-list-row.component';
import PopularProductRow from './popular-list-row.component';

const SupWrapper = styled(View)`
    marginLeft:${props => props.theme.space[3]};
    paddingTop:${props => props.theme.space[3]};
    paddingBottom:200px;
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props => props.theme.text.h2};
    fontWeight:bold;
    
`
const ProductVerticalFlatList = styled(FlatList).attrs(props => ({
    horizontal: false,
    
}))`
marginTop:${props => props.theme.space[2]};
`


const PopularList = ({
    popularProducts,
    goToProductDetail
}) => (
    <SupWrapper>
        <Label>Popular</Label>
        {
            popularProducts.map((item, index) => 
                <PopularProductRow item={item} index={index} goToProductDetail={goToProductDetail} />)

        }
        
        {/* <ProductVerticalFlatList
            data={popularProducts}
            renderItem={({ item, index }) => /> */}

    </SupWrapper>
);

export default React.memo(PopularList);