import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-screens';
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
            categories: [
                {
                    categoryTitle: "Ayakkabı",
                    categoryIcon: "https://media.istockphoto.com/vectors/running-shoe-icon-isolated-sneaker-symbol-vector-vector-id1272854651?k=20&m=1272854651&s=170667a&w=0&h=ilfHV6u6V6-TXZWtJUHszWOWMGDebzhpZwyP7sd9mJc="
                }
            ],
            products: [],
            popularProducts: []
        };
    }
    /////////////////////////
    ///////NAVIGATION
    goToProductDetail=()=>{this.props.navigation.navigate("ProductDetail")}
    goToProductList=()=>{this.props.navigation.navigate("ProductList")}
    goToBasket=()=>{this.props.navigation.jumpTo("basketNavigator")}
    
    componentDidMount() {
        this.monkCategories();
    }
    monkCategories = () => {
        const newCategoryList = [];
        const newDiscountedProducts = [];
        const newPopularList = [];
        for (var i = 0; i < 15; i++) {
            newCategoryList.push({
                categoryTitle: "Ayakkabı",
                categoryIcon: "https://media.istockphoto.com/vectors/running-shoe-icon-isolated-sneaker-symbol-vector-vector-id1272854651?k=20&m=1272854651&s=170667a&w=0&h=ilfHV6u6V6-TXZWtJUHszWOWMGDebzhpZwyP7sd9mJc="
            })
            newDiscountedProducts.push({
                productImageUri: "",
                productName: "ürün 1",
                originalPrice: "$64",
                discountedPrice: "$125"
            })
            newPopularList.push({
                productImageUri: "",
                productName: "ürün 1",
                price: "$64",

            })

        }
        this.setState({
            categories: newCategoryList,
            products: newDiscountedProducts,
            popularProducts: newPopularList
        })
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
