import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { downChevron } from '../../../../util/icons';
import { SeperatorFromRightOrLeft, SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import PrimaryButton from '../../../components/primary-button.component';
import SecondaryButton from '../../../components/secondary-button.component';
import categoryService from '../../../../services/remote/category.service';
import I18n from 'i18n-js';
const Wrapper = styled(View)`
width:100%;
padding:${props => props.theme.space[2]};
backgroundColor:${props => props.theme.color.secondary};
`
const SubWrapper = styled(View)`
width:100%;
alignItems:center;
justifyContent:center;
`
const Header = styled(Text)`
color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.h2};
fontWeight:bold;
`
const Label = styled(Text)`
color:${props => props.theme.color.white};
textAlign:center;
`
const ModalOpenerView = styled(TouchableOpacity)`
    flex:1;
    backgroundColor:${props => props.theme.color.white};
    flexDirection:row;
    alignItems:center;
    padding:${props => props.theme.space[1]};
    borderRadius:${props => props.theme.radius[2]};
`
const OpenerLeft = styled(View)`
    flex:1;
`
const ModalOpenerTextHeader = styled(Text)`
color:${props => props.theme.color.black};
fontWeight:bold;
paddingLeft:${props => props.theme.space[1]};
`
const ModalOpenerText = styled(Text)`
color:${props => props.theme.color.black};
paddingLeft:${props => props.theme.space[2]};
`
const ChevronIcon = styled(Icon).attrs(props => ({
    size: 20,
    name: downChevron
}))`
`
const PriceTouchable = styled(TouchableOpacity)`

flexDirection:row;
alignItems:center;
`

////////////
///BUTTON
const Touchable = styled(TouchableOpacity)`
    backgroundColor:${props => props.theme.color.white};
    borderRadius:${props => props.theme.radius[4]};
    padding:${props => props.theme.space[2]};
    justifyContent:center;
    alignItems:center;
    borderWidth:1px;
    borderColor:${props => props.theme.color.primary};
    width:100%;

`
const TouchableText = styled(Text)`
    color:${props => props.theme.color.black};
    fontWeight:bold;
`
const DetailedSearch = ({
    showCategoriesModal,
    showBrandsModal,

    goToProductListWithSearchParams,
    showPricesModal,
    selectedRange,
    selectedCategories,
    selectedBrands
}) => {
    let categoryString = "";
    let brandString = "";
    selectedCategories.map((item) => {
        if (categoryString == "") categoryString += `${item.selectedCategoryName}`
        else categoryString += ` , ${item.selectedCategoryName}`
    })
    selectedBrands.map((item) => {
        if (brandString == "") brandString += `${item.brandName}`
        else brandString += ` , ${item.brandName}`
    })
    return (
        <Wrapper style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        }}>
            <SubWrapper>
                <Header
                    style={{
                        textShadowColor: "gray",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 2
                    }}
                >{I18n.t("$AnaSayfaDetaylıArama")}</Header>
                <Label>
                    {I18n.t("$AnaSayfaDetaylıAramaAçıklama")}
                </Label>
                <SeperatorFromTopOrBottom />
                <ModalOpenerView onPress={showCategoriesModal}>
                    <OpenerLeft>
                        <ModalOpenerTextHeader>{I18n.t("$AnaSayfaKategoriler")}</ModalOpenerTextHeader>
                        <ModalOpenerText ellipsizeMode="tail" numberOfLines={1}>
                            {
                                selectedCategories.length != 0 ? categoryString : I18n.t("$AnaSayfaKATEGORİSEÇİNİZ")
                            }
                        </ModalOpenerText>
                    </OpenerLeft>

                    <ChevronIcon />

                </ModalOpenerView>
                <SeperatorFromTopOrBottom />

                <ModalOpenerView onPress={showBrandsModal}>
                    <OpenerLeft>
                        <ModalOpenerTextHeader>{I18n.t("$AnaSayfaMarkalar")}</ModalOpenerTextHeader>
                        <ModalOpenerText ellipsizeMode="tail" numberOfLines={1}>
                            {
                                selectedBrands.length != 0 ? brandString : I18n.t("$AnaSayfaMARKASEÇİNİZ")
                            }
                        </ModalOpenerText>
                    </OpenerLeft>

                    <ChevronIcon />

                </ModalOpenerView>
                <SeperatorFromTopOrBottom />

                <ModalOpenerView onPress={showPricesModal}>
                    <OpenerLeft>
                        <ModalOpenerTextHeader>{I18n.t("$AnaSayfaFiyat")}</ModalOpenerTextHeader>
                        <ModalOpenerText ellipsizeMode="tail" numberOfLines={1}>

                            {selectedRange ? selectedRange : "-"}

                        </ModalOpenerText>
                    </OpenerLeft>

                    <ChevronIcon />

                </ModalOpenerView>
                <SeperatorFromTopOrBottom />
                {/*                 
                <PriceTouchable onPress={showPricesModal}>
                    <Label>
                        {selectedRange ? selectedRange : I18n.t("$AnaSayfaFiyat")}
                    </Label>
                    <SeperatorFromRightOrLeft />
                    <ChevronIcon color="white" />
                </PriceTouchable>
                <SeperatorFromTopOrBottom /> */}


                {/* <SecondaryButton text={I18n.t("$AnaSayfaARA")} action={goToProductListWithSearchParams} /> */}

                <Touchable onPress={goToProductListWithSearchParams}>
                    <TouchableText>
                        {I18n.t("$AnaSayfaARA")}
                    </TouchableText>

                </Touchable>





            </SubWrapper>
        </Wrapper>
    );
}

export default React.memo(DetailedSearch);
