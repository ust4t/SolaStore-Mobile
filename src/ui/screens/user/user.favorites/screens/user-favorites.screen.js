import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';
import styled from 'styled-components';
import ScreenHeader from '../../../../components/screen-header.component';
import { SafeArea } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import { inject, observer } from 'mobx-react';
import favoriteService from '../../../../../services/remote/favorite.service';
import ProductListRow from '../../../product/product.list/components/product-list-row.component';
import I18n from 'i18n-js';
const FlatListOfProducts = styled(FlatList).attrs({
    contentContainerStyle: {
        paddingBottom: 200

    }
})`
  
`
const PageWrapper = styled(View)`
    padding:${props => props.theme.space[3]};
    paddingBottom:0px;
    paddingTop:0px;
`

@inject("BusyStore")
@observer
class UserFavoriteListScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            products: []
        };
    }
    /////////////////////////
    //////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }
    goToProductDetail = (productId) => { this.props.navigation.navigate("ProductDetail", { productId }) }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getFavorites()
        })
    }

    ////////////////////////
    ////////REQUESTS
    getFavorites = async () => {
        const data = await this.doRequestAsync(favoriteService.GetUserFavoritesList);
        if (data) {
            this.setState({ products: data })
        }
    }

    removeFavoriteProduct = async (productId) => {
        const data = await this.doRequestAsync(() => favoriteService.DeleteFavoriteProduct(productId));
        if (data) {
            this.setState({
                products: this.state.products.filter(x => x.productID != productId)
            })
        }
    }


    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("favorites")} goBack={this.goBack} />

                <PageWrapper>
                    <FlatListOfProducts
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={this.state.products}
                        renderItem={({ item, index }) => <ProductListRow
                            item={item}
                            index={index}
                            goToProductDetail={this.goToProductDetail}
                            inFavorites={true}
                            removeFavoriteProduct={this.removeFavoriteProduct} />}
                    // ListHeaderComponent={<ProductList />}
                    />
                </PageWrapper>


                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default UserFavoriteListScreen;
