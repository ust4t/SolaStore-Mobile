import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';
import BaseScreen from '../../../shared/base.screen';
import { inject, observer } from 'mobx-react';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import ScreenHeader from '../../../components/screen-header.component';
import Row from '../components/checkout-list-row.component';
import styled from 'styled-components';
import PaymentMethod from '../components/payment-method.component';
import orderService from '../../../../services/remote/order.service';
import basketService from '../../../../services/remote/basket.service';
import Footer from '../../basket/components/basket-footer.component';
import { showToast } from '../../../../util/toast-message';
import I18n from 'i18n-js';
import { TabActions } from '@react-navigation/routers';

const CheckoutItemsFlatList = styled(FlatList).attrs({
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 200
    }
})`

`




@inject("UserStore", "BusyStore")
@observer
class CheckoutScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            products: [],
            reps: [{}],
            items: [],
            totalPrice: "",


            selectListModalVisible: false,
            selectedPaymentMethodName: I18n.t("$SiparisCariHesapIle"),
            selectedPaymentMethodValue: "Order",
            selectedRepId: 0,


            name: this.props.UserStore.userName != null ? this.props.UserStore.userName + " " + this.props.UserStore.userSurname : "",
            phone: this.props.UserStore.userPhone,





        };
    }

    //////////////////////
    /////MODALS
    hideSelectListModal = () => { this.setState({ selectListModalVisible: false }) }
    showSelectListModal = () => { this.setState({ selectListModalVisible: true }) }
    onSelect = (item) => {
        this.setState({ selectedPaymentMethodValue: item.value, selectedPaymentMethodName: item.name }, () => {
            this.hideSelectListModal()
        })
    }
    onRepSelected = (selectedRepId) => {
        this.setState({ selectedRepId })
    }

    //////////////////////
    /////NAVIGATION
    goBack = () => { this.props.navigation.goBack() }
    jumpHome = () => { this.props.navigation.jumpTo("homeNavigator") }
    goToUserTab = () => { this.props.navigation.jumpTo("userNavigator") }
    goToPaymentCC = () => { this.props.navigation.navigate("PaymentCC",{
        total:this.state.totalPrice
    }) }
    goToPayment = async () => {


        if (this.state.name.length == "" || this.state.phone.length == "") {
            this.showErrorModal(I18n.t("$UyarilarSiparisBilgileriniEksiksizDoldurunuz"))
            return;
        } if (this.state.selectedRepId == 0) {
            this.showErrorModal(I18n.t("$UyarilarLutfenTemsilciSeciniz"))
            return;
        }
        if (this.state.selectedPaymentMethodValue == "Order") {
            let dtoResponse = await this.doRequestAsync(() => orderService.createOrder(
                this.state.name,
                this.state.phone,
                this.state.selectedRepId,
                this.state.selectedPaymentMethodValue
            ))
         
            if (dtoResponse) {
                this.props.UserStore.orderId=dtoResponse;
                this.props.navigation.jumpTo("orderDetailNavigator")
            }
        }
        if (this.state.selectedPaymentMethodValue == "CC") {
            this.goToPaymentCC()
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getReps()
            this.getBasketItems()
        })
    }
    //////////////////////
    /////REQUESTS
    getReps = async () => {
        let data = await this.doRequestAsync(orderService.GetSalesReps);
        if (data) {
            this.setState({ reps: data })
        }
    }
    getBasketItems = async () => {
        let data = await this.doRequestAsync(basketService.getBasketItems);
        if (data) {
            let total = 0;
            data.map((item, index) => {
                total += item.price * item.quantity;
            })
            this.setState({
                items: data,
                totalPrice: total
            })
        }
    }



    ////////////////////
    //////STATES
    onNameChanged = (text) => { this.setState({ name: text }) }
    onPhoneChanged = (text) => { this.setState({ phone: text }) }
    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("$OdemeOdeme")} goBack={this.goBack} />


                <CheckoutItemsFlatList
                    ListHeaderComponent={<PaymentMethod
                        salesReps={this.state.reps}
                        showSelectListModal={this.showSelectListModal}
                        selectedPaymentMethodName={this.state.selectedPaymentMethodName}
                        selectedRepId={this.state.selectedRepId}
                        onRepSelected={this.onRepSelected}
                        name={this.state.name}
                        phone={this.state.phone}
                        onNameChanged={this.onNameChanged}
                        onPhoneChanged={this.onPhoneChanged}
                        onPaymentMethodSelected={this.onSelect}
                        selectedPaymentMethodName={this.state.selectedPaymentMethodName} />}
                    data={this.state.items}
                    renderItem={({ item, index }) => <Row item={item} index={index} />}
                />

                <Footer totalPrice={this.state.totalPrice} action={this.goToPayment} label={I18n.t("$OdemeTamamla")} text="Total" />

                <this.RenderErrorModal />



            </SafeArea>
        );
    }
}

export default CheckoutScreen;
