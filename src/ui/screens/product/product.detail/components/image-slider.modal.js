import React, { useState } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { maxImageUrl } from '../../../../../util/constants';
import { cancelIcon, backCircleIcon, forwardCircleIcon } from '../../../../../util/icons';
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
const BackForwardBtnWrapper = styled(View)`
    padding:${props => props.theme.space[2]};
`
const BackBtn = styled(Icon).attrs(props => ({
    name: backCircleIcon,
    color: props.theme.color.secondary,
    size: 40
}))``

const ForwardBtn = styled(Icon).attrs(props => ({
    name: forwardCircleIcon,
    color: props.theme.color.secondary,
    size: 40
}))``

const ImageSliderModal = ({
    sliderModalVisible,
    hideSliderModal,
    images

}) => {

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
            <ImageViewer imageUrls={imageUrls}
                renderArrowLeft={() => <BackForwardBtnWrapper>
                    <BackBtn />
                </BackForwardBtnWrapper>}
                renderArrowRight={() => <BackForwardBtnWrapper><ForwardBtn /></BackForwardBtnWrapper>}
                saveToLocalByLongPress={false}
                enablePreload={true} />
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
