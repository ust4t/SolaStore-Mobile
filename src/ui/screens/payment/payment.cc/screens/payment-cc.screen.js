import React, { Component, createRef } from 'react';
import { View, Text, InteractionManager } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import { inject, observer } from 'mobx-react';
import { WebView } from 'react-native-webview';
import CcForm from '../components/cc-form.component';
import ScreenHeader from '../../../../components/screen-header.component';
import I18n from 'i18n-js';
import BaseScreen from '../../../../shared/base.screen';
import orderService from '../../../../../services/remote/order.service';


@inject("UserStore", "BusyStore")
@observer
class PaymentCC extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            case: 0
        };
        this.webRef = createRef()
        this.hash = "";
        this.okUrl = "https://www.solastore.com.tr/Home"
        this.failUrl = "https://www.solastore.com.tr/Home/CCError",
            this.rnd = "asdas",
            this.islemtipi = "Auth"
        this.oid = "1"
        this.taksit = "1"
        this.amount = this.props.route.params.total.toString()

    }

    handleUrlChange = async (params) => {
        const { url } = params;
        console.log(url)
        if (!url) return false;
        if (url.includes('/success')) {
            alert("ödeme tamamlandı")
            return false
        }
        if (url.includes('/fail')) {
            alert("ödeme alınamadı")

            return false
        }
        else {
            return true
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            this.getHash()
        })
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

            console.log(dtoResponse)
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
        // var details = {
        //     'clientId': '190200000',
        //     'storetype': '3d_pay',
        //     'hash': 'XYKqt6E5gM7j3ZaI5YBxtM3mWYI=',
        //     'islemtipi': 'Auth',
        //     'amount': '10',
        //     'currency': '949',
        //     'oid': '1',
        //     'okUrl': 'https://www.teststore.com/success.php',
        //     'failUrl': 'https://www.teststore.com/fail.php',
        //     'lang': 'tr',
        //     'rnd': 'asdf',
        //     // 'pan': '5401341234567891',
        //     // 'Ecom_Payment_Card_ExpDate_Year': '26',
        //     // 'Ecom_Payment_Card_ExpDate_Month': '12',
        //     ...values

        // };
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
        console.log(details)
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
        console.log(rsp)
        rsp = await rsp.text()
        console.log(rsp)
        this.setState({
            content: rsp,
            case: 2
        })
        this.props.BusyStore.decrease()
    }

    ///////////////////////
    ///////NAVIGATION
    goBack = () => { this.props.navigation.goBack() }

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





            </SafeArea>
        );
    }
}

export default PaymentCC;
