import I18n from 'i18n-js';
import React, {useRef} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import PrimaryButton from './primary-button.component';
import SecondaryButton from './secondary-button.component';
const ModalWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.transparentBlack};
`;
const ModalContentWrapper = styled(View)`
  background-color: ${props => props.theme.color.white};
  width: 250px;
  height: 250px;
  border-radius: ${props => props.theme.radius[2]};
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.space[2]};
`;
const LottieAnim = styled(LottieView)`
  width: 150px;
  height: 150px;
`;
const SuccessMessageText = styled(Text)``;
const ButtonWrapper = styled(View)`
  width: 100%;
  padding: ${props => props.theme.space[1]};
`;
const Touchable = styled(TouchableOpacity)`
  background-color: ${props => props.theme.color.white};
  border-radius: ${props => props.theme.radius[4]};
  padding: ${props => props.theme.space[2]};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.color.primary};
  width: 100%;
`;
const TouchableText = styled(Text)`
  color: ${props => props.theme.color.black};
  font-weight: bold;
`;
const SuccessModal = ({
  successModalVisibilty = true,
  hideSuccessModal,
  lottieName = 'basketLottie',
  buttonText = I18n.t('$DetayliAramaTamam'),
  successMessage = I18n.t('$UrunlerSepeteEklendi'),
  forceRefreshFlag1,
}) => {
  return (
    <Modal
      visible={successModalVisibilty}
      onRequestClose={hideSuccessModal}
      transparent={true}>
      <ModalWrapper>
        <ModalContentWrapper>
          <LottieAnim
            source={require('../../../assets/medias/basketLottie.json')}
            autoPlay={true}
            loop={true}
            speed={2}
          />

          <SuccessMessageText>{successMessage}</SuccessMessageText>

          <Touchable onPress={hideSuccessModal}>
            <TouchableText>{buttonText}</TouchableText>
          </Touchable>

          {/* <SecondaryButton text={"buttonText"} action={hideSuccessModal} /> */}
        </ModalContentWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default React.memo(SuccessModal);
