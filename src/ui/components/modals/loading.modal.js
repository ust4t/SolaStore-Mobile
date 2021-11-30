import React from 'react';
import { Modal, View } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
const ModalWrapper = styled(View)`
    width:100%;
    height:100%;
    position:absolute;
    zIndex:99;
    backgroundColor:${props => props.theme.color.transparentBlack};
    justifyContent:center;
    alignItems:center;

`
const ContentWrapper = styled(View)`

width:100px;
    height:100px;
    borderRadius:20px;
    backgroundColor:${props => props.theme.color.white};
    justifyContent:center;
    alignItems:center;
`

const LottieLoading = styled(LottieView)`
width:70px;
    height:70px;
`

const LoadingModal = ({
    loadingModalVisible
}) => (
    <Modal
        visible={true}
        transparent={true}
        animationType="none">
        <ModalWrapper>
            <ContentWrapper>
                <LottieLoading
                    source={require("../../../../assets/medias/loadingLottie.json")}
                    autoPlay={true}
                    loop={true}
                />
            </ContentWrapper>


        </ModalWrapper>

    </Modal>
);

export default React.memo(LoadingModal);
