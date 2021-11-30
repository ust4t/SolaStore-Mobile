import React, { useState } from 'react';
import { ScrollView, View, Image, Dimensions, Text } from 'react-native';
import styled from 'styled-components';
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
backgroundColor:${props =>props.tnColor==props.index ?  props.theme.color.primary : props.theme.color.white};
width:8px;
height:8px;
borderRadius:4px;
`
const deviceWidth = Dimensions.get('window').width
const ProductDetailSlider = ({
    images = ["https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"]
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
                            <SliderImage source={{ uri: item }} key={index} />
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

export default React.memo(ProductDetailSlider);
