import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import PermissionModal from '../../../components/modals/permission-modal.component';
import ScreenHeader from '../../../components/screen-header.component';
import { SafeArea, ScrollablePage, SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import BaseScreen from '../../../shared/base.screen';
import BasketFooter from '../components/basket-footer.component';
import BasketItem from '../components/basket-items-list-row.component';
import { inject, observer } from 'mobx-react';
import basketService from '../../../../services/remote/basket.service';
import { showToast } from '../../../../util/toast-message';
import Tabbar from '../../../components/tabbar.component';
import I18n from 'i18n-js';
import EmptyBasket from '../components/empty-basket.component';
import favoriteService from '../../../../services/remote/favorite.service';
const BasketItemsFlatList = styled(FlatList).attrs({
    contentContainerStyle: {
        paddingBottom: 200,
        paddingTop: 10
    }
})`

`

@inject("BusyStore", "UserStore")
@observer
class BasketScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            products: [],


            permissionModalVisible: false,
            totalPrice: "",
            favorites: []


        };
        this.unsubscribe = null;
        this.itemToBeDeleted = null;
    }
    //////////////////////
    ////MODALS
    hidePermissionModal = () => { this.setState({ permissionModalVisible: false }) }
    showPermissionModal = (itemToBeDeleted) => {
        this.itemToBeDeleted = itemToBeDeleted;
        this.setState({ permissionModalVisible: true })
    }
    goBack = () => { this.props.navigation.goBack() }
    //////////////////////
    ////NAVIGATIONS
    goToCheckout = () => {
        if (this.state.totalPrice == "") {
            showToast(I18n.t("$CartSepetBos"))
        } else this.props.navigation.navigate("CheckoutScreen")

    }
    goToProductDetail = (productId,secondaryId) => { this.props.navigation.navigate("ProductDetail", { productId, backRouteName: "basketScreen",secondaryId }) }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener("focus", (e) => {
            this.getBasket()
        })
    }
    componentWillUnmount() { this.props.navigation.removeListener(this.unsubscribe) }

    getBasket = async () => {
        this.props.BusyStore.increase()
        let data = await this.doRequestAsync(basketService.getBasketItems)
        if (data) {
            let total = 0;
            data.map((item, index) => {
                total += item.price * item.quantity;
            })
            this.setState({
                products: data,
                totalPrice: total
            }, async () => {
                if (total == "0") {
                    await this.getFavorites()
                }
            })
        }
        this.props.BusyStore.decrease()
    }
    getFavorites = async () => {
        let resp = await this.doRequestAsync(favoriteService.GetUserFavoritesList);
        if (resp) {

            this.setState({
                favorites: resp
            })
        }
    }
    addToBasket = async (productId) => {
        this.props.BusyStore.increase()
        let rsp = await this.doRequestAsync(() => basketService.addToBasket(productId, 1))
        if (rsp) {
            await this.getBasket()
        }
        this.props.BusyStore.decrease()
    }

    deleteItemAsync = async () => {
        this.props.BusyStore.increase()
        let data = await this.doRequestAsync(() => basketService.removeFromBasket(this.itemToBeDeleted))
        if (data) {
            this.hidePermissionModal()
            await this.getBasket()
        }
        this.props.BusyStore.decrease()
    }
    increase = async (productID) => {
        this.props.BusyStore.increase()
        let data = await this.doRequestAsync(() => basketService.IncreaseProductCountInChart(productID))
        if (data) {
            await this.getBasket()
        }
        this.props.BusyStore.decrease()
    }
    decrease = async (productID) => {
        this.props.BusyStore.increase()
        let data = await this.doRequestAsync(() => basketService.DecreaseProductCountInChart(productID))
        if (data) {
            this.getBasket()
        }
        this.props.BusyStore.decrease()
    }

    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("$AnaSayfaSepet")} goBack={this.goBack} />


                {
                    this.state.totalPrice == "0"  ?
                        <EmptyBasket favoritesList={this.state.favorites} goBack={this.goBack} addToBasket={this.addToBasket}
                            goToProductDetail={this.goToProductDetail} />
                        :
                        this.state.totalPrice != ""  &&
                        <>
                            <BasketItemsFlatList
                                data={this.state.products}
                                ListHeaderComponent={
                                    <BasketFooter totalPrice={this.state.totalPrice} action={this.goToCheckout}
                                        position="relative" />
                                }
                                renderItem={({ item, index }) => <BasketItem
                                    item={item}
                                    index={index}
                                    showPermissionModal={this.showPermissionModal}
                                    increase={this.increase}
                                    decrease={this.decrease}
                                    goToProductDetail={this.goToProductDetail} />}
                            />
                        </>
                }






                <PermissionModal
                    permissionModalVisible={this.state.permissionModalVisible}
                    hidePermissionModal={this.hidePermissionModal}
                    acceptMessage={I18n.t("$SepetSil")}
                    onAccepted={this.deleteItemAsync}
                    warningMessage={I18n.t("$SepetUrunSilinsinMi")}
                />


                <this.RenderErrorModal />

                {/* <Tabbar navigation={this.props.navigation} navigatorName={"basketNavigator"} /> */}


            </SafeArea>
        );
    }
}

export default BasketScreen;
