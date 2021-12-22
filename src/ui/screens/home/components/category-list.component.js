

import React from 'react';
import { View, Text, FlatList, I18nManager } from 'react-native';
import styled from 'styled-components';
import CategoryListRow from './category-list-row.component';
import I18n from '../../../../../assets/i18n/_i18n';
const SupWrapper = styled(View)`

    paddingTop:${props => props.theme.space[3]};
    
`
const Label = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props => props.theme.text.h2};
    paddingLeft:${props => props.theme.space[3]};
    fontWeight:bold;
   
    
`
const CategoryHorizontalFlatList = styled(FlatList).attrs(props => ({
    horizontal: true,
    // showHorizontalScrollIndicator:false,
    contentContainerStyle: {
        paddingRight: parseInt(props.theme.space[3].substring(0, 2)),

    }
}))`
paddingTop:${props => props.theme.space[2]};
paddingLeft:${props => props.theme.space[3]};
`


const CategoryList = ({
    categories,
    goToProductList
}) => {
    
  

    return (
        <SupWrapper>
            <Label
                style={{
                    textShadowColor: "gray",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 2
                }}
            > {I18n.t("$AnaSayfaKategoriler")}</Label>
            <CategoryHorizontalFlatList

                showsHorizontalScrollIndicator={false}
                data={
                    categories
                }
                renderItem={({ item, index }) => <CategoryListRow item={item} index={index} goToProductList={goToProductList} />} />

        </SupWrapper>
    );
}

export default React.memo(CategoryList);