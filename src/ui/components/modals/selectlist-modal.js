import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { forwardChevron } from '../../../util/icons';
import ModalHeader from '../modal-header.component';
import { ScrollablePage } from '../shared-styled.components';
const deviceWidth = Dimensions.get("window").width;
const ModalWrapper = styled(View)`
    width:${deviceWidth}px;
    height:100%;
    backgroundColor:${props => props.theme.color.transparentBlack};
    justifyContent:center;
    alignItems:center;
`
const ContentWrapper = styled(View)`
width:100%;
height:100%;
borderTopLeftRadius:${props => props.theme.space[3]};
borderTopRightRadius:${props => props.theme.space[3]};
    backgroundColor:${props => props.theme.color.white};
    justifyContent:center;
    alignItems:center;
    paddingTop:${props => props.theme.space[2]};

`
const ItemView = styled(View)`
padding:${props=>props.theme.space[1]};

`
const ItemTouchable = styled(TouchableOpacity)`
    flexDirection:row;
    flex:1;
    justifyContent:space-between;
    

    marginTop:${props => props.theme.space[1]};
    borderBottomWidth:0.2px;
`
const ItemText = styled(Text)`


`
const ModalScroll = styled(ScrollView)
    // .attrs(
    //     props => {
    //         contentContainerStyle: {

    //             padding: props.theme.space[2]

    //         }
    //     }
    // )
    `
    width:100%;
`

const ItemIcon = styled(Icon).attrs(props => ({
    name: forwardChevron,
    size: 25,
    color: props.theme.color.secondary
}))`
`
const SelectListModal = ({
    selectListModalVisible,
    hideSelectListModal,
    selectItems = [],
    onSelected,
    propertyName = null
}) => (
    <Modal
        visible={selectListModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideSelectListModal}>
        <ModalWrapper>
            <ContentWrapper >
                <ModalHeader hideModal={hideSelectListModal} />
                <ModalScroll
                    contentContainerStyle={{
                        padding: 20
                    }}
                >
                    {
                        selectItems.map((item, index) => {
                            return (
                                <ItemView key={index}>
                                    <ItemTouchable onPress={() => onSelected(item)}>
                                        <ItemText>
                                            {
                                                propertyName == null ?
                                                    item :
                                                    item[propertyName]
                                            }

                                        </ItemText>
                                        <ItemIcon />
                                    </ItemTouchable>
                                </ItemView>

                            )
                        })
                    }
                </ModalScroll>
            </ContentWrapper>


        </ModalWrapper>

    </Modal>
);

export default React.memo(SelectListModal);
