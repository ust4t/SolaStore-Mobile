import React, { Component } from 'react';
import { View, Text, InteractionManager } from 'react-native';
import { SearchBar } from 'react-native-screens';
import categoryService from '../../../../services/remote/category.service';
import { Categories, Products } from '../../../../util/fake-data';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import Tabbar from '../../../components/tabbar.component';
import BaseScreen from '../../../shared/base.screen';
import CategoryList from '../components/category-list.component';
import DiscountedItems from '../components/discounted-items-list.component';
import PopularList from '../components/popular-list.component';
import SearchBarComponent from '../components/search-bar.component';


import { inject, observer } from 'mobx-react';
import productService from '../../../../services/remote/product.service';
@inject("BusyStore")
@observer
class HomeScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            categories: [],
            products: [],
            popularProducts: []
        };
    }
    /////////////////////////
    ///////NAVIGATION
    goToProductDetail = () => { this.props.navigation.navigate("ProductDetail") }
    goToProductList = () => { this.props.navigation.navigate("ProductList") }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getAllCategories()
            this.getDiscountedProducts()
            this.getBestSellers()
        })
    }

    getAllCategories = async () => {
        let dtoRepsonse = await this.doRequestAsync(categoryService.getAllCategories)
        if (dtoRepsonse) {

            this.setState({
                categories: dtoRepsonse
            })
        }
    }
    getDiscountedProducts = async () => {
        let dtoRepsonse = await this.doRequestAsync(productService.GetSaleProducts)
        if (dtoRepsonse) {
            this.setState({
                products: dtoRepsonse
            })
        }
    }
    getBestSellers = async () => {
        let dtoRepsonse = await this.doRequestAsync(productService.GetBestSellerProducts)
        if (dtoRepsonse) {
            this.setState({
                popularProducts: dtoRepsonse
            })
        }
    }





    render() {
        return (
            <SafeArea>
                <ScrollablePage>
                    <SearchBarComponent goToBasket={this.goToBasket} />
                    <CategoryList categories={this.state.categories} goToProductList={this.goToProductList} />
                    <DiscountedItems products={this.state.products} goToProductDetail={this.goToProductDetail} />
                    <PopularList popularProducts={this.state.popularProducts} goToProductDetail={this.goToProductDetail} />
                </ScrollablePage>

                <Tabbar navigation={this.props.navigation} navigatorName={"homeNavigator"} />


                <this.RenderErrorModal />

            </SafeArea>
        );
    }
}

export default HomeScreen;
