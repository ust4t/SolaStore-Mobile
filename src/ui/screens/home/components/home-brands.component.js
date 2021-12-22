import I18n from 'i18n-js';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import { brandUrl, imageUrl, mainAddUrl } from '../../../../util/constants';
import HomeBrandRowComponent from './home-brand-row.component';
const DeviceWidth = Dimensions.get('window').width
const SupWrapper = styled(View)`
    width:100%;

`
const BrandImage = styled(Image)`
  
    width:120px;
    height:120px;
    borderRadius=${props => props.theme.radius[2]};


`
const Label = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props => props.theme.text.h2};
    paddingLeft:${props => props.theme.space[3]};
    fontWeight:bold;
    
`
const BrandsScroll = styled(ScrollView).attrs(props => ({
    numColumns: 3
}))`

`
const BrandWrapper = styled(TouchableOpacity)`
   padding:${props => props.theme.space[1]};
`

const BrandsHorizontalFlatList = styled(FlatList).attrs(props => ({
    horizontal: true,
    // showHorizontalScrollIndicator:false,
    contentContainerStyle: {
        paddingRight: parseInt(props.theme.space[3].substring(0, 2)),

    }
}))`
paddingTop:${props => props.theme.space[2]};
paddingLeft:${props => props.theme.space[3]};
`
const HomeBrandsComponent = ({
    brands,
    goProductsWithBrand
}) => (
    <SupWrapper >
        <Label
            style={{
                textShadowColor: "gray",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 2
            }}
        > {I18n.t("$AnaSayfaMarkalar")}</Label>
        <BrandsHorizontalFlatList

            showsHorizontalScrollIndicator={false}
            data={
                brands
            }
            renderItem={({ item, index }) => <HomeBrandRowComponent item={item} index={index} goProductsWithBrand={goProductsWithBrand}/>} />
        {/* <BrandsScroll
            // numColumns={3}
            horizontal={true}>
            {brands.slice(0, 6).map((item, index) => {
                return (
                    <BrandWrapper key={index}>
                        <BrandImage source={{ uri: brandUrl + item.guidName2 }} />
                    </BrandWrapper>
                )
            })}
        </BrandsScroll> */}
    </SupWrapper>
);

export default React.memo(HomeBrandsComponent);
