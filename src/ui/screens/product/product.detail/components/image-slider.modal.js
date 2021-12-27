import React, { useState } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { maxImageUrl } from '../../../../../util/constants';
import { cancelIcon } from '../../../../../util/icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';


const CloseButton = styled(TouchableOpacity)`
padding:${props => props.theme.space[2]};
position:absolute;
top:${props => props.theme.space[2]};
right:${props => props.theme.space[2]};
elevation:99;
zIndex:99;
`

const CloseIcon = styled(Icon).attrs(props => ({
    name: cancelIcon,
    color: props.theme.color.error,
    size: 40
}))`

`

const ModalWrapper = styled(View)`
    width:100%;
    height:100%;
    position:absolute;
    zIndex:99;
    backgroundColor:${props => props.theme.color.transparentBlack};
    justifyContent:center;
    alignItems:center;
    

`
const DeviceWidth = Dimensions.get('window').width;
const Wrapper = styled(View)`
    width:100%;
   
`
const Slider = styled(ScrollView).attrs({
    horizontal: true,
    pagingEnabled: true
})`
width:100%;
backgroundColor:${props => props.theme.color.lightGray};
`


const SliderImage = styled(FastImage)`
width:${props => DeviceWidth}px;
    height:100%;
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

const ImageSliderModal = ({
    sliderModalVisible,
    hideSliderModal,
    images

}) => {
    const [activePage, setActivePage] = useState(0);
    const imageUrls = []
    images.map((item) => {
        imageUrls.push({
            url: maxImageUrl + item.guidName,
            props: {
                // headers: ...
            }
        })
    })
    return (
        <Modal
            visible={sliderModalVisible}
            transparent={false}
            animationType="none"
            onRequestClose={hideSliderModal}>
            {/* <ModalWrapper>*/}
                <CloseButton onPress={hideSliderModal}>
                    <CloseIcon />
                </CloseButton> 
                <ImageViewer imageUrls={imageUrls} />
                {/* <Slider
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        setActivePage(Math.round(parseFloat(event.nativeEvent.contentOffset.x / DeviceWidth)))
                    }} >
                    {
                        images.map((item, index) => {
                            return (
                                <SliderImage source={{ uri: maxImageUrl + item.guidName }} key={index} resizeMode="contain" />
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


                </ThumbnailWrapper> */}



            {/* </ModalWrapper> */}

        </Modal>
    );
}

export default ImageSliderModal;
