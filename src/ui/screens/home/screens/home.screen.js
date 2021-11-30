import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import CategoryList from '../components/category-list.component';
import DiscountedItems from '../components/discounted-items-list.component';
import PopularList from '../components/popular-list.component';

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
                    <CategoryList categories={this.state.categories} />
                    <DiscountedItems products={this.state.products} />
                    <PopularList popularProducts={this.state.popularProducts} />
                </ScrollablePage>

            </SafeArea>
        );
    }
}

export default HomeScreen;
