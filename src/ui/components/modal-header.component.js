import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { cancelIcon } from '../../util/icons';
import { Line, SeperatorFromTopOrBottom } from './shared-styled.components';
const Wrapper = styled(TouchableOpacity)`
    alignItems:center;
    backgroundColor:${props => props.theme.color.white};
    width:100%;
    padding:${props => props.theme.space[2]};
    paddingBottom:0;
    borderTopLeftRadius:${props => props.theme.space[3]};
    borderTopRightRadius:${props => props.theme.space[3]};

`
const CloseIcon = styled(Icon).attrs(props => ({
    name: cancelIcon,
    color: props.theme.color.error,
    size: 30
}))`
`


const ModalHeader = ({
    hideModal
}) => (
    <Wrapper onPress={hideModal} style={{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }}>
        <CloseIcon />
        <SeperatorFromTopOrBottom />
        <Line />
    </Wrapper>
);

export default ModalHeader;
