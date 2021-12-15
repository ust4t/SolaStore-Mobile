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
import userService from '../../../../services/remote/user.service';
import userLocalService from '../../../../services/local/user-local.service';
import languageService from '../../../../services/remote/language.service';
import I18n from '../../../../../assets/i18n/_i18n';
import _I18n from '../../../../../assets/i18n/_i18n';
import HomeMenu from '../components/home-menu.component';
import LanguageSelector from '../components/language-selector.component';
import { showToast } from '../../../../util/toast-message';
import tr from '../../../../../assets/i18n/tr';

@inject("BusyStore", "UserStore")
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
    goToProductDetail = (productId) => { this.props.navigation.navigate("ProductDetail", { productId }) }
    goToProductList = () => { this.props.navigation.navigate("ProductList") }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }


    /////////////////////////
    ///////REQUESTS
    componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            await this.getSelectedLanguage()
            this.loginControl()
            this.getAllCategories()
            this.getDiscountedProducts()
            this.getBestSellers()
            
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

   
    /////////////////////////
    ///////NAVIGATIONS
    goToProductList = (categoryID) => { this.props.navigation.navigate("ProductList", { categoryID }) }

    goToFavorites = () => { this.props.navigation.navigate("UserFavoriteListScreen") }
    goToContact = () => { this.props.navigation.navigate("ContactScreen") }
    goToSettings = () => { this.props.navigation.navigate("SettingScreen") }





    render() {
        return (
            <SafeArea>
                <ScrollablePage>
                    <LanguageSelector onSelected={this.onSelected} />
                    {/* <SearchBarComponent goToBasket={this.goToBasket} /> */}
                    <CategoryList categories={this.state.categories} goToProductList={this.goToProductList} />

                    <DiscountedItems products={this.state.products} goToProductDetail={this.goToProductDetail} />
                    <HomeMenu
                        goToFavorites={this.goToFavorites}
                        goToContact={this.goToContact}
                        goToSettings={this.goToSettings}
                    />
                    <PopularList popularProducts={this.state.popularProducts} goToProductDetail={this.goToProductDetail} />
                </ScrollablePage>

                <Tabbar navigation={this.props.navigation} navigatorName={"homeNavigator"} />


                <this.RenderErrorModal />

            </SafeArea>
        );
    }

    onSelected = (value) => {
        userLocalService.storeLanguagePref(value);
        I18n.locale = value;
        showToast(`${value}${I18n.t("languageChanges")}`)
    }
}

export default HomeScreen;
