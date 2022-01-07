import React, { Component, createRef } from 'react';
import { View, Text, InteractionManager, BackHandler, ActivityIndicator } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import { inject, observer } from 'mobx-react';
import { WebView } from 'react-native-webview';
import CcForm from '../components/cc-form.component';
import ScreenHeader from '../../../../components/screen-header.component';
import I18n from 'i18n-js';
import BaseScreen from '../../../../shared/base.screen';
import orderService from '../../../../../services/remote/order.service';
import PermissionModal from '../../../../components/modals/permission-modal.component';
import styled from 'styled-components';

const IndicatorWrapper = styled(View)`
position:absolute;
width:100%;
height:100%;
alignItems:center;
justifyContent:center;
zIndex:-99;
`
const MyIndicator = styled(ActivityIndicator).attrs(props => ({
    size: 30,
    color: props.theme.color.primary
}))`



`

@inject("UserStore", "BusyStore")
@observer
class PaymentCC extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            content: null,
            case: 0,
            permissionModalVisible: false,
            indicatorVisible: false
        };
        this.baseUrl = "https://api.solastore.com.tr/api/";
        this.paymentSuccessUrl = "http://uselesswebsiteurlsuccess.com";
        this.paymentFailUrl = "http://uselesswebsiteurlfail.com";
        this.webRef = createRef()
        this.hash = "";
        this.okUrl = this.baseUrl + "Helpers/CCSuccess";
        this.failUrl = this.baseUrl + "Helpers/CCFail";
        this.rnd = new Date().toJSON();
        this.islemtipi = "Auth";
        this.oid = this.props.route.params.orderId;
        this.taksit = "";
        this.amount = this.props.route.params.total.toString();

    }

    //////////////////////
    //////MODAL
    showPermissionModal = () => { this.setState({ permissionModalVisible: true }) }
    hidePermissionModal = () => { this.setState({ permissionModalVisible: false }) }
    onAccepted = () => {
        this.props.UserStore.orderId = -1 * this.props.UserStore.orderId;
        this.props.UserStore.orderMessage = I18n.t("$OdemeOdemeYapilmadi")
        this.jumpToOrderDetail()
    }



    //////////////////////
    //////NAVIGATION
    jumpToOrderDetail = () => { this.props.navigation.jumpTo("orderDetailNavigator") }

    handleUrlChange = async (params) => {

        const { url } = params;
        //console.log("\n" + url + "\n")
        // console.log(this.webRef.current)
        // if (this.webRef.current.props.source.html == "") this.setState({ indicatorVisible: true })
        // else this.setState({ indicatorVisible: false })
        if (!url) return false;
        if (url.includes(this.paymentSuccessUrl)) {
            this.props.UserStore.orderMessage = I18n.t("$UyarilarSiparisinizAlinmistir")
            this.setState({
                case: 3
            }, () => {
                this.jumpToOrderDetail()
            })
            // let rsp = await this.doRequestAsync(() => orderService.completeOrder(this.oid))
            // console.log(rsp)
            // if (rsp) {
            //     this.jumpToOrderDetail()
            // }

            return false
        }
        if (url.includes(this.paymentFailUrl)) {
            this.props.UserStore.orderId = -1 * this.props.UserStore.orderId;
            this.props.UserStore.orderMessage = I18n.t("$OdemeOdemeYapilmadi")
            this.setState({
                case: 3
            }, () => {
                this.jumpToOrderDetail()
            })
            // this.setState({ case: 1 })
            // this.showErrorModal(I18n.t("$SiparisHataliKrediKartiBilgileri"))
            return false
        }
        // else {

        // }
        return true
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                this.showPermissionModal()
                return true;
            }
        )
        InteractionManager.runAfterInteractions(async () => {
            this.getHash()

        })
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }

    getHash = async () => {
        let dtoResponse = await this.doRequestAsync(() => orderService.generateHash(
            this.oid,
            this.amount,
            this.okUrl,
            this.failUrl,
            this.islemtipi,
            this.taksit,
            this.rnd
        ))
        if (dtoResponse) {
            this.hash = dtoResponse.hash;
            this.setState({
                case: 1
            })
        }
    }

    handleSubmit = (values) => {
        this.postTo3dGate(
            {
                pan: values.no.replace(/-/g, ""),
                Ecom_Payment_Card_ExpDate_Year: values.year.substring(3, 5),
                Ecom_Payment_Card_ExpDate_Month: values.year.substring(0, 2),
            }
        )
    }
    postTo3dGate = async (values) => {
        this.props.BusyStore.increase()
        var details = {
            'clientId': '190320263',
            'storetype': '3d_pay',
            'hash': this.hash,
            'islemtipi': this.islemtipi,
            'amount': this.amount,
            'currency': '840',
            'okUrl': this.okUrl,
            'failUrl': this.failUrl,
            'lang': I18n.locale.substring(0, 2),
            'oid': this.oid,
            'rnd': this.rnd,
            'sourceProof':"ugurturkmenn@gmail.com",
            // 'pan': '5401341234567891',
            // 'Ecom_Payment_Card_ExpDate_Year': '26',
            // 'Ecom_Payment_Card_ExpDate_Month': '12',
            ...values

        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var rsp = await fetch(
            'https://sanalpos2.ziraatbank.com.tr/fim/est3Dgate',
            // 'https://entegrasyon.asseco-see.com.tr/fim/est3Dgate',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        rsp = await rsp.text()
        this.setState({
            case: 2
        }, () => {
            this.setState({
                content: rsp
            })
        })
        // this.setState({
        //     content: rsp,
        //     case: 2
        // })
        this.props.BusyStore.decrease()
    }

    ///////////////////////
    ///////NAVIGATION
    goBack = () => { this.showPermissionModal() }

    render() {

        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("$OdemeOdeme")} goBack={this.goBack} />
                {
                    this.state.case == 1 &&
                    <CcForm handleSubmit={this.handleSubmit} />
                }
                {
                    this.state.case == 2 && this.state.content &&
                    <WebView
                        ref={this.webRef}
                        style={{ flex: 1, resizeMode: 'cover' }}
                        originWhitelist={['*']}
                        scalesPageToFit={false}
                        onNavigationStateChange={this.handleUrlChange}
                        javaScriptEnabled
                        domStorageEnabled
                        startInLoadingState
                        mixedContentMode="always"
                        source={{ html: this.state.content }}

                    />
                }
                {/* {
                    this.state.case == 2 && this.state.indicatorVisible &&
                    < IndicatorWrapper >
                        <MyIndicator />
                    </IndicatorWrapper>
                } */}


                <PermissionModal
                    permissionModalVisible={this.state.permissionModalVisible}
                    hidePermissionModal={this.hidePermissionModal}
                    acceptMessage={I18n.t("$DetayliAramaTamam")}
                    onAccepted={this.onAccepted}
                    warningMessage={I18n.t("$UyariOdemeYapilmadi")}
                />


                <this.RenderErrorModal />





            </SafeArea >
        );
    }
}

export default PaymentCC;
