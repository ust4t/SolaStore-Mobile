import I18n from 'i18n-js';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import { imageUrl, mainAddUrl } from '../../../../util/constants';
const DeviceWidth = Dimensions.get('window').width
const SupWrapper = styled(View)`
    width:100%;

`
const CategoryImage = styled(Image)`
  
    width:100%;
    height:${props => (DeviceWidth  / 574) * 305}px;


`
const RowTouchable = styled(TouchableOpacity)`
    padding:${props => props.theme.space[2]};
    width:100%;
    
`
const CategoriesFlatList = styled(ScrollView)`
    width:100%;
`
const Label = styled(Text)`
    color:${props => props.theme.color.tertiary};
    fontSize:${props => props.theme.text.h2};
    paddingLeft:${props => props.theme.space[3]};
    fontWeight:bold;
    
`
const SwithchIndirimli = () => {
    switch (I18n.locale) {
        case "tr-TR":
            return "https://solastore.com.tr/img/mobilecampaigns/indirimli-urunler.jpg"
        case "ru-RU":
            return "https://solastore.com.tr/img/mobilecampaigns/indirimli-urunler-rus.jpg"
        case "ar-AR":
            return "https://solastore.com.tr/img/mobilecampaigns/indirimli-urunler-ar.jpg"
        case "en-EN":
            return "https://solastore.com.tr/img/mobilecampaigns/indirimli-urunler-en.jpg"
        case "fr-FR":
            return "https://solastore.com.tr/img/mobilecampaigns/indirimli-urunler-fr.jpg"
        default:
            return "https://solastore.com.tr/img/mobilecampaigns/indirimli-urunler.jpg"
    }
}
const SwitchCokSatanlar = () => {
    switch (I18n.locale) {
        case "tr-TR":
            return "https://solastore.com.tr/img/mobilecampaigns/cok-satanlar.jpg"
        case "ru-RU":
            return "https://solastore.com.tr/img/mobilecampaigns/cok-satanlar-ru.jpg"
        case "ar-AR":
            return "https://solastore.com.tr/img/mobilecampaigns/cok-satanlar-ar.jpg"
        case "en-EN":
            return "https://solastore.com.tr/img/mobilecampaigns/cok-satanlar-en.jpg"
        case "fr-FR":
            return "https://solastore.com.tr/img/mobilecampaigns/cok-satanlar-fr.jpg"
        default:
            return "https://solastore.com.tr/img/mobilecampaigns/cok-satanlar.jpg"
    }
}


const SwitchYeniUrunler = () => {
    switch (I18n.locale) {
        case "tr-TR":
            return "https://solastore.com.tr/img/mobilecampaigns/yeni-urunler.jpg"
        case "ru-RU":
            return "https://solastore.com.tr/img/mobilecampaigns/yeni-urunler-rus.jpg"
        case "ar-AR":
            return "https://solastore.com.tr/img/mobilecampaigns/yeni-urunler-ar.jpg"
        case "en-EN":
            return "https://solastore.com.tr/img/mobilecampaigns/yeni-urunler-ing.jpg"
        case "fr-FR":
            return "https://solastore.com.tr/img/mobilecampaigns/yeni-urunler-fr.jpg"
        default:
            return "https://solastore.com.tr/img/mobilecampaigns/yeni-urunler.jpg"
    }
}
const SpecificCategories = ({
    goToProductList
}) => {
    const defaultCategories = [
        {
            selectedCategoryName: I18n.t("$AnaSayfaYeniÜrünler"),
            squareCategoryPictureGuidName: SwitchYeniUrunler(),
            type: "variation",
            variationType: 1
        },
        {
            selectedCategoryName: I18n.t("$AnaSayfaÇokSatanlar"),
            squareCategoryPictureGuidName: SwitchCokSatanlar(),
            type: "variation",
            variationType: 2
        },
        {
            selectedCategoryName: I18n.t("$AnaSayfaİndirim"),
            squareCategoryPictureGuidName: SwithchIndirimli(),
            type: "variation",
            variationType: 3
        }
    ]
    return (
        <SupWrapper >
            <Label
                style={{
                    textShadowColor: "gray",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 2
                }}
            > {I18n.t("$AnaSayfaSizeOzel")}</Label>
            <CategoriesFlatList


            >

                {
                    defaultCategories.map((item, index) => {

                        return (
                            <RowTouchable onPress={() => goToProductList(item)} key={index}>
                                <CategoryImage source={{ uri:  item.squareCategoryPictureGuidName }} />
                            </RowTouchable>
                        )
                    })
                }


            </CategoriesFlatList>


        </SupWrapper>
    );
}

export default React.memo(SpecificCategories);
