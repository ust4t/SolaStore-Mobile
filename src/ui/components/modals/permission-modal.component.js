import React from 'react';
import { Modal, View, Text } from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import PrimaryButton from '../primary-button.component';
import ErrorButton from '../error-button.component';
import SecondaryButton from '../secondary-button.component';

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
   
    width:200px;
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

const ButtonsWrapper = styled(View)`
    width:100%;
    flexDirection:row;
    justifyContent:space-between;

`
const PermissionModal = ({
    permissionModalVisible,
    hidePermissionModal,
    acceptMessage,
    onAccepted,
    warningMessage

}) => (
    <Modal
        visible={permissionModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hidePermissionModal}>
        <ModalWrapper>
            <ContentWrapper >
                <LottieError
                    source={require("../../../../assets/medias/warningLottie.json")}
                    autoPlay={true}
                    loop={true}
                />
                <ErrorText >{warningMessage}</ErrorText>
                <ButtonsWrapper>
                    <ErrorButton text={acceptMessage} action={onAccepted} />
                    <SecondaryButton text={"Kapat"} action={hidePermissionModal} />
                </ButtonsWrapper>

            </ContentWrapper>


        </ModalWrapper>

    </Modal>
);

export default React.memo(PermissionModal);
