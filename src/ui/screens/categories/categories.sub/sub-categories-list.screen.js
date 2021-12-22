import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import BaseScreen from '../../../shared/base.screen';
import { inject, observer } from 'mobx-react';
import { SafeArea } from '../../../components/shared-styled.components';
import categoryService from '../../../../services/remote/category.service';
import styled from 'styled-components';
import ScreenHeader from '../../../components/screen-header.component';
import Row from '../../basket/screens/category-brand-row.component';

const List = styled(FlatList).attrs(({
    contentContainerStyle: {
        paddingBottom: 200
    }
}))`
flex:1;
`

@inject("BusyStore")
@observer
class SubCategories extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            categories: []
        };
    }
    //////////////////
    //////LIFECYCLE
    componentDidMount() {
        this.getSubCategories();
    }


    //////////////////
    //////REQUESTS
    getSubCategories = async () => {
        let rsp = await this.doRequestAsync(() => categoryService.GetSubCategoryList(
            this.props.route.params.categoryID
        ))
        if (rsp) {
            this.setState({
                categories: rsp
            })
        }
    }

    //////////////////
    //////NAVIGATION
    goBack = () => { this.props.navigation.goBack() }
    goToProductList = (item) => {
        this.props.navigation.navigate("ProductList", {
            type:"category",
            categoryID: item.categoryID
        })
    }

    render() {
        return (
            <SafeArea>
                <ScreenHeader title="" goBack={this.goBack} />
                <List
                    data={this.state.categories}
                    renderItem={({ item, index }) =>
                        <Row
                            action={this.goToProductList}
                            item={item}
                            index={index}
                            textPropertyName="selectedCategoryName"
                            imagePropertyName="squareCategoryPictureGuidName"
                            type={1}
                        />}
                />
            </SafeArea>
        );
    }
}

export default SubCategories;
