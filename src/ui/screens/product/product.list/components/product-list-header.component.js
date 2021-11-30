import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { filterIcon } from '../../../../../util/icons';
import SearchBar from '../../../home/components/search-bar.component';
const SupWrapper = styled(View)`

`
const Wrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    padding:${props=>props.theme.space[2]};
`
const ProductCountText = styled(Text)`
    opacity:0.7;
`
const FilterIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.primary,
    size: 25,
    name: filterIcon
}))`

`
const FilterText = styled(Text)`
color:${props => props.theme.color.primary};
marginLeft:${props=>props.theme.space[1]};
`


const ProductListHeader = ({

}) => (
    <SupWrapper>
        <SearchBar />
        <Wrapper >
            <ProductCountText>
                20 Items Found
        </ProductCountText>
            <View style={{ flex: 1 }}></View>
            <FilterIcon />
            <FilterText>Filters</FilterText>
        </Wrapper>
    </SupWrapper>

);

export default ProductListHeader;
