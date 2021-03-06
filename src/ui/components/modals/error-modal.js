import React from 'react';
import { Modal, View, Text } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import ErrorButton from '../error-button.component';
import { SeperatorFromTopOrBottom } from '../shared-styled.components';
import I18n from 'i18n-js';
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
    minWidth:200px;
    padding:${props => props.theme.space[2]};
    borderRadius:${props => props.theme.space[3]};
    backgroundColor:${props => props.theme.color.white};
    justifyContent:center;
    alignItems:center;

`
const LottieError = styled(LottieView)`
width:50px;
    height:50px;
`
const ErrorText = styled(Text)`
textAlign:center;
`
const ErrorModal = ({
    errorModalVisible,
    errorMessage,
    hideErrorModal
}) => (
    <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideErrorModal}>
        <ModalWrapper>
            <ContentWrapper >
                <LottieError
                    source={require("../../../../assets/medias/errorLottie.json")}
                    autoPlay={true}
                    loop={true}
                />
                <SeperatorFromTopOrBottom />
                <ErrorText >{errorMessage}</ErrorText>
                <SeperatorFromTopOrBottom />

                <ErrorButton text={I18n.t("$DetayliAramaTamam")} action={hideErrorModal} flex="none"/>


            </ContentWrapper>


        </ModalWrapper>

    </Modal>
);

export default React.memo(ErrorModal);
