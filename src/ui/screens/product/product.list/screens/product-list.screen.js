import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import styled from 'styled-components';
import ProductListRow from '../components/product-list-row.component';
import { inject, observer } from 'mobx-react';
import ProductListHeader from '../components/product-list-header.component';
import { Products } from '../../../../../util/fake-data';
import BaseScreen from '../../../../shared/base.screen';
import productService from '../../../../../services/remote/product.service';
import FilterModal from '../components/filter-modal';
import brandService from '../../../../../services/remote/brand.service';
import categoryService from '../../../../../services/remote/category.service';
import ScreenHeader from '../../../../components/screen-header.component';
import I18n from 'i18n-js';
import ProductListFilterModal from '../components/product-list-filter.modal';
import MultipleSelectListModal from '../../../../components/modals/multiple-select-list.modal';
import Tabbar from '../../../../components/tabbar.component';
import SearchBar from '../../../home/components/search-bar.component';
import SelectListModal from '../../../../components/modals/selectlist-modal';
const FlatListOfProducts = styled(FlatList).attrs(props => ({
    contentContainerStyle: {
        paddingBottom: 200
    }
}))`
  
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
            // subCategories: [],

            // selectedCategories: [],
            selectedBrands: [],
            // categoriesModalVisible: false,
            brandsModalVisible: false,

            minPrice: 0,
            maxPrice: 999,


            forceRefresh: false,


            searchText: "",


            sortModalVisible: false,
            selectedSortOption: "-"

        };

        this.oldList = [];
    }
    /////////////////////////////
    ////////MODAL
    showFilterModal = () => { this.setState({ filterModalVisible: true }) }
    hideFilterModal = () => { this.setState({ filterModalVisible: false }) }
    showSortModal = () => { this.setState({ sortModalVisible: true }) }
    hideSortModal = () => { this.setState({ sortModalVisible: false }) }

    // showCategoriesModal = () => {
    //     this.setState({
    //         categoriesModalVisible: true
    //     })
    // }
    // hideCategoriesModal = () => {
    //     this.setState({
    //         categoriesModalVisible: false
    //     })
    // }
    showBrandsModal = () => {
        this.setState({
            brandsModalVisible: true
        })
    }
    hideBrandsModal = () => {
        this.setState({
            brandsModalVisible: false
        })
    }



    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.getBrands()
            if (this.props.route.params) {
                if (this.props.route.params.type === "brands") {
                    this.getAllByBrandId()

                } else if (this.props.route.params.type === "category") {
                    this.getAllByCategoryID()
                }
                else if (this.props.route.params.type === "variation") {
                    if (this.props.route.params.variationType == 1) {
                        this.getNews()
                    } else if (this.props.route.params.variationType == 2) {
                        this.getBestSellers()
                    }
                    else if (this.props.route.params.variationType == 3) {
                        this.getDiscounted()
                    }
                    else if (this.props.route.params.variationType == 4) {
                        this.getAllWithAdvancedSearch()
                    }
                    else if (this.props.route.params.variationType == 5) {
                        this.search()
                    }

                }
            } else {
                this.getNews()
            }


        })
    }
    /////////////////////////////
    ////////REQUESTS 
    defaultRequestProcess = (products) => {
        this.oldList = products;
        this.setState({
            products: products,
            productCount: products.length,
        })
    }
    getAllByCategoryID = async () => {
        if (this.props.route.params.categoryID) {
            let data = await this.doRequestAsync(() => productService.GetAllByCategoryID(this.props.route.params.categoryID))
            if (data) {
                this.defaultRequestProcess(data)
            }
        }
    }

    getBrands = async () => {
        let data = await this.doRequestAsync(brandService.GetAllBrands)
        if (data) {
            this.setState({
                brands: data
            })
        }
    }


    getAllByBrandId = async () => {
        if (this.props.route.params.categoryID) {
            let data = await this.doRequestAsync(() => productService.GetSelectedBrandProducts(this.props.route.params.categoryID))
            if (data) {
                this.defaultRequestProcess(data)
            }
        }
    }

    getDiscounted = async () => {
        let dtoRepsonse = await this.doRequestAsync(productService.GetSaleProducts)
        if (dtoRepsonse) {
            this.defaultRequestProcess(dtoRepsonse)
        }
    }

    getBestSellers = async () => {
        let dtoRepsonse = await this.doRequestAsync(productService.GetBestSellerProducts)
        if (dtoRepsonse) {
            this.defaultRequestProcess(dtoRepsonse)
        }
    }

    getNews = async () => {
        let dtoRepsonse = await this.doRequestAsync(productService.getNewProducts)
        if (dtoRepsonse) {
            this.defaultRequestProcess(dtoRepsonse)
        }
    }

    getAllWithAdvancedSearch = async () => {
        let categoryString = ""
        let brandString = ""
        this.props.route.params.selectedCategories.map((item) => {
            if (categoryString == "") categoryString += `${item.categoryID}`
            else categoryString += `,${item.categoryID}`
        })
        this.props.route.params.selectedBrands.map((item) => {
            if (brandString == "") brandString += `${item.brandID}`
            else brandString += `,${item.brandID}`
        })

        let data = await this.doRequestAsync(() => productService.advancedSearchProducts(
            categoryString,
            brandString,
            this.props.route.params.priceRange ?
                this.props.route.params.priceRange.substr(0, this.props.route.params.priceRange.indexOf("-")) :
                0,
            this.props.route.params.priceRange ?
                this.props.route.params.priceRange.substr(this.props.route.params.priceRange.indexOf("-") + 1, 2) :
                999
        ))
        if (data) {
            this.defaultRequestProcess(data)
        }
    }
    search = async () => {
        let response = await this.doRequestAsync(() => productService.searchProducts(this.props.route.params.text))
        if (response) {
            this.defaultRequestProcess(response)
        }
    }
    /////////////////////////////
    ////////NAVIGATION 
    goToProductDetail = (productId) => { this.props.navigation.navigate("ProductDetail", { productId }) }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }
    goBack = () => { this.props.navigation.goBack() }



    /////////////////////////
    ///////SEARCH
    onChangeText = (val) => { this.setState({ searchText: val }) }
    goToProductWithSearchValues = () => {
        if (this.state.searchText.length != 0) this.props.navigation.navigate("ProductListSearch", { type: "variation", variationType: 5, text: this.state.searchText })
    }



    render() {

        return (
            <SafeArea>
                {
                    this.props.route.params &&
                    <ScreenHeader
                        title={this.props.route.params.pageTitle ? this.props.route.params.pageTitle : I18n.t("$AnasayfaUrunListesi")}
                        goBack={this.goBack} />

                }

                {
                    this.props.route.params == undefined &&
                    <SearchBar
                        goToBasket={this.goToBasket}
                        searchText={this.state.searchText}
                        onChangeText={this.onChangeText}
                        action={this.goToProductWithSearchValues}
                    />

                }

                <PageWrapper>
                    <FlatListOfProducts
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={this.state.products}
                        renderItem={({ item, index }) => <ProductListRow item={item} index={index} goToProductDetail={this.goToProductDetail} />}
                        ListHeaderComponent={<ProductListHeader
                            goToBasket={this.goToBasket}
                            productCount={this.state.productCount}
                            showFilterModal={this.showFilterModal}
                        />}
                    />
                </PageWrapper>


                <ProductListFilterModal
                    filterModalVisible={this.state.filterModalVisible}
                    hideFilterModal={this.hideFilterModal}

                    showBrandsModal={this.showBrandsModal}

                    selectedBrands={this.state.selectedBrands}
                    minPrice={this.state.minPrice}
                    maxPrice={this.state.maxPrice}
                    onMaxPriceChanged={this.onMaxPriceChanged}
                    onMinPriceChanged={this.onMinPriceChanged}
                    createParameters={this.createParameters}
                    clearFilter={this.clearFilter}
                    selectedSortOption={this.state.selectedSortOption}
                    showSortModal={this.showSortModal}
                />

                <SelectListModal
                    selectListModalVisible={this.state.sortModalVisible}
                    hideSelectListModal={this.hideSortModal}
                    onSelected={this.onSortSelected}
                    selectItems={[
                        I18n.t("$UrunlerFiyatiEnYuksekOlan"),
                        I18n.t("$UrunlerFiyatiEnDusukOlan"),
                        I18n.t("$UrunlerAdanZye"),
                        I18n.t("$UrunlerZdenAya"),
                    ]}

                />

                <MultipleSelectListModal
                    selectListModalVisible={this.state.brandsModalVisible}
                    hideSelectListModal={this.hideBrandsModal}
                    onSelected={this.onBrandSelected}
                    selectItems={this.state.brands}
                    selectedItems={this.state.selectedBrands}
                    propertyName="brandName"

                />
                <this.RenderErrorModal />

                {
                    this.props.route.params == undefined &&
                    <Tabbar navigation={this.props.navigation} navigatorName={"newProductNavigator"} />
                }

            </SafeArea>
        );
    }

    /////////////////////////////
    /////////FILTER OPERATIONS
    onSortSelected = (val) => { this.setState({ selectedSortOption: val }, () => this.hideSortModal()) }

    onBrandSelected = (item) => {
        if (this.state.selectedBrands.includes(item)) {
            this.setState({
                selectedBrands: this.state.selectedBrands.filter(x => x != item)
            })
        } else {
            this.setState({
                selectedBrands: [item, ...this.state.selectedBrands]
            })
        }
    }


    onMaxPriceChanged = (val) => {
        this.setState({ maxPrice: val })

    }

    onMinPriceChanged = (val) => {
        this.setState({ minPrice: val })
    }

    createParameters = async () => {
        let newList = this.oldList;

        if (this.state.selectedSortOption != "-") {
            if (this.state.selectedSortOption == I18n.t("$UrunlerFiyatiEnYuksekOlan")) {
                newList.sort(this.dynamicSort("price")).reverse()
            } else if (this.state.selectedSortOption == I18n.t("$UrunlerFiyatiEnDusukOlan")) {
                newList.sort(this.dynamicSort("price"))
            } else if (this.state.selectedSortOption == I18n.t("$UrunlerAdanZye")) {
                newList.sort(this.dynamicSort("productShortName"))
            } else {
                newList.sort(this.dynamicSort("productShortName")).reverse()
            }
        }

        if (this.state.selectedBrands.length != 0) {
            const selectedBrnds = [];
            this.state.selectedBrands.map((item) => {
                selectedBrnds.push(item.brandID)
            })

            newList = newList.filter(x => selectedBrnds.includes(x.brandID))


        }
        newList = newList.filter(x => x.price > this.state.minPrice && x.price < this.state.maxPrice)





        this.setState({
            products: newList,
            productCount: newList.length,

        }, () => {
            this.hideFilterModal()
        })
    }
    clearFilter = () => {
        this.hideFilterModal()
        this.setState({
            selectedBrands: [],
            minPrice: 0,
            maxPrice: 999,
            selectedSortOption: "-",
        }, () => {
            this.defaultRequestProcess(this.oldList)
        })
    }
    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
}

export default ProductList;
