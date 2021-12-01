import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-screens';
import { Categories, Products } from '../../../../util/fake-data';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import Tabbar from '../../../components/tabbar.component';
import CategoryList from '../components/category-list.component';
import DiscountedItems from '../components/discounted-items-list.component';
import PopularList from '../components/popular-list.component';
import SearchBarComponent from '../components/search-bar.component';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: Categories,
            products: Products,
            popularProducts: Products
        };
    }
    /////////////////////////
    ///////NAVIGATION
    goToProductDetail=()=>{this.props.navigation.navigate("ProductDetail")}
    goToProductList=()=>{this.props.navigation.navigate("ProductList")}
    goToBasket=()=>{this.props.navigation.jumpTo("basketNavigator")}
    
    componentDidMount() {
        
    }



    render() {
        return (
            <SafeArea>
                <ScrollablePage>
                    <SearchBarComponent goToBasket={this.goToBasket} />
                    <CategoryList categories={this.state.categories} goToProductList={this.goToProductList} />
                    <DiscountedItems products={this.state.products} goToProductDetail={this.goToProductDetail} />
                    <PopularList popularProducts={this.state.popularProducts} goToProductDetail={this.goToProductDetail}/>
                </ScrollablePage>

                <Tabbar navigation={this.props.navigation} navigatorName={"homeNavigator"} />

            </SafeArea>
        );
    }
}

export default HomeScreen;
