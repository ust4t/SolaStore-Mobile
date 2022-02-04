import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { checkmarkIcon, forwardChevron } from '../../../../util/icons';
import RepRow from './sales-reps-list-row.component';
import { SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import SalesRepsHeader from './sales-reps-header.component';
import I18n from 'i18n-js';
import { color } from '../../../../infrastructure/theme/color';
const SupWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.white};
    padding:${props => props.theme.space[2]};
    marginTop:${props => props.theme.space[1]};
`
const SubWrapper = styled(TouchableOpacity)`
    flexDirection:row;
    justifyContent:space-between;
    alignItems:center;
`
const PaymentMethodText = styled(Text)`
fontWeight:bold;
fontSize:${props => props.theme.text.subtitle};
`
const PaymentTouchable = styled(View)`
flexDirection:row;
alignItems:center;
`
const SelectedPaymentMethod = styled(Text)`
color:${props => props.theme.color.error};
`
const ChevronIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.primary,
    size: 20,
    name: forwardChevron
}))`
`

const SalesRepsFlatList = styled(FlatList).attrs({
    horizontal: false
})`
`
const SalesRepListView = styled(View)`
    alignItems:center;
`
const InputWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.lightGray};
    borderRadius:${props => props.theme.radius[4]};
    flex:1;
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    padding:${props => props.theme.space[0]};
    paddingLeft:${props => props.theme.space[1]};
  
`
const Input = styled(TextInput)`
    flex:1;
    padding:${props => props.theme.space[2]};

`
const ItemTouchable = styled(TouchableOpacity)`
    flexDirection:row;
    flex:1;
    

    marginTop:${props => props.theme.space[2]};
    padding:${props => props.theme.space[2]};
    borderWidth:1px;
    borderColor:${props => props.theme.color.lightGray};
    borderRadius:${props => props.theme.space[2]};

`
const ItemText = styled(Text)`
marginLeft:${props => props.theme.space[2]};
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


const InputBorderWrapper = styled(View)`
    width:100%;
    borderWidth:${props => props.wrongOrderInfos ? "0.4px" : "0px"};
    borderColor:${props => props.wrongOrderInfos ? "red" : "white"};
`

const PaymentMethodComponent = ({


    salesReps = [{}],
    selectedRepId,
    onRepSelected,

    name,
    phone,
    onPhoneChanged,
    onNameChanged,

    selectedPaymentMethodName,
    onPaymentMethodSelected,
    specifiedWidth,

    wrongOrderInfos
}) => {
    const options = [{ name: I18n.t("$SiparisCariHesapIle"), value: "Order" }, { name: I18n.t("$SiparisKrediKartiIle"), value: "CC" }];
    return (
        <SupWrapper>
            <InputBorderWrapper wrongOrderInfos={wrongOrderInfos}>
                <PaymentMethodText>
                    {I18n.t("$SiparisSiparisBilgileri")}
                </PaymentMethodText>
                <SeperatorFromTopOrBottom />
                <InputWrapper>
                    <Input
                        placeholder={I18n.t("$UyarilarLutfenAdSoyadGiriniz")}
                        value={name}
                        onChangeText={onNameChanged}
                    />
                </InputWrapper>
                <SeperatorFromTopOrBottom />
                <InputWrapper>
                    <Input
                        placeholder={I18n.t("$HesabimTelefon")}
                        value={phone}
                        onChangeText={onPhoneChanged}
                        keyboardType='numeric'
                    />
                </InputWrapper>
            </InputBorderWrapper>

            <SeperatorFromTopOrBottom />

            <SubWrapper>



                <PaymentMethodText>
                    {I18n.t("$OdemeOdemeYontemiSeciniz")}
                </PaymentMethodText>


            </SubWrapper>
            {
                options.map((item, index) => {
                    return (
                        <ItemTouchable key={index} onPress={() => onPaymentMethodSelected(item)}>

                            <RadioButtonWrapper>
                                <RadioButton isSelected={selectedPaymentMethodName == item.name}>

                                </RadioButton>
                            </RadioButtonWrapper>
                            <ItemText>{item.name}</ItemText>
                            {/* <ItemIcon
                                color={selectedPaymentMethodName == item.name ? color.succes : "black"}
                            /> */}
                        </ItemTouchable>
                    )
                })
            }



            <SeperatorFromTopOrBottom />


            <PaymentMethodText>

                {I18n.t("$UyarilarLutfenTemsilciSeciniz")}
            </PaymentMethodText>
            <SeperatorFromTopOrBottom />

            <SalesRepsHeader action={onRepSelected} selectedRepId={selectedRepId} />
            <SeperatorFromTopOrBottom />

            <SalesRepListView >
                <SalesRepsFlatList

                    data={salesReps}
                    numColumns={4}
                    // ListHeaderComponent={<SalesRepsHeader />}
                    renderItem={({ item, index }) => <RepRow item={item} index={index} selectedRepId={selectedRepId} onRepSelected={onRepSelected}
                        specifiedWidth={specifiedWidth} />}
                />
            </SalesRepListView>

        </SupWrapper>
    );

}
export default React.memo(PaymentMethodComponent);
