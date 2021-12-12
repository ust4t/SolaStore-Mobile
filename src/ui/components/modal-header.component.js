import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { cancelIcon } from '../../util/icons';
const Wrapper = styled(TouchableOpacity)`
    alignItems:center;

    width:100%;

`
const CloseIcon = styled(Icon).attrs(props => ({
    name: cancelIcon,
    color: props.theme.color.error,
    size:30
}))`
`


const ModalHeader = ({
    hideModal
}) => (
    <Wrapper onPress={hideModal}>
        <CloseIcon />
    </Wrapper>
);

export default ModalHeader;
