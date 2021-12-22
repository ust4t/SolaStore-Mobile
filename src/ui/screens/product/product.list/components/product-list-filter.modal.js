//yeni filter modal
import I18n from 'i18n-js';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components';
import ModalHeader from '../../../../components/modal-header.component';
import Icon from 'react-native-vector-icons/Ionicons'
import { cancelIcon } from '../../../../../util/icons';
import { SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
import PrimaryButton from '../../../../components/primary-button.component';
import SecondaryButton from '../../../../components/secondary-button.component';
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

    backgroundColor:${props => props.theme.color.white};

    padding:${props => props.theme.space[2]};

`

const Touchable = styled(TouchableOpacity)`
padding:${props => props.theme.space[1]};
borderBottomWidth:0.3px;
borderColor:${props => props.theme.color.black};
`
const Viewable = styled(View)`
padding:${props => props.theme.space[1]};
borderBottomWidth:0.3px;
borderColor:${props => props.theme.color.black};
`
const TouchableTitle = styled(Text)`
    fontWeight:bold;
    fontSize:${props => props.theme.text.subtitle};
`
const TouchableText = styled(Text)`
    color:${props => props.theme.color.primary};
`
const HeaderView = styled(View)`
    width:100%;
    padding:${props => props.theme.space[1]};
    flexDirection:row;
    alignItems:center;
`
const HeaderText = styled(Text)`

`

const CloseButtonTouch = styled(TouchableOpacity)`

paddingRight:${props => props.theme.space[2]};
    
`
const CloseIc = styled(Icon).attrs(props => ({
    size: 30,
    name: cancelIcon,
    color: props.theme.color.black
}))``

const RangeView = styled(View)`
width:100%;
flexDirection:row;
alignItems:center;
padding:${props => props.theme.space[1]};


`
const RangeInput = styled(TextInput)`
flex:1;
`
const InputWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.lightGray};
    borderRadius:${props => props.theme.radius[4]};
 
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    padding:${props => props.theme.space[0]};
    
`
const InputWithTextWrapper = styled(View)`
    alignItems:center;
    padding:${props => props.theme.space[1]};
    flex:1;
  
   
`
const Label = styled(Text)`
`

const Footer = styled(View)`
    flexDirection:row;

`
const ProductListFilterModal = ({
    filterModalVisible,
    hideFilterModal,

    showBrandsModal,
    // selectedCategories,
    selectedBrands,

    minPrice,
    maxPrice,


    onMaxPriceChanged,
    onMinPriceChanged,



    createParameters,

    clearFilter,


    selectedSortOption,
    showSortModal

}) => {
    // let categoryString = "";
    let brandString = "";
    // selectedCategories.map((item) => {
    //     if (categoryString == "") categoryString += `${item.selectedCategoryName}`
    //     else categoryString += ` , ${item.selectedCategoryName}`
    // })
    selectedBrands.map((item) => {
        if (brandString == "") brandString += `${item.brandName}`
        else brandString += ` , ${item.brandName}`
    })
    return (
        <Modal
            visible={filterModalVisible}
            transparent={true}
            animationType="none"
            onRequestClose={hideFilterModal}>

            <ModalWrapper>

                <ContentWrapper>
                    {/* <ModalHeader hideModal={hideFilterModal} /> */}
                    <HeaderView>
                        <CloseButtonTouch onPress={hideFilterModal}>
                            <CloseIc />
                        </CloseButtonTouch>
                        <HeaderText>
                            {I18n.t("$AnasayfaFiltre")}
                        </HeaderText>
                    </HeaderView>


                    {/* <Touchable onPress={showCategoriesModal}>
                        <TouchableTitle>
                            {I18n.t("$DetayliAramaKategoriler")}
                        </TouchableTitle>
                        <TouchableText numberOfLines={1} ellipsizeMode="tail">
                            {
                                selectedCategories.length != 0 ? categoryString : I18n.t("$DetayliAramaMarkaSeciniz")
                            }


                        </TouchableText>
                    </Touchable> */}
                    <Touchable
                        onPress={showSortModal}
                    >
                        <TouchableTitle>
                            {I18n.t("$UrunlerSırala")}
                        </TouchableTitle>
                        <TouchableText numberOfLines={1} ellipsizeMode="tail">
                            {selectedSortOption}
                        </TouchableText>
                    </Touchable>

                    <Touchable onPress={showBrandsModal}>
                        <TouchableTitle>
                            {I18n.t("$DetayliAramaMarkalar")}
                        </TouchableTitle>
                        <TouchableText numberOfLines={1} ellipsizeMode="tail">
                            {
                                selectedBrands.length != 0 ? brandString : I18n.t("$DetayliAramaMarkaSeciniz")
                            }
                        </TouchableText>
                    </Touchable>


                    <Viewable>

                        <TouchableTitle>
                            {I18n.t("$UrunlerFiyatAraligi")}
                        </TouchableTitle>

                        <RangeView>
                            <InputWithTextWrapper>
                                <Label>Min</Label>
                                <InputWrapper>
                                    <RangeInput value={minPrice.toString()} onChangeText={onMinPriceChanged}
                                        keyboardType="numeric" />
                                </InputWrapper>
                            </InputWithTextWrapper>


                            <SeperatorFromRightOrLeft />
                            <InputWithTextWrapper>
                                <Label>Max</Label>
                                <InputWrapper>
                                    <RangeInput value={maxPrice.toString()} onChangeText={onMaxPriceChanged} keyboardType="numeric" />
                                </InputWrapper>
                            </InputWithTextWrapper>


                        </RangeView>

                    </Viewable>

                    <View style={{ flex: 1 }}></View>


                    <Footer>
                        <PrimaryButton text={I18n.t("$UrunlerFiltrele")} action={createParameters} />
                        <SeperatorFromRightOrLeft />
                        <SecondaryButton text={I18n.t("$KategoriHepsiniTemizle")} action={clearFilter} />
                    </Footer>


                </ContentWrapper>

            </ModalWrapper>

        </Modal>
    );
}

export default React.memo(ProductListFilterModal);
