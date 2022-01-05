import React, { Component } from 'react';
import { View, Text, InteractionManager, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import orderService from '../../../../../services/remote/order.service';
import ScreenHeader from '../../../../components/screen-header.component';
import { ErrorText, SafeArea, SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import OrderDetailItem from '../components/order-detail-item-row.component';
import { inject, observer } from 'mobx-react';
import I18n from 'i18n-js';
import PrimaryButton from '../../../../components/primary-button.component';

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

const OrderInfoText = styled(Text)`
    textAlign:center;
    width:100%;
    fontSize:${props => props.theme.text.subtitle};
   
    color:${props => props.theme.color.succes};


`
const UncompletedOrderInfoText = styled(Text)`
textAlign:center;
width:100%;
fontSize:${props => props.theme.text.subtitle};

color:${props => props.theme.color.error};
`
const OrderInfoHeader = styled(View)`
    alignItems:center;
    width:100%;
    padding:${props => props.theme.space[2]};
    backgroundColor:${props => props.theme.color.white};
`

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
   
`

@inject("BusyStore", "UserStore")
@observer
class OrderDetail extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            orderItems: [],
            totalAmount: ""
        };
    }

    ////////////////
    ////LIFECYCLES
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getDetail()
        })
    }
    componentWillUnmount() {
        this.props.UserStore.orderId = null;
    }

    ////////////////
    ////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }



    getDetail = async () => {

        let rsp = await this.doRequestAsync(() => orderService.getOrderDetail(
            this.props.UserStore.orderId != null ? Math.abs(this.props.UserStore.orderId) :
                this.props.route.params.orderId
        ))
        if (rsp) {
            let total = 0;
            rsp.map((item) => {
                total += item.price * item.quantity
            })
            this.setState({ orderItems: rsp, totalAmount: total })
        }
    }


    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("$SiparisSiparisDetay")} goBack={this.goBack} />
                {
                    this.props.UserStore.orderId != null &&
                    <OrderInfoHeader>
                        {this.props.UserStore.orderId < 0 ?
                            <UncompletedOrderInfoText>{this.props.UserStore.orderMessage}</UncompletedOrderInfoText> :
                            <OrderInfoText>{this.props.UserStore.orderMessage} {I18n.t("$SiparisSiparisNo")}:{this.props.UserStore.orderId}</OrderInfoText>
                        }

                        <SeperatorFromTopOrBottom />
                        <Touchable onPress={this.goBack}>
                            <TouchableText>
                                {I18n.t("$SiparisAlisveriseDevamEt")}
                            </TouchableText>

                        </Touchable>

                    </OrderInfoHeader>
                }
                <ItemsFlatList
                    data={this.state.orderItems}
                    renderItem={({ item, index }) => <OrderDetailItem item={item} index={index} />}
                />


                <Footer>
                    <SubTotalText>
                        {I18n.t("$AnaSayfaToplam")}
                    </SubTotalText>
                    <SubTotalPriceText>
                        $ {this.state.totalAmount}
                    </SubTotalPriceText>
                </Footer>

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default OrderDetail;
