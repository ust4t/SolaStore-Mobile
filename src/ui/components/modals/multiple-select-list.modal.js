import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { checkmarkIcon, forwardChevron } from '../../../util/icons';
import ModalHeader from '../modal-header.component';
import { ScrollablePage } from '../shared-styled.components';
import { color } from '../../../infrastructure/theme/color';
import i18n from 'i18n-js';
const deviceWidth = Dimensions.get("window").width;
const ModalWrapper = styled(SafeAreaView)`
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

    borderRadius:${props => props.theme.radius[1]};
    padding:${props => props.theme.space[2]};
    backgroundColor:${props => props.theme.color.white};
`
const ItemText = styled(Text)`
marginLeft:${props => props.theme.space[2]};
fontWeight:bold;


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
            animationType="fade"
            onRequestClose={hideSelectListModal}>
            <ModalWrapper>
                <ContentWrapper >
                    <ModalHeader hideModal={hideSelectListModal} />
                    <ModalScroll
                        contentContainerStyle={{
                            padding: 10
                        }}
                    >
                        <ItemView style={{

                        }}>
                            <ItemTouchable onPress={() => onSelected(null,)}
                                //inludes yerine bir liste içinde isselected false ya da true sonra indexof ile bakılabilir
                                isSelected={selectItems.length == selectedItems.length}
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.18,
                                    shadowRadius: 1.00,

                                    elevation: 1,
                                }}
                            >
                                <RadioButtonWrapper>
                                    <RadioButton isSelected={selectItems.length == selectedItems.length}>

                                    </RadioButton>
                                </RadioButtonWrapper>
                                <ItemText numberOfLines={1} ellipsizeMode='tail'>
                                    {
                                        selectedItems.length ==selectItems.length  ?
                                        i18n.t("$KategoriHepsiniTemizle"):
                                        i18n.t("$AnaSayfaHepsiniSec")
                                        
                                    }
                                    

                                </ItemText>

                            </ItemTouchable>
                        </ItemView>
                        {
                            selectItems.map((item, index) => {
                                return (
                                    <ItemView key={index} style={{

                                    }}>
                                        <ItemTouchable onPress={() => onSelected(item)}
                                            //inludes yerine bir liste içinde isselected false ya da true sonra indexof ile bakılabilir
                                            isSelected={selectedItems.includes(item)}
                                            style={{
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.18,
                                                shadowRadius: 1.00,

                                                elevation: 1,
                                            }}
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
