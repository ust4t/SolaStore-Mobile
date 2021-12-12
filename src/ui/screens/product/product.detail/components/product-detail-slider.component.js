import React, { useState } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { imageUrl, maxImageUrl } from '../../../../../util/constants';

import Icon from 'react-native-vector-icons/Ionicons'
import {PlayIcon} from '../../../../../util/icons';
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

const SliderImage = styled(Image)`
width:${props => DeviceWidth}px;
    height:400px;
    backgroundColor:${props => props.theme.color.lightGray};
`
const ThumbnailWrapper = styled(View)`
    width:100%;
    justifyContent:center;
    flexDirection:row;
    position:absolute;
    bottom:20;
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
const deviceWidth = Dimensions.get('window').width
const ProductDetailSlider = ({
    images = [],
    videoName = null,
    goToVideoPlayer


}) => {
    const [activePage, setActivePage] = useState(0);
    return (
        <Wrapper>
            <Slider
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    setActivePage(Math.round(parseFloat(event.nativeEvent.contentOffset.x / deviceWidth)))
                }} >
                {
                    images.map((item, index) => {
                        return (
                            <SliderImage source={{ uri: maxImageUrl + item.guidName }} key={index} resizeMode="contain" />
                        )
                    })
                }
                {
                    videoName != null &&
                    <VideoTocuhable onPress={goToVideoPlayer}>
                        <VideoPlayerIcon />
                        <SliderImage source={{ uri: maxImageUrl + images[0].guidName }} resizeMode="contain" />
                    </VideoTocuhable>

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
                {
                    videoName != null &&
                    <Tn >
                        <Thumbnail tnColor={activePage} index={images.length}>

                        </Thumbnail>
                    </Tn>

                }

            </ThumbnailWrapper>

        </Wrapper>
    );
}

export default React.memo(ProductDetailSlider);
