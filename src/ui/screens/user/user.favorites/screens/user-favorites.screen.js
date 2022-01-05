import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager, Dimensions } from 'react-native';
import styled from 'styled-components';
import ScreenHeader from '../../../../components/screen-header.component';
import { SafeArea } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import { inject, observer } from 'mobx-react';
import favoriteService from '../../../../../services/remote/favorite.service';
import ProductListRow from '../../../product/product.list/components/product-list-row.component';
import I18n from 'i18n-js';
import TabBar from '../../../../components/tabbar.component';
import SearchBar from '../../../home/components/search-bar.component';
import { space } from '../../../../../infrastructure/theme/space';
import EmptyFavorite from '../components/empty-favorite.component';

const deviceWidth = Dimensions.get('window').width
const CalculatedImageSize = `${497 * (((deviceWidth / 2) - (parseInt(space[3].substring(0, 2)) + 2 * parseInt(space[2].substring(0, 2)))) / 331)}`
const CalculatedWrapperSize = `${((deviceWidth / 2) - (space[3].substring(0, 2)))}`
const CalculatedSupWrapperHeight = Math.round(CalculatedImageSize) + 80;


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

@inject("BusyStore", "UserStore")
@observer
class UserFavoriteListScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            // products: [],


            searchText: ""
        };
    }
    /////////////////////////
    //////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }
    goToProductDetail = (productId,secondaryId) => { this.props.navigation.navigate("ProductDetail", { productId,secondaryId }) }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }
    goToHomeTab=()=>{this.props.navigation.jumpTo("homeNavigator")}
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // this.getFavorites()
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
            this.props.UserStore.deleteFromFavoriteWithId(productId)
        }
    }

    addToFavorites = async (item) => {
        const favoriteState = this.props.UserStore.favorites.find(a => a.productID == item.productID) ? true : false
        if (favoriteState) {
            let resp = await this.doRequestAsync(() => favoriteService.DeleteFavoriteProduct(item.productID))
            if (resp.status == 200) {
                this.props.UserStore.deleteFromFavoriteWithId(item.productID)
            }
        } else {
            let resp = await this.doRequestAsync(() => favoriteService.AddFavoriteProduct(item.productID))
            if (resp.status == 200) {
                this.props.UserStore.addToFavorites(item)
            }
        }

    }


    /////////////////////////
    ///////SEARCH
    onChangeText = (val) => { this.setState({ searchText: val }) }
    goToProductWithSearchValues = () => {
        if (this.state.searchText.length != 0) this.props.navigation.navigate("ProductList", { type: "variation", variationType: 5, text: this.state.searchText })
    }


    render() {
        return (
            <SafeArea>
                {
                    this.props.route.params &&
                    <ScreenHeader title={I18n.t("$AnaSayfaFavorilerim")} goBack={this.goBack} />
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
                    {
                        this.props.UserStore.favorites.length == 0 ?
                        <EmptyFavorite goToHomeTab={this.goToHomeTab}/>
                        :
                        <FlatListOfProducts
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        decelerationRate={0.7}
                        keyExtractor={(item, index) => item.productID}
                        removeClippedSubviews={true} //If true, views that are outside of the viewport are detached from the native view hierarchy.
                        initialNumToRender={6}  //The initial amount of items to render.
                        data={this.props.UserStore.favorites.slice()}
                        renderItem={({ item, index }) => <ProductListRow
                            item={item}
                            index={index}
                            goToProductDetail={this.goToProductDetail}
                            inFavorites={true}

                            // removeFavoriteProduct={this.removeFavoriteProduct}
                            addToFavorites={this.addToFavorites}
                            UserStore={this.props.UserStore}
                            CalculatedImageSize={CalculatedImageSize}
                            CalculatedWrapperSize={CalculatedWrapperSize}
                            CalculatedSupWrapperHeight={CalculatedSupWrapperHeight}
                        />}
            
                    />
                    }

                </PageWrapper>

                {
                    this.props.route.params == undefined &&
                    <TabBar navigation={this.props.navigation} navigatorName={"favoritesNavigator"} />
                }



                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default UserFavoriteListScreen;
