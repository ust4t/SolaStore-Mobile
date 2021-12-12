import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { forwardChevron } from '../../../../../util/icons';
import ModalHeader from '../../../../components/modal-header.component';
import { List } from 'react-native-paper';
import { ScrollablePage, SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
import RangeSlider from 'rn-range-slider';
import PrimaryButton from '../../../../components/primary-button.component';
import SecondaryButton from '../../../../components/secondary-button.component';
import I18n from 'i18n-js';


const ModalWrapper = styled(View)`
    width:100%;
    height:100%;
    position:absolute;
    zIndex:99;
    backgroundColor:${props => props.theme.color.white};


`
// const ContentWrapper = styled(View)`
//     minWidth:200px;
//     padding:${props => props.theme.space[2]};
//     borderRadius:${props => props.theme.space[3]};
//     backgroundColor:${props => props.theme.color.white};
//     justifyContent:center;
//     alignItems:center;

// `
// const ItemTouchable = styled(TouchableOpacity)`
//     flexDirection:row;
//     justifyContent:space-between;
//     width:200px;
//     marginTop:${props => props.theme.space[2]};

// `
const ItemText = styled(Text)`

`

const ItemIcon = styled(Icon).attrs(props => ({
    name: forwardChevron,
    size: 20,
    color: props.theme.color.primary
}))`
`

const InputsWrapper = styled(View)`
    width:100%;
    flexDirection:row;
    alignItems:center;
    padding:${props => props.theme.space[2]};
   
`
const InputWithTextWrapper = styled(View)`
    alignItems:center;
    padding:${props => props.theme.space[1]};
    flex:1;
   
`
const Label = styled(Text)`
`
const InputWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.lightGray};
    borderRadius:${props => props.theme.radius[4]};
    flex:1;
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    padding:${props => props.theme.space[0]};
    
`
const Input = styled(TextInput)`
    flex:1;
`
const ItemTouchable = styled(TouchableOpacity)`

`
// const Input = styled(TextInput)`
// `

const Footer=styled(View)`
position:absolute;
bottom:0;
width:100%;
flexDirection:row;

padding:${props => props.theme.space[1]};
`


const FilterModal = ({
    filterModalVisible,
    hideFilterModal,
    subCategories,
    brands,
    onCategorySelected,
    onBrandSelected,

    minPrice,
    maxPrice,

    onMaxPriceChanged,
    onMinPriceChanged,


    onMaxPriceEdited,
    onMinPriceEdited,


    createParameters,

    clearFilter

}) => (
    <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideFilterModal}>
        <ModalWrapper>
            <ModalHeader hideModal={hideFilterModal} />
            <ScrollablePage>
                <InputsWrapper>

                    <InputWithTextWrapper>
                        <Label>Min {I18n.t("price")}</Label>
                        <InputWrapper>
                            <Input value={minPrice.toString()} onChangeText={onMinPriceChanged} onEndEditing={onMinPriceEdited}
                            keyboardType="numeric" />
                        </InputWrapper>
                    </InputWithTextWrapper>



                    <InputWithTextWrapper>
                        <Label>Max {I18n.t("price")}</Label>

                        <InputWrapper>
                            <Input value={maxPrice.toString()} onChangeText={onMaxPriceChanged} onEndEditing={onMaxPriceEdited} keyboardType="numeric"/>
                        </InputWrapper>
                    </InputWithTextWrapper>

                </InputsWrapper>

                <List.Accordion
                    title={I18n.t("categories")}
                // left={props => <List.Icon {...props} icon="folder" />}
                >
                    {
                        subCategories.map((item, index) => {

                            return <ItemTouchable key={index} onPress={() => onCategorySelected(item.categoryID)}>
                                <List.Item title={item.selectedCategoryName}
                                    style={{ borderLeftColor: item.isSelected ? 'green' : "white", borderLeftWidth: 3 }}
                                />
                            </ItemTouchable>
                        })
                    }


                </List.Accordion>

                <List.Accordion
                    title={I18n.t("brands")}
                // left={props => <List.Icon {...props} icon="folder" />}
                >
                    {
                        brands.map((item, index) => {
                            return <ItemTouchable key={index} onPress={() => onBrandSelected(item.brandID)}>
                                <List.Item key={index} title={item.brandName}
                                    style={{ borderLeftColor: item.isSelected ? 'green' : "white", borderLeftWidth: 3 }}
                                />
                            </ItemTouchable>

                        })
                    }


                </List.Accordion>




            </ScrollablePage>


            <Footer>
                <PrimaryButton text={I18n.t("perform")} action={createParameters} />
                <SeperatorFromRightOrLeft />
                <SecondaryButton text={I18n.t("clear")} action={clearFilter}/>
            </Footer>




        </ModalWrapper>

    </Modal>
);

export default React.memo(FilterModal);
