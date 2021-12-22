import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';
import styled from 'styled-components';
import orderService from '../../../../../services/remote/order.service';
import ScreenHeader from '../../../../components/screen-header.component';
import { ErrorText, SafeArea } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import OrderListRow from '../components/order-list-row.component';
import { inject, observer } from 'mobx-react';
import I18n from 'i18n-js';
const OrdersFlatList = styled(FlatList).attrs(props => ({
    contentContainerStyle: {
        paddingBottom:200
    }
}))`

`

@inject("BusyStore", "UserStore")
@observer
class OrderListScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            orders: []
        };
    }

    ///////////////////
    //////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }
    goToDetail = (orderId, totalAmount) => { this.props.navigation.navigate("OrderDetail", { orderId, totalAmount }) }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getOrder()
        })
    }



    getOrder = async () => {
        let data = await this.doRequestAsync(orderService.getMyOrders);
        if (data) this.setState({ orders: data })
    }
    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("myOrders")} goBack={this.goBack} />

                <OrdersFlatList
                    data={this.state.orders}
                    renderItem={({ item, index }) =>
                        <OrderListRow item={item} index={index}
                            goToDetail={this.goToDetail} />}
                />


                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default OrderListScreen;
