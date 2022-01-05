import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { SafeArea, SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
import Tabbar from '../../../../components/tabbar.component';
import BaseScreen from '../../../../shared/base.screen';
import { inject, observer } from 'mobx-react';
import brandService from '../../../../../services/remote/brand.service';
import categoryService from '../../../../../services/remote/category.service';
import styled from 'styled-components';
import I18n from 'i18n-js';
import Row from '../../../basket/screens/category-brand-row.component';
import SearchBar from '../../../home/components/search-bar.component';



const Header = styled(View)`
    width:100%;
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    padding:${props => props.theme.space[2]};
    backgroundColor:white;
`
const HeaderTouchable = styled(TouchableOpacity)`
`
const HeaderText = styled(Text)`
borderWidth:${props=>Platform.OS=="ios" && 1}px;
borderBottomWidth:1px;
padding:${props => props.theme.space[2]};
borderColor:${props => props.selectedHeader == props.headerVal ? props.theme.color.secondary : props.theme.color.white};
`
const List = styled(FlatList).attrs(({
    contentContainerStyle: {
        paddingBottom: 200
    }
}))`
flex:1;

`
@inject("BusyStore")
@observer
class CategoriesListScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            categories: [],
            brands: [],
            selectedHeader: 1,



            searchText: ""

        };
    }

    //////////////////
    //////STATE
    changeHeaderSelected = (val) => {
        this.setState({
            selectedHeader: val
        })
    }
    //////////////////
    //////LIFECYCLE
    componentDidMount() {
        this.getBrands();
        this.getCategories()
    }


    //////////////////
    //////REQUESTS
    getCategories = async () => {
        let rsp = await this.doRequestAsync(categoryService.getAllCategories)
        if (rsp) {

            this.setState({
                categories: rsp
            })
        }
    }

    getBrands = async () => {
        let rsp = await this.doRequestAsync(brandService.GetAllBrands)
        if (rsp) {

            this.setState({
                brands: rsp
            })
        }
    }

    //////////////////
    //////NAVIGATION
    goToSubCategories = (item) => {
        this.props.navigation.navigate("SubCategories", {
            categoryID: item.categoryID
        })
    }
    goProducts = (item) => {
        this.props.navigation.navigate("ProductList", {
            categoryID: item.brandID,
            type: "brands"
        })
    }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }



    /////////////////////////
    ///////SEARCH
    onChangeText = (val) => { this.setState({ searchText: val }) }
    goToProductWithSearchValues = () => {
        if (this.state.searchText.length != 0) this.props.navigation.navigate("ProductList", { type: "variation", variationType: 5, text: this.state.searchText })
    }

    render() {
        return (
            <SafeArea>

                <SearchBar
                    goToBasket={this.goToBasket}
                    searchText={this.state.searchText}
                    onChangeText={this.onChangeText}
                    action={this.goToProductWithSearchValues}
                />

                <Header >
                    <HeaderTouchable onPress={() => this.changeHeaderSelected(1)}>
                        <HeaderText 
                        
                        selectedHeader={this.state.selectedHeader} headerVal={1}>
                            {I18n.t("$AnaSayfaKategoriler")}
                        </HeaderText>
                    </HeaderTouchable>
                    <SeperatorFromRightOrLeft />
                    <HeaderTouchable onPress={() => this.changeHeaderSelected(2)}>
                        <HeaderText selectedHeader={this.state.selectedHeader} headerVal={2}>
                            {I18n.t("$AnaSayfaMarkalar")}
                        </HeaderText>
                    </HeaderTouchable>
                </Header>

                {
                    this.state.selectedHeader == 1 ?
                        <List
                            data={this.state.categories}
                            renderItem={({ item, index }) =>
                                <Row
                                    action={this.goToSubCategories}
                                    item={item}
                                    index={index}
                                    textPropertyName="selectedCategoryName"
                                    imagePropertyName="squareCategoryPictureGuidName"
                                    type={1}
                                />}
                        /> :
                        <List
                            data={this.state.brands}
                            renderItem={({ item, index }) =>
                                <Row
                                    action={this.goProducts}
                                    item={item}
                                    index={index}
                                    textPropertyName="brandName"
                                    imagePropertyName="guidName2"
                                    type={2}
                                />}
                        />
                }



                <this.RenderErrorModal />
                <Tabbar navigation={this.props.navigation} navigatorName={"categoriesNavigator"} />
            </SafeArea >
        );
    }
}

export default CategoriesListScreen;
