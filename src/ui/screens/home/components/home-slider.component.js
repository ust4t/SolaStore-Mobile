import React, { useState } from 'react';
import styled from 'styled-components';
import { maxImageUrl, midImageUrl, sliderUrl } from '../../../../util/constants';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
const DeviceWidth = Dimensions.get('window').width;
const Wrapper = styled(View)`
    width:100%;
    height:${props => (DeviceWidth / 1536) * 568}px;
`
const Slider = styled(ScrollView).attrs({
    horizontal: true,
    pagingEnabled: true
})`
width:${props => DeviceWidth}px;
backgroundColor:${props => props.theme.color.lightGray};
`
const SliderWrapper = styled(TouchableOpacity)`
width:${props => DeviceWidth}px;
    height:${props => (DeviceWidth / 1536) * 569}px;
`
const SliderImage = styled(Image)`
width:100%;
    height:100%;
    backgroundColor:${props => props.theme.color.lightGray};
`
const ThumbnailWrapper = styled(View)`
    width:100%;
    justifyContent:center;
    flexDirection:row;
    position:absolute;
    bottom:20px;
`
const Tn = styled(View)`
    padding:${props => props.theme.space[1]};
`
const Thumbnail = styled(View)`
backgroundColor:${props => props.tnColor == props.index ? props.theme.color.primary : props.theme.color.white};
width:8px;
height:8px;
borderRadius:4px;
`

const TextWrapper = styled(View)`
    position:absolute;
    width:100%;
    height:100%;
    alignItems:center;
    padding:${props => props.theme.space[2]};
    alignItems:center;
    justifyContent:center;
`
const AdsText = styled(Text)`
fontWeight:bold;
fontSize:${props => props.theme.text.subtitle};
color:${props => props.theme.color.white};

`

const StaticImages = () => {
    switch (I18n.locale) {
        case "tr-TR":
            return [
                {
                    "pictureID": 55552,
                    "guidName": "7d575a24-8.jpg",
                    "selectedText1": "İNDİRİMLİ ÜRÜNLER",
                    "selectedText2": "%40'a Varan İNDİRİMLER",
                    "selectedTextButton": "İncele",
                    "link": "https://solastore.com.tr/Category/index?Type=Sale",
                    type: "variation",
                    variationType: 3
                },
                {
                    "pictureID": 55641,
                    "guidName": "25cc1ca3-a.jpg",
                    "selectedText1": "YENİ ÜRÜNLER",
                    "selectedText2": "YENİ Sezon ÜRÜNLER",
                    "selectedTextButton": "İncele",
                    "link": "https://www.solastore.com.tr/Category/index?Type=NewProducts",
                    type: "variation",
                    variationType: 1
                }
            ]
        case "ru-RU":
            return [
                {
                    "pictureID": 55552,
                    "guidName": "7d575a24-8.jpg",
                    "selectedText1": "Товары со скидкой",
                    "selectedText2": "СКИДКИ ДО 40%",
                    "selectedTextButton": "ПОСМОТРЕТЬ",
                    "link": "https://solastore.com.tr/Category/index?Type=Sale",
                    type: "variation",
                    variationType: 3
                },
                {
                    "pictureID": 55641,
                    "guidName": "25cc1ca3-a.jpg",
                    "selectedText1": "новые продукты",
                    "selectedText2": "НОВЫЕ Сезонные ТОВАРЫ",
                    "selectedTextButton": "ПОСМОТРЕТЬ",
                    "link": "https://www.solastore.com.tr/Category/index?Type=NewProducts",
                    type: "variation",
                    variationType: 1
                }
            ]
        case "ar-AR":
            return [
                {
                    "pictureID": 55552,
                    "guidName": "7d575a24-8.jpg",
                    "selectedText1": "المنتجات المخفضة",
                    "selectedText2": "خصومات تصل إلى %40٪",
                    "selectedTextButton": "إعادة النظر",
                    "link": "https://solastore.com.tr/Category/index?Type=Sale",
                    type: "variation",
                    variationType: 3
                },
                {
                    "pictureID": 55641,
                    "guidName": "25cc1ca3-a.jpg",
                    "selectedText1": "منتجات جديدة",
                    "selectedText2": "منتجات الموسم الجديد",
                    "selectedTextButton": "إعادة النظر",
                    "link": "https://www.solastore.com.tr/Category/index?Type=NewProducts",
                    type: "variation",
                    variationType: 1
                }
            ]
        case "en-EN":
            return [
                {
                    "pictureID": 55552,
                    "guidName": "7d575a24-8.jpg",
                    "selectedText1": "Discounted products",
                    "selectedText2": "Up to 40% DISCOUNTS",
                    "selectedTextButton": "Review",
                    "link": "https://solastore.com.tr/Category/index?Type=Sale",
                    type: "variation",
                    variationType: 3
                },
                {
                    "pictureID": 55641,
                    "guidName": "25cc1ca3-a.jpg",
                    "selectedText1": "New Products",
                    "selectedText2": "NEW Season PRODUCTS",
                    "selectedTextButton": "Review",
                    "link": "https://www.solastore.com.tr/Category/index?Type=NewProducts",
                    type: "variation",
                    variationType: 1
                }
            ]
        case "fr-FR":
            return [
                {
                    "pictureID": 55552,
                    "guidName": "7d575a24-8.jpg",
                    "selectedText1": "Produits à prix réduit",
                    "selectedText2": "REMISES JUSQU'À 40%",
                    "selectedTextButton": "Revoir",
                    "link": "https://solastore.com.tr/Category/index?Type=Sale",
                    type: "variation",
                    variationType: 3
                },
                {
                    "pictureID": 55641,
                    "guidName": "25cc1ca3-a.jpg",
                    "selectedText1": "Nouveaux produits",
                    "selectedText2": "PRODUITS DE NOUVELLE Saison",
                    "selectedTextButton": "Revoir",
                    "link": "https://www.solastore.com.tr/Category/index?Type=NewProducts",
                    type: "variation",
                    variationType: 1
                }
            ]
        default:
            return [
                {
                    "pictureID": 55552,
                    "guidName": "7d575a24-8.jpg",
                    "selectedText1": "İNDİRİMLİ ÜRÜNLER",
                    "selectedText2": "%40'a Varan İNDİRİMLER",
                    "selectedTextButton": "İncele",
                    "link": "https://solastore.com.tr/Category/index?Type=Sale",
                    type: "variation",
                    variationType: 3
                },
                {
                    "pictureID": 55641,
                    "guidName": "25cc1ca3-a.jpg",
                    "selectedText1": "YENİ ÜRÜNLER",
                    "selectedText2": "YENİ Sezon ÜRÜNLER",
                    "selectedTextButton": "İncele",
                    "link": "https://www.solastore.com.tr/Category/index?Type=NewProducts",
                    type: "variation",
                    variationType: 1
                }
            ]
    }
}


const HomeSlider = ({
    images = StaticImages(),
    openLink,
    goToProductList
}) => {

    const [activePage, setActivePage] = useState(0);

    return (
        <Wrapper>
            <Slider
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    setActivePage(Math.round(parseFloat(event.nativeEvent.contentOffset.x / DeviceWidth)))
                }} >
                {
                    images.map((item, index) => {
                        return (
                            <SliderWrapper key={index} onPress={() => goToProductList(item)}>
                                <SliderImage
                                    // source={{ uri: maxImageUrl + item.guidName }}
                                    source={{ uri: `${sliderUrl}${item.guidName}` }}
                                    resizeMode="contain" />

                                <TextWrapper>
                                    <AdsText
                                        style={{
                                            textShadowColor: "black",
                                            textShadowOffset: { width: -1, height: 1 },
                                            textShadowRadius: 10
                                        }}
                                    >{item.selectedText1}</AdsText>
                                    <AdsText
                                        style={{
                                            textShadowColor: "black",
                                            textShadowOffset: { width: -1, height: 1 },
                                            textShadowRadius: 10
                                        }}
                                    >{item.selectedText2}</AdsText>
                                </TextWrapper>
                            </SliderWrapper>

                        )
                    })
                }
            </Slider>
            <ThumbnailWrapper>
                {
                    images.map((item, index) => {
                        return (
                            <Tn key={index}>
                                <Thumbnail tnColor={activePage} index={index}>

                                </Thumbnail>
                            </Tn>
                        )
                    })
                }

            </ThumbnailWrapper>
        </Wrapper>
    );
}

export default React.memo(HomeSlider);
