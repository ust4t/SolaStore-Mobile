import React, { Component, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { resultStatus } from '../../util/enums/result-status';
import ErrorModal from '../components/modals/error-modal';


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

            console.log("base.screen line 28")
            console.log(response)

            if (response.resultStatus == resultStatus.SUCCESS) {
                return response.data
            } else throw new Error(response.errorMessage)
        } catch (error) {
            if (this._isMounted) this.showErrorModal(error.message ? error.message : "Bir Hata İle Karşılaştık :(");

        } finally {
            (this._isMounted && showLoadingModal) && this.props.BusyStore.decrease();
        }
    }

}

export default BaseScreen;