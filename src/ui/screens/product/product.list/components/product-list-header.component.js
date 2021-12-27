import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { cancelIcon, filterIcon, swapIcon } from '../../../../../util/icons';
import SearchBar from '../../../home/components/search-bar.component';
import I18n from 'i18n-js';
import { SeperatorFromRightOrLeft, SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';

const SupWrapper = styled(View)`
padding:${props => props.theme.space[0]};
paddingBottom:${props => props.theme.space[1]};
paddingTop:${props => props.theme.space[1]};
width:100%;
`
const Wrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    
`
const ProductCountText = styled(Text)`
    opacity:0.7;
    width:100%;
    textAlign:center;
    
`
const FilterIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.primary,
    size: 25,
    name: filterIcon
}))`

`
const SwapIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.primary,
    size: 25,
    name: swapIcon
}))`

`
const FilterText = styled(Text)`
color:${props => props.theme.color.primary};
marginLeft:${props => props.theme.space[1]};
`
const FilterTouchable = styled(TouchableOpacity)`
flexDirection:row;
    alignItems:center;
    justifyContent:center;
    flex:1;
    borderBottomWidth:0.2px;
    borderTopWidth:0.2px;
    
    borderColor:${props=>props.theme.color.transparentBlack};
    padding:${props=>props.theme.space[1]};
`


const ProductListHeader = ({
    productCount, showFilterModal, showSortModal
}) => (
    <SupWrapper>
        {/* <SearchBar goToBasket={goToBasket} /> */}
        <Wrapper >
            <FilterTouchable onPress={showFilterModal}>
                <FilterIcon />
                <FilterText>{I18n.t("$AnasayfaFiltre")}</FilterText>
            </FilterTouchable>

    


            <FilterTouchable onPress={showSortModal} style={{borderLeftWidth:0.2}}>
                <SwapIcon />
                <FilterText> {I18n.t("$UrunlerSırala")}</FilterText>
            </FilterTouchable>



        </Wrapper>
        <SeperatorFromTopOrBottom />
        <ProductCountText>
            {productCount} {I18n.t("$AnasayfaBulunanUrunSayisi")}
        </ProductCountText>
    </SupWrapper>

);

export default React.memo(ProductListHeader);
