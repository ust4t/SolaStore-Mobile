import React, { useRef, useState } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { imageUrl, maxImageUrl } from '../../../../../util/constants';

import Icon from 'react-native-vector-icons/Ionicons'
import { PlayIcon } from '../../../../../util/icons';
import FastImage from 'react-native-fast-image';
const DeviceWidth = Dimensions.get('window').width;
const Wrapper = styled(View)`
    width:100%;
    height:400px;
`
const Slider = styled(ScrollView).attrs({
    horizontal: true,
    pagingEnabled: true
})`
width:${props => DeviceWidth}px;
backgroundColor:${props => props.theme.color.lightGray};
`

const VideoTocuhable = styled(TouchableOpacity)`

`
const VideoPlayerIcon = styled(Icon).attrs(props => (
    {
        color: props.theme.color.orange,
        size: 70,
        name: PlayIcon
    }
))`
    position:absolute;
    top:40%;
    left:40%;
    zIndex:99;

`

const SliderImage = styled(FastImage)`
width:${props => DeviceWidth}px;
    height:400px;
    backgroundColor:${props => props.theme.color.lightGray};
`
const ThumbnailWrapper = styled(View)`
    width:100%;
    justifyContent:center;
    flexDirection:row;
    position:absolute;
    bottom:5px;
`
const Tn = styled(TouchableOpacity)`
    padding:${props => props.theme.space[1]};
    opacity:0.8;
`
const Thumbnail = styled(View)`
backgroundColor:${props => props.tnColor == props.index ? props.theme.color.primary : props.theme.color.white};
width:8px;
height:8px;
borderRadius:4px;
`
const TnImage = styled(Image)`
    width:30px;
    height:45px;
    borderWidth:1px;
    borderColor:${props => props.tnColor == props.index ? props.theme.color.primary : props.theme.color.white};
`
const deviceWidth = Dimensions.get('window').width
const ProductDetailSlider = ({
    images = [],
    videoName = null,
    goToVideoPlayer,
    showSliderModal


}) => {
    const [activePage, setActivePage] = useState(0);
    const scrollViewRef = useRef(null);

    const toNextPage = (index) => {
        if (scrollViewRef.current !== null) {

            scrollViewRef.current.scrollTo({
                x: deviceWidth * (index),
                animated: true,
            });
        }
    };
    return (
        <Wrapper>
            <Slider
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                onScroll={(event) => {
                    setActivePage(Math.round(parseFloat(event.nativeEvent.contentOffset.x / deviceWidth)))
                }} >
                {
                    images.map((item, index) => {
                        return (
                            <VideoTocuhable onPress={showSliderModal} key={index}>
                                <SliderImage source={{ uri: maxImageUrl + item.guidName }} resizeMode="contain"
                                />
                            </VideoTocuhable>

                        )
                    })
                }
                {
                    videoName != null && images[0] &&
                    <VideoTocuhable onPress={goToVideoPlayer}>
                        <VideoPlayerIcon />
                        <SliderImage source={{ uri: maxImageUrl + images[0].guidName}} resizeMode="contain" />
                    </VideoTocuhable>

                }
            </Slider>
            <ThumbnailWrapper>
                {
                    images.map((item, index) => {
                        return (
                            <Tn key={index}
                                onPress={() => toNextPage(index)}
                            >
                                {/* <Thumbnail tnColor={activePage} index={index}>

                                </Thumbnail> */}
                                <TnImage
                                    tnColor={activePage} index={index} source={{ uri: imageUrl + item.guidName }} resizeMode="contain" />
                            </Tn>
                        )
                    })
                }
                {
                    videoName != null && images[0] &&
                    <Tn
                        onPress={() => toNextPage(images.length)}>
                        {/* <Thumbnail tnColor={activePage} index={images.length}> */}
                        <TnImage
                            tnColor={activePage} index={images.length} source={{ uri: maxImageUrl + images[0].guidName}} resizeMode="contain" />

                        {/* </Thumbnail> */}
                    </Tn>

                }

            </ThumbnailWrapper>

        </Wrapper>
    );
}

export default React.memo(ProductDetailSlider);
