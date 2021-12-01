import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import PermissionModal from '../../../components/modals/permission-modal.component';
import ScreenHeader from '../../../components/screen-header.component';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import BasketFooter from '../components/basket-footer.component';
import BasketItem from '../components/basket-items-list-row.component';

const BasketItemsFlatList = styled(FlatList)`

`
class BasketScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{
                name: "Levi's Jeans",
                price: "$76",
                count: 2
            },
            {
                name: "Levi's Jeans",
                price: "$76",
                count: 2
            }],


            permissionModalVisible: false,


        };
    }
    //////////////////////
    ////MODALS
    hidePermissionModal = () => { this.setState({ permissionModalVisible: false }) }
    showPermissionModal = () => { this.setState({ permissionModalVisible: true }) }
    goBack=()=>{this.props.navigation.goBack()}

    deleteItemAsync = async () => {
        this.showPermissionModal()
    }

    render() {
        return (
            <SafeArea>
                <ScreenHeader title="My Cart" goBack={this.goBack} />
                <BasketItemsFlatList
                    data={this.state.products}
                    renderItem={({ item, index }) => <BasketItem item={item} index={index} showPermissionModal={this.showPermissionModal}/>}
                />


                <BasketFooter />

                <PermissionModal
                    permissionModalVisible={this.state.permissionModalVisible}
                    hidePermissionModal={this.hidePermissionModal}
                    acceptMessage="Sil"
                    onAccepted={this.deleteItemAsync}
                    warningMessage="Ürün Silinsin mi?"
                />


            </SafeArea>
        );
    }
}

export default BasketScreen;
