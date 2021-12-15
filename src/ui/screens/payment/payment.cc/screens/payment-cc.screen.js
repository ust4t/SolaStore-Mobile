import React, { Component } from 'react';
import { View, Text, InteractionManager } from 'react-native';

import { SafeArea } from '../../../../components/shared-styled.components';

class PaymentCC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rsp: null
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getForm()
        })
    }


    getForm = async () => {
        let formData = new FormData();
        formData.append("SalesRepID", 9999)
        formData.append("BuyerName", "Сергей Соколов")
        formData.append("BuyerPhone", "5412")
        formData.append("unDiscountedTotal", 60)
        formData.append("paymentType", "CC")
        let rsp = await fetch('https://38f8-159-146-70-60.ngrok.io/Home/Payment', {
            method: "POST",
            headers: {
                cookie: "UserLogin=approved"
            },
            body:formData.toString()
        })
        
        rsp = await rsp.text()
        console.log(rsp)
        this.setState({ rsp })
        // this.setState({ rsp })

    }

    render() {
        let formData = new FormData();
        formData.append("SalesRepID", 9999)
        formData.append("BuyerName", "Сергей Соколов")
        formData.append("BuyerPhone", "5412")
        formData.append("unDiscountedTotal", 60)
        formData.append("paymentType", "CC")
        return (
            <SafeArea>
            
            </SafeArea>
        );
    }
}

export default PaymentCC;
