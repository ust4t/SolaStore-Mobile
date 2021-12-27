//yeni filter modal
import I18n from 'i18n-js';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components';
import ModalHeader from '../../../../components/modal-header.component';
import Icon from 'react-native-vector-icons/Ionicons'
import { cancelIcon } from '../../../../../util/icons';
import { Line, SeperatorFromRightOrLeft, SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';
import PrimaryButton from '../../../../components/primary-button.component';
import SecondaryButton from '../../../../components/secondary-button.component';
const deviceWidth = Dimensions.get("window").width;
const ModalWrapper = styled(View)`
    width:${deviceWidth}px;
    height:100%;
    backgroundColor:${props => props.theme.color.transparentBlack};
   
`
const ContentWrapper = styled(View)`
flex:1;
backgroundColor:${props => props.theme.color.background};
padding:${props => props.theme.space[2]};

`

const Touchable = styled(TouchableOpacity)`
borderRadius:${props => props.theme.radius[1]};
padding:${props => props.theme.space[2]};
backgroundColor:${props => props.theme.color.white};
marginTop:${props => props.theme.space[1]};
`
const Viewable = styled(View)`
borderRadius:${props => props.theme.radius[1]};
padding:${props => props.theme.space[2]};
backgroundColor:${props => props.theme.color.white};
marginTop:${props => props.theme.space[1]};
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
    padding:${props => props.theme.space[2]};
    flexDirection:row;
    alignItems:center;
    backgroundColor:${props => props.theme.color.white};
`
const HeaderText = styled(Text)`
fontWeight:bold;
    fontSize:${props => props.theme.text.subtitle};
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

    padding:${props => props.theme.space[1]};

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
                <HeaderView style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.00,

                    elevation: 1,
                }}>
                    <CloseButtonTouch onPress={hideFilterModal}>
                        <CloseIc />
                    </CloseButtonTouch>
                    <HeaderText>
                        {I18n.t("$AnasayfaFiltre")}
                    </HeaderText>
                </HeaderView>
                <ContentWrapper>
                    {/* <ModalHeader hideModal={hideFilterModal} /> */}




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
                        <TouchableTitle>
                            {I18n.t("$UrunlerSırala")}
                        </TouchableTitle>
                        <TouchableText numberOfLines={1} ellipsizeMode="tail">
                            {selectedSortOption}
                        </TouchableText>
                    </Touchable>

                    <Touchable onPress={showBrandsModal}
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
                        <TouchableTitle>
                            {I18n.t("$DetayliAramaMarkalar")}
                        </TouchableTitle>
                        <TouchableText numberOfLines={1} ellipsizeMode="tail">
                            {
                                selectedBrands.length != 0 ? brandString : I18n.t("$DetayliAramaMarkaSeciniz")
                            }
                        </TouchableText>
                    </Touchable>


                    <Viewable
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
