import React, { Component } from 'react';
import { View, Text, InteractionManager, FlatList, TextInput } from 'react-native';
import styled from 'styled-components';
import orderService from '../../../../../services/remote/order.service';
import ScreenHeader from '../../../../components/screen-header.component';
import { SafeArea } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import OrderDetailItem from '../components/order-detail-item-row.component';
import { inject, observer } from 'mobx-react';
import I18n from 'i18n-js';

const ItemsFlatList = styled(FlatList).attrs({
    contentContainerStyle: {
        paddingBottom: 200
    }
})`
    flex:1;
`
const Footer = styled(View)`
    position:absolute;
    bottom:0;
    width:100%;
    flexDirection:row;
    padding:${props => props.theme.space[2]};
    backgroundColor:${props => props.theme.color.white};
    alignItems:center;

`
const SubTotalText = styled(Text)`
    color:${props => props.theme.color.primary};
    flex:1;
`
const SubTotalPriceText = styled(Text)`
color:${props => props.theme.color.error};
fontWeight:bold;
fontSize:${props => props.theme.text.h2};
`

@inject("BusyStore", "UserStore")
@observer
class OrderDetail extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            orderItems: []
        };
    }

    ////////////////
    ////LIFECYCLES
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getDetail()
        })
    }

    ////////////////
    ////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }



    getDetail = async () => {
        let rsp = await this.doRequestAsync(() => orderService.getOrderDetail(this.props.route.params.orderId))
        if (rsp) {
            this.setState({ orderItems: rsp })
        }
    }


    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("orderDetail")} goBack={this.goBack} />
                <ItemsFlatList
                    data={this.state.orderItems}
                    renderItem={({ item, index }) => <OrderDetailItem item={item} index={index} />}
                />


                <Footer>
                    <SubTotalText>
                        {I18n.t("subTotal")}
                    </SubTotalText>
                    <SubTotalPriceText>
                        $ {this.props.route.params.totalAmount}
                    </SubTotalPriceText>
                </Footer>

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default OrderDetail;
