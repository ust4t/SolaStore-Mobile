import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { checkmarkIcon, forwardChevron } from '../../../util/icons';
import ModalHeader from '../modal-header.component';
import { ScrollablePage } from '../shared-styled.components';
import { color } from '../../../infrastructure/theme/color';
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

    
    padding:${props=>props.theme.space[1]};
    borderBottomWidth:0.2px;
`
const ItemText = styled(Text)`
marginLeft:${props=>props.theme.space[2]};

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
    name: checkmarkIcon,
    size: 25,

}))`
`

const RadioButtonWrapper = styled(View)`
    width:20px;
    height:20px;
    borderRadius:10px;
    alignItems:center;
    justifyContent:center;
    backgroundColor:${props => props.theme.color.lightGreen};
`
const RadioButton = styled(View)`
width:16px;
height:16px;
borderRadius:8px;
alignItems:center;
backgroundColor:${props => props.isSelected ? props.theme.color.darkGreen : props.theme.color.lightGray};
`
const MultipleSelectListModal = ({
    selectListModalVisible,
    hideSelectListModal,
    selectItems = [],
    selectedItems = [],

    onSelected,
    propertyName = null,

}) => {

    return (
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
                                        <ItemTouchable onPress={() => onSelected(item)}
                                            isSelected={selectedItems.includes(item)}

                                        >
                                            <RadioButtonWrapper>
                                                <RadioButton isSelected={selectedItems.includes(item)}>

                                                </RadioButton>
                                            </RadioButtonWrapper>
                                            <ItemText>
                                                {
                                                    propertyName == null ?
                                                        item :
                                                        item[propertyName]
                                                }

                                            </ItemText>
                                            {/* <ItemIcon
                                                color={selectedItems.includes(item) ? color.succes : "black"}

                                            /> */}
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
}

export default React.memo(MultipleSelectListModal);
