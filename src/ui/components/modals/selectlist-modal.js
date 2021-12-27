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
    backgroundColor:${props => props.theme.color.background};
  
    justifyContent:center;
    alignItems:center;
    

`
const ItemView = styled(View)`
paddingBottom:${props => props.theme.space[1]};
borderRadius:${props => props.theme.radius[1]};

`
const ItemTouchable = styled(TouchableOpacity)`
flexDirection:row;
flex:1;
alignItems:center;
borderRadius:${props => props.theme.radius[1]};
padding:${props => props.theme.space[2]};
backgroundColor:${props => props.theme.color.white};
`
const ItemText = styled(Text)`
marginLeft:${props => props.theme.space[2]};
fontWeight:bold;
flex:1;

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
    color: props.theme.color.darkGreen
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
                        padding: 10
                    }}
                >
                    {
                        selectItems.map((item, index) => {
                            return (
                                <ItemView key={index}>
                                    <ItemTouchable onPress={() => onSelected(item)}
                                        style={{
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.18,
                                            shadowRadius: 1.00,

                                            elevation: 1,
                                        }}>
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
