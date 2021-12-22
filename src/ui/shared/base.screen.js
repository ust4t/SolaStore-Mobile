import React, { Component, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { resultStatus } from '../../util/enums/result-status';
import ErrorModal from '../components/modals/error-modal';
import I18n from 'i18n-js';


class BaseScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            errorModalVisible: false,
            errorMessage: ""
        }
        this._isMounted = true;
    };

    componentWillUnmount() { this._isMounted = false }
    showErrorModal = (errorMessage) => { this.setState({ errorModalVisible: true, errorMessage: errorMessage }) }
    hideErrorModal = () => this.setState({ errorModalVisible: false })
    RenderErrorModal = () => <ErrorModal errorModalVisible={this.state.errorModalVisible} hideErrorModal={this.hideErrorModal} errorMessage={this.state.errorMessage} />


    doRequestAsync = async (requestFunc, showLoadingModal = true) => {
        try {
            if (showLoadingModal) this.props.BusyStore.increase()
            let response = await requestFunc()

         
           

            if (response.resultStatus == resultStatus.success) {
                return response.data
            } else if (response.resultStatus == resultStatus.noContent) {
                return []
             } else if (response.resultStatus == resultStatus.notFound) {
                return "notFound"
             }
            else throw new Error(response.errorMessage)
        } catch (error) {
            console.log(error)
            if (this._isMounted) this.showErrorModal(error.message ? error.message : I18n.t("$UyarilarBirHataOlustu"));

        } finally {
            (this._isMounted && showLoadingModal) && this.props.BusyStore.decrease();
        }
    }

}

export default BaseScreen;