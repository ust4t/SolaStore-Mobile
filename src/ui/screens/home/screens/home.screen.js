import React, { Component } from 'react';
import { View, Text, InteractionManager, ScrollView, I18nManager } from 'react-native';

import categoryService from '../../../../services/remote/category.service';
import { Categories, Products } from '../../../../util/fake-data';
import { SafeArea, ScrollablePage, SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import Tabbar from '../../../components/tabbar.component';
import BaseScreen from '../../../shared/base.screen';
import CategoryList from '../components/category-list.component';
import DiscountedItems from '../components/discounted-items-list.component';
import PopularList from '../components/popular-list.component';
import SearchBar from '../components/search-bar.component';


import { inject, observer } from 'mobx-react';
import productService from '../../../../services/remote/product.service';
import userService from '../../../../services/remote/user.service';
import userLocalService from '../../../../services/local/user-local.service';
import languageService from '../../../../services/remote/language.service';
import I18n from '../../../../../assets/i18n/_i18n';
import _I18n from '../../../../../assets/i18n/_i18n';
import HomeMenu from '../components/home-menu.component';
import LanguageSelector from '../components/language-selector.component';
import { showToast } from '../../../../util/toast-message';
import tr from '../../../../../assets/i18n/tr';
import DetailedSearch from '../components/detailed-search.component';
import SelectListModal from '../../../components/modals/selectlist-modal';
import brandService from '../../../../services/remote/brand.service';
import HomeSlider from '../components/home-slider.component';
import styled from 'styled-components';
import MultipleSelectListModal from '../../../components/modals/multiple-select-list.modal';
import advertisingService from '../../../../services/remote/advertising.service';
import DtoResponse from '../../../../util/dto-response';
import SpecificCategories from '../components/specific-categories.screen';
import HomeBrands from '../components/home-brands.component';


const prices = [
    "0-10 USD",
    "10-20 USD",
    "20-30 USD",
    "30-40 USD",
    "40-50 USD",
    "50-60 USD",
    "60-70 USD",
    "70-80 USD",
    "80-90 USD",
    "90-100 USD",

]
const PageScrollable = styled(ScrollView).attrs(({
    contentContainerStyle: {
        paddingBottom: 200
    }
}))`

`
// const defaultCategories = [
//     {
//         selectedCategoryName: I18n.t("$AnaSayfaYeniÜrünler"),
//         squareCategoryPictureGuidName: "8056c903-e.jpg",
//         type: "variation",
//         variationType: 1
//     },
//     {
//         selectedCategoryName: I18n.t("$AnaSayfaÇokSatanlar"),
//         squareCategoryPictureGuidName: "8056c903-e.jpg",
//         type: "variation",
//         variationType: 2
//     },
//     {
//         selectedCategoryName: I18n.t("$AnaSayfaİndirim"),
//         squareCategoryPictureGuidName: "8056c903-e.jpg",
//         type: "variation",
//         variationType: 3
//     }
// ]
@inject("BusyStore", "UserStore")
@observer
class HomeScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            categories: [],
            categoriesForList: [
                {
                    selectedCategoryName: "",
                }],

            // subCategories: [],
            products: [],
            popularProducts: [],
            brands: [],

            selectedCategories: [],


            selectedBrands: [],

            selectedRange: null,

            categoriesModalVisible: false,
            brandsModalVisible: false,
            pricesModalVisible: false,


            ads: [],


            searchText: ""
        };
    }
    /////////////////////////
    ///////MODAL
    showCategoriesModal = () => {
        this.setState({
            categoriesModalVisible: true
        })
    }
    hideCategoriesModal = () => {
        this.setState({
            categoriesModalVisible: false
        })
    }
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
    showPricesModal = () => { this.setState({ pricesModalVisible: true }) }
    hidePricesModal = () => { this.setState({ pricesModalVisible: false }) }
    onCategorySelected = (item) => {
        // this.setState({ selectedCategory: item });
        if (this.state.selectedCategories.includes(item)) {
            this.setState({
                selectedCategories: this.state.selectedCategories.filter(x => x != item)
            })
        } else {
            this.setState({
                selectedCategories: [item, ...this.state.selectedCategories]
            })
        }


    }
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
    onPriceRangeSelected = (item) => {
        this.setState({ selectedRange: item })
        this.hidePricesModal()
    }



    /////////////////////////
    ///////REQUESTS
    componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            await this.getSelectedLanguage()
            this.loginControl()
            this.getAllCategories()
            this.getBrands()
            this.getAdvertisingSlider()
            // this.getDiscountedProducts()
            // this.getBestSellers()

        })
    }

    loginControl = async () => {
        const userInfos = await userLocalService.getUSerData()
        if (userInfos != null) {
            let resp = await this.doRequestAsync(() => userService.isMember(userInfos.userEmail, userInfos.userPassword))
            if (resp) this.props.UserStore.login(resp)
        }
    }

    getSelectedLanguage = async () => {
        const rsp = await userLocalService.getLanguagePref();
        if (rsp) {
            I18n.locale = rsp;
        }
    }

    getAllCategories = async () => {
        this.props.BusyStore.increase()
        let dtoRepsonse = await this.doRequestAsync(categoryService.getAllCategories)
        if (dtoRepsonse) {
            // dtoRepsonse.map((item) => {
            //     item.isSelected = false
            // })
            // const defaultCategories = [
            //     {
            //         selectedCategoryName: I18n.t("$AnaSayfaYeniÜrünler"),
            //         squareCategoryPictureGuidName: "8056c903-e.jpg",
            //         type: "variation",
            //         variationType: 1
            //     },
            //     {
            //         selectedCategoryName: I18n.t("$AnaSayfaÇokSatanlar"),
            //         squareCategoryPictureGuidName: "8056c903-e.jpg",
            //         type: "variation",
            //         variationType: 2
            //     },
            //     {
            //         selectedCategoryName: I18n.t("$AnaSayfaİndirim"),
            //         squareCategoryPictureGuidName: "8056c903-e.jpg",
            //         type: "variation",
            //         variationType: 3
            //     }
            // ]
            this.setState({
                categoriesForList: dtoRepsonse
            }, () => {
                this.getSubCategories(dtoRepsonse)
            })

            // this.setState({
            //     categories: [...dtoRepsonse, ...this.state.categories]
            // }, () => {
            //     this.getSubCategories()
            // })
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
    getBrands = async () => {
        let dtoRepsonse = await this.doRequestAsync(brandService.GetAllBrands)
        if (dtoRepsonse) {
            this.setState({
                brands: dtoRepsonse
            })
        }
    }

    getAdvertisingSlider = async () => {
        let dtoRepsonse = await this.doRequestAsync(advertisingService.Slider)
        if (dtoRepsonse) {
            this.setState({
                ads: dtoRepsonse
            })
        }
    }

    getSubCategories = async (mainCategories) => {
        const all = [...this.state.categories]
        await mainCategories.map(async (item) => {

            let dtoRepsonse = await this.doRequestAsync(() => categoryService.GetSubCategoryList(item.categoryID))
            all.push(item)
            if (dtoRepsonse) {
                dtoRepsonse.map((item) => {
                    item.selectedCategoryName = `--${item.selectedCategoryName}`
                })
                all.push(...dtoRepsonse);

            }
        })

        this.setState({ categories: all }, () => {
            
        })
        this.props.BusyStore.decrease()
    }


    /////////////////////////
    ///////NAVIGATIONS
    goToProductListWithSearchParams = () => {
        if (this.state.selectedCategories.length == 0 &&
            this.state.selectedBrands.length == 0
            && this.state.selectedRange == null) {
            showToast(I18n.t("$AnaSayfaFiltreBos"))
            return;
        }
        this.props.navigation.navigate("ProductList",
            {
                type: "variation",
                variationType: 4,
                selectedCategories: this.state.selectedCategories,
                selectedBrands: this.state.selectedBrands,
                priceRange: this.state.selectedRange
            })
    }
    goToProductList = (item) => {
        this.props.navigation.navigate("ProductList", { categoryID: item.categoryID, type: item.type ? item.type : "category", variationType: item.variationType })
    }
    goToFavorites = () => { this.props.navigation.navigate("UserFavoriteListScreen") }
    goToContact = () => { this.props.navigation.navigate("ContactScreen") }
    goToSettings = () => { this.props.navigation.navigate("SettingScreen") }
    goToProductDetail = (productId) => { this.props.navigation.navigate("ProductDetail", { productId }) }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }
    goProductsWithBrand = (item) => {
        this.props.navigation.navigate("ProductList", {
            categoryID: item.brandID,
            type: "brands"
        })
    }



    /////////////////////////
    ///////SEARCH
    onChangeText = (val) => { this.setState({ searchText: val }) }
    goToProductWithSearchValues = () => {
        if (this.state.searchText.length != 0) this.props.navigation.navigate("ProductList", { type: "variation", variationType: 5, text: this.state.searchText })
    }

    render() {

        return (
            <SafeArea style={{ backgroundColor: 'white' }}>

                <PageScrollable>
                    <LanguageSelector onSelected={this.onSelected} />
                    {/* <SearchBarComponent goToBasket={this.goToBasket} /> */}

                    <SearchBar
                        goToBasket={this.goToBasket}
                        searchText={this.state.searchText}
                        onChangeText={this.onChangeText}
                        action={this.goToProductWithSearchValues}
                    />

                    <SeperatorFromTopOrBottom />
                    <HomeSlider
                        images={this.state.ads} />
                    <CategoryList
                        // categories={[...this.state.categories,...defaultCategories]}
                        categories={this.state.categoriesForList}
                        goToProductList={this.goToProductList} />


                    <SeperatorFromTopOrBottom />
                    <SeperatorFromTopOrBottom />
                    <DetailedSearch
                        showCategoriesModal={this.showCategoriesModal}
                        showBrandsModal={this.showBrandsModal}
                        showPricesModal={this.showPricesModal}
                        selectedRange={this.state.selectedRange}

                        goToProductListWithSearchParams={this.goToProductListWithSearchParams}

                        selectedCategories={this.state.selectedCategories}
                        selectedBrands={this.state.selectedBrands}
                        subCategories={this.state.subCategories} />


                    <SeperatorFromTopOrBottom />
                    <SpecificCategories
                        goToProductList={this.goToProductList} />


                    <SeperatorFromTopOrBottom />
                    <HomeBrands
                        brands={this.state.brands}
                        goProductsWithBrand={this.goProductsWithBrand} />





                    {/* <DiscountedItems products={this.state.products} goToProductDetail={this.goToProductDetail} />
                    <HomeMenu
                        goToFavorites={this.goToFavorites}
                        goToContact={this.goToContact}
                        goToSettings={this.goToSettings}
                    /> */}
                    {/* <PopularList popularProducts={this.state.popularProducts} goToProductDetail={this.goToProductDetail} /> */}
                </PageScrollable>


                <Tabbar navigation={this.props.navigation} navigatorName={"homeNavigator"} />


                <this.RenderErrorModal />

                <MultipleSelectListModal
                    selectListModalVisible={this.state.categoriesModalVisible}
                    hideSelectListModal={this.hideCategoriesModal}
                    onSelected={this.onCategorySelected}
                    selectItems={this.state.categories.slice(0, this.state.categories.length - 3)}
                    selectedItems={this.state.selectedCategories}
                    propertyName="selectedCategoryName"

                />
                {/* <SelectListModal
                    selectListModalVisible={this.state.categoriesModalVisible}
                    hideSelectListModal={this.hideCategoriesModal}
                    onSelected={this.onCategorySelected}
                    selectItems={this.state.categories.slice(3, this.state.categories.length)}
                    propertyName="selectedCategoryName"
                /> */}


                <MultipleSelectListModal
                    selectListModalVisible={this.state.brandsModalVisible}
                    hideSelectListModal={this.hideBrandsModal}
                    onSelected={this.onBrandSelected}
                    selectItems={this.state.brands}
                    selectedItems={this.state.selectedBrands}
                    propertyName="brandName"

                />
                {/* <SelectListModal
                    selectListModalVisible={this.state.brandsModalVisible}
                    hideSelectListModal={this.hideBrandsModal}
                    onSelected={this.onBrandSelected}
                    selectItems={this.state.brands}

                    propertyName="brandName"
                /> */}

                <SelectListModal
                    selectListModalVisible={this.state.pricesModalVisible}
                    hideSelectListModal={this.hidePricesModal}
                    onSelected={this.onPriceRangeSelected}
                    selectItems={prices}

                />

            </SafeArea>
        );
    }

    onSelected = (value) => {
        userLocalService.storeLanguagePref(value);
        this.props.UserStore.changeLanguage()

        // I18n.locale = value;
        // showToast(`${value}${I18n.t("$AnaSayfaLanguageChanges")}`)
    }
}

export default HomeScreen;
