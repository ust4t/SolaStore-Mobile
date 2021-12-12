import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { forwardChevron } from '../../../../util/icons';
import RepRow from './sales-reps-list-row.component';
import { SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import SalesRepsHeader from './sales-reps-header.component';
import I18n from 'i18n-js';
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
    horizontal: true
})`
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


const PaymentMethodComponent = ({
    selectedPaymentMethodName = "Cash",
    salesReps = [],
    showSelectListModal,
    selectedRepId,
    onRepSelected,
    name,
    phone,
    onPhoneChanged,
    onNameChanged

}) => (
    <SupWrapper>
        <PaymentMethodText>
            {I18n.t("myOrderInfos")}
        </PaymentMethodText>
        <SeperatorFromTopOrBottom />
        <InputWrapper>
            <Input
                placeholder={I18n.t("name")}
                value={name}
                onChangeText={onNameChanged}
            // onChangeText={handleChange("name")}
            // onBlur={() => { setFieldTouched("name") }} 
            />
        </InputWrapper>
        <SeperatorFromTopOrBottom />
        <InputWrapper>
            <Input
                placeholder={I18n.t("phone")} 
                value={phone}
                onChangeText={onPhoneChanged}
            // onChangeText={handleChange("name")}
            // onBlur={() => { setFieldTouched("name") }} 
            />
        </InputWrapper>

        <SeperatorFromTopOrBottom />
        <SubWrapper onPress={showSelectListModal}>



            <PaymentMethodText>
                {I18n.t("paymentMethod")}
            </PaymentMethodText>

            <PaymentTouchable >
                <SelectedPaymentMethod>
                    {selectedPaymentMethodName}
                </SelectedPaymentMethod>
                <ChevronIcon />
            </PaymentTouchable>

        </SubWrapper>
        <SeperatorFromTopOrBottom />


        <PaymentMethodText>
          
            {I18n.t("chooseRep")}
            </PaymentMethodText>
        <SeperatorFromTopOrBottom />

        <SalesRepsHeader action={onRepSelected} selectedRepId={selectedRepId} />
        <SeperatorFromTopOrBottom />
        <SalesRepsFlatList
            data={salesReps}
            // ListHeaderComponent={<SalesRepsHeader />}
            renderItem={({ item, index }) => <RepRow item={item} index={index} selectedRepId={selectedRepId} onRepSelected={onRepSelected} />}
        />
    </SupWrapper>
);

export default React.memo(PaymentMethodComponent);
