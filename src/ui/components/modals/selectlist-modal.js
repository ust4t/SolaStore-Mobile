import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { forwardChevron } from '../../../util/icons';
import ModalHeader from '../modal-header.component';
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
const ItemTouchable = styled(TouchableOpacity)`
    flexDirection:row;
    justifyContent:space-between;
    width:200px;
    marginTop:${props=>props.theme.space[2]};

`
const ItemText = styled(Text)`

`

const ItemIcon = styled(Icon).attrs(props => ({
    name: forwardChevron,
    size: 20,
    color: props.theme.color.primary
}))`
`
const SelectListModal = ({
    selectListModalVisible,
    hideSelectListModal,
    selectItems = [],
    onSelected
}) => (
    <Modal
        visible={selectListModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideSelectListModal}>
        <ModalWrapper>
            <ContentWrapper >
                <ModalHeader hideModal={hideSelectListModal}/>
                {
                    selectItems.map((item, index) => {
                        return (
                            <ItemTouchable onPress={()=>onSelected(item)} key={index}>
                                <ItemText>
                                    {item.name}
                                </ItemText>
                                <ItemIcon />
                            </ItemTouchable>
                        )
                    })
                }
            </ContentWrapper>


        </ModalWrapper>

    </Modal>
);

export default React.memo(SelectListModal);
