import React, { useState } from 'react';
import styled from 'styled-components';
import { maxImageUrl, midImageUrl, sliderUrl } from '../../../../util/constants';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
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
const SliderWrapper = styled(View)`
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




const HomeSlider = ({
    images = [],
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
                            <SliderWrapper key={index}>
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
