import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import styled from 'styled-components';
import ProductListRow from '../components/product-list-row.component';
import SearchBar from '../../../home/components/search-bar.component';
import { inject, observer } from 'mobx-react';
import ProductListHeader from '../components/product-list-header.component';
import { Products } from '../../../../../util/fake-data';
import BaseScreen from '../../../../shared/base.screen';
import productService from '../../../../../services/remote/product.service';
import FilterModal from '../components/filter-modal';
import brandService from '../../../../../services/remote/brand.service';
import categoryService from '../../../../../services/remote/category.service';
const FlatListOfProducts = styled(FlatList)`
  
`

const PageWrapper = styled(View)`
    padding:${props => props.theme.space[3]};
    paddingBottom:0px;
    paddingTop:0px;
`

@inject("BusyStore")
@observer
class ProductList extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            products: [],
            productCount: "",


            filterModalVisible: false,

            brands: [],
            subCategories: [],

            minPrice: 0,
            maxPrice: 0,


            forceRefresh: false

        };
    }
    /////////////////////////////
    ////////MODAL
    showFilterModal = () => { this.setState({ filterModalVisible: true }) }
    hideFilterModal = () => { this.setState({ filterModalVisible: false }) }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getAllByCategoryID()
            this.getBrands()
            this.getSubCategories()
        })
    }
    /////////////////////////////
    ////////REQUESTS 
    getAllByCategoryID = async () => {
        if (this.props.route.params.categoryID) {
            let data = await this.doRequestAsync(() => productService.GetAllByCategoryID(this.props.route.params.categoryID))
            if (data) {
                let maxPrice = 0;
                let minPrice = 900;
                data.map((item, index) => {
                    if (item.price > maxPrice) maxPrice = item.price;
                    if (item.price < minPrice) minPrice = item.price;
                })

                this.setState({
                    products: data,
                    productCount: data.length,
                    maxPrice,
                    minPrice
                })
            }
        }
    }

    getBrands = async () => {
        let data = await this.doRequestAsync(brandService.GetAllBrands)
        if (data) {
            data.map((item, index) => {
                item.isSelected = false
            })
            this.setState({
                brands: data
            })
        }
    }
    getSubCategories = async () => {
        let data = await this.doRequestAsync(() => categoryService.GetSubCategoryList(this.props.route.params.categoryID))
        if (data) {
            data.map((item, index) => {
                item.isSelected = false
            })
            this.setState({
                subCategories: data
            })
        }
    }
    /////////////////////////////
    ////////NAVIGATION 
    goToProductDetail = (productId) => { this.props.navigation.navigate("ProductDetail", { productId }) }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }




    render() {
        return (
            <SafeArea>
                <PageWrapper>
                    <FlatListOfProducts
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={this.state.products}
                        renderItem={({ item, index }) => <ProductListRow item={item} index={index} goToProductDetail={this.goToProductDetail} />}
                        ListHeaderComponent={<ProductListHeader
                            goToBasket={this.goToBasket}
                            productCount={this.state.productCount}
                            showFilterModal={this.showFilterModal} />}
                    />
                </PageWrapper>

                <FilterModal
                    filterModalVisible={this.state.filterModalVisible}
                    hideFilterModal={this.hideFilterModal}
                    brands={this.state.brands}
                    subCategories={this.state.subCategories}
                    onCategorySelected={this.onCategorySelected}
                    forceRefresh={this.state.forceRefresh}
                    onBrandSelected={this.onBrandSelected}
                    minPrice={this.state.minPrice}
                    maxPrice={this.state.maxPrice}
                    onMaxPriceChanged={this.onMaxPriceChanged}
                    onMinPriceChanged={this.onMinPriceChanged}
                    onMaxPriceEdited={this.onMaxPriceEdited}
                    onMinPriceEdited={this.onMinPriceEdited}
                    createParameters={this.createParameters}
                    clearFilter={this.clearFilter}

                />
                <this.RenderErrorModal />

            </SafeArea>
        );
    }

    /////////////////////////////
    /////////FILTER OPERATIONS
    onCategorySelected = (subCategoryId) => {
        const subCategories = this.state.subCategories;
        subCategories.map((item, index) => {
            if (item.categoryID == subCategoryId) {
                item.isSelected = !item.isSelected
            }
        })
        this.setState({ subCategories, forceRefresh: !this.state.forceRefresh })
    }


    onBrandSelected = (brandID) => {
        const brands = this.state.brands;
        brands.map((item, index) => {
            if (item.brandID == brandID) {
                item.isSelected = !item.isSelected
            }
        })
        this.setState({ brands, forceRefresh: !this.state.forceRefresh })
    }
    onMaxPriceEdited = (e) => {
        // const val=e.nativeEvent.text;
        // if (val < this.state.minPrice) this.setState({ maxPrice: this.state.minPrice })
        // else if (val > this.state.maxPrice) this.setState({ maxPrice: this.state.maxPrice })
        // else this.setState({ maxPrice: val })
    }
    onMinPriceEdited = (e) => {
        // const val=e.nativeEvent.text;
        // if (val < this.state.minPrice) this.setState({ minPrice: this.state.minPrice })
        // else if (val > this.state.maxPrice) this.setState({ maxPrice: this.state.minPrice })
        // else this.setState({ minPrice: val })
    }
    onMaxPriceChanged = (val) => {
        this.setState({ maxPrice: val })

    }

    onMinPriceChanged = (val) => {
        this.setState({ minPrice: val })
    }

    createParameters = async () => {
        let CatIDList = "";
        let BrandIDList = "";
        const MinPrice = this.state.minPrice;
        const MaxPrice = this.state.maxPrice;
        this.state.subCategories.map((item, index) => {
            if (item.isSelected) {
                if (CatIDList.length == "") CatIDList += item.categoryID
                else CatIDList += "," + item.categoryID
            }
        })
        this.state.brands.map((item, index) => {
            if (item.isSelected) {
                if (BrandIDList == "") BrandIDList += item.brandID
                else BrandIDList += "," + item.brandID
            }
        })
        console.log(CatIDList)
        console.log(BrandIDList)
        this.hideFilterModal()
        let data = await this.doRequestAsync(() => productService.advancedSearchProducts(CatIDList, BrandIDList, MinPrice, MaxPrice));
        if (data) {
            this.setState({
                products: data,
                productCount: data.length,
            })
        }
    }
    clearFilter = () => {
        this.hideFilterModal()
        this.getAllByCategoryID()
        this.getBrands()
        this.getSubCategories()

    }
}

export default ProductList;
