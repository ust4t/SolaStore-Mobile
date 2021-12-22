import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { cancelIcon, filterIcon } from '../../../../../util/icons';
import SearchBar from '../../../home/components/search-bar.component';
import I18n from 'i18n-js';

const SupWrapper = styled(View)`

`
const Wrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    padding:${props => props.theme.space[2]};
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
marginLeft:${props => props.theme.space[1]};
`
const FilterTouchable = styled(TouchableOpacity)`
flexDirection:row;
    alignItems:center;
`


const ProductListHeader = ({
    goToBasket, productCount, showFilterModal,
}) => (
    <SupWrapper>
        {/* <SearchBar goToBasket={goToBasket} /> */}
        <Wrapper >
            <ProductCountText>
                {productCount} {I18n.t("$AnasayfaBulunanUrunSayisi")}
            </ProductCountText>
            <View style={{ flex: 1 }}></View>

            <FilterTouchable onPress={showFilterModal}>
                <FilterIcon />
                <FilterText>{I18n.t("$AnasayfaFiltre")}</FilterText>
            </FilterTouchable>



        </Wrapper>
    </SupWrapper>

);

export default ProductListHeader;
