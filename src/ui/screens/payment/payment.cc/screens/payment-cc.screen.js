import React, { Component, createRef } from 'react';
import { View, Text, InteractionManager, BackHandler } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import { inject, observer } from 'mobx-react';
import { WebView } from 'react-native-webview';
import CcForm from '../components/cc-form.component';
import ScreenHeader from '../../../../components/screen-header.component';
import I18n from 'i18n-js';
import BaseScreen from '../../../../shared/base.screen';
import orderService from '../../../../../services/remote/order.service';
import PermissionModal from '../../../../components/modals/permission-modal.component';


@inject("UserStore", "BusyStore")
@observer
class PaymentCC extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            content: null,
            case: 0,
            permissionModalVisible: false
        };
        this.webRef = createRef()
        this.hash = "";
        this.okUrl = "https://www.solastore.com.tr/Home";
        this.failUrl = "https://www.solastore.com.tr/Home/CCError";
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
    onAccepted = () => { this.jumpToOrderDetail() }



    //////////////////////
    //////NAVIGATION
    jumpToOrderDetail = () => { this.props.navigation.jumpTo("orderDetailNavigator") }

    handleUrlChange = async (params) => {
        const { url } = params;
 
        if (!url) return false;
        if (url == this.okUrl) {
            this.jumpToOrderDetail()
        
            return false
        }
        if (url == this.failUrl) {
            this.setState({ case: 1 })
            this.showErrorModal(I18n.t("$SiparisHataliKrediKartiBilgileri"))
            return false
        }
        else {
            return true
        }
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
                pan: values.no.replaceAll("-", ""),
                Ecom_Payment_Card_ExpDate_Year: values.year.substring(3, 5),
                Ecom_Payment_Card_ExpDate_Month: values.year.substring(0, 2),
            }
        )
    }
    postTo3dGate = async (values) => {
        this.props.BusyStore.increase()
        var details = {
            'clientId': '190200000',
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

        var rsp = await fetch('https://entegrasyon.asseco-see.com.tr/fim/est3Dgate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        rsp = await rsp.text()
        this.setState({
            content: rsp,
            case: 2
        })
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
                        style={{ flex: 1, resizeMode: 'cover', }}
                        originWhitelist={['*']}
                        scalesPageToFit={false}
                        onNavigationStateChange={this.handleUrlChange}
                        javaScriptEnabled={true}

                        source={{ html: this.state.content }}
                    />
                }


                <PermissionModal
                    permissionModalVisible={this.state.permissionModalVisible}
                    hidePermissionModal={this.hidePermissionModal}
                    acceptMessage={I18n.t("$DetayliAramaTamam")}
                    onAccepted={this.onAccepted}
                    warningMessage={I18n.t("$SiparisOdemeYapilmadi")}
                />


                <this.RenderErrorModal />





            </SafeArea>
        );
    }
}

export default PaymentCC;
