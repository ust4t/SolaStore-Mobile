import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import productService from '../../../../services/remote/product.service';
import { resultStatus } from '../../../../util/enums/result-status';
import { SafeArea } from '../../../components/shared-styled.components';
import Tabbar from '../../../components/tabbar.component';
import BaseScreen from '../../../shared/base.screen';
import SearchBar from '../../home/components/search-bar.component';
import ProductListRow from '../../product/product.list/components/product-list-row.component';
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



class SearchScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchText: "",


            loading: false
        };
        this.timeOuts = []
    }

    /////////////////////////
    //////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }
    goToProductDetail = (productId) => { this.props.navigation.navigate("ProductDetail", { productId }) }
    showLoading = () => { this.setState({ loading: true }) }
    hideLoading = () => { this.setState({ loading: false }) }

    onChangeText = (text) => {
        this.setState({
            searchText: text
        }, () => {
            if (text.length >= 3) {
                this.timeOuts.map((item, index) => {
                    clearTimeout(item)
                })
                this.timeOuts.push(setTimeout(() => { this.search(text) }, 500))
            }
        })
    }
    search = async (text) => {
        try {
            this.showLoading()
            let response = await productService.searchProducts(text)
            if (response.resultStatus == resultStatus.success) {
                this.setState({ products: response.data })
            }
        } catch (error) {

        } finally {
            this.hideLoading()
        }
    }

    render() {
        return (
            <SafeArea>
                <SearchBar goToBasket={this.goToBasket} searchText={this.state.searchText} onChangeText={this.onChangeText}
                    loading={this.state.loading} />
                <Tabbar navigation={this.props.navigation} navigatorName={"searchNavigator"} />
                <PageWrapper>
                    <FlatListOfProducts
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={this.state.products}
                        renderItem={({ item, index }) => <ProductListRow
                            item={item}
                            index={index}
                            goToProductDetail={this.goToProductDetail}

                        />}
                    />
                </PageWrapper>




            </SafeArea>
        );
    }
}

export default SearchScreen;
