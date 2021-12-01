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
            products: []
        };
    }

    /////////////////////////////
    ////////NAVIGATION  
    goToProductDetail = () => {
        this.props.navigation.navigate("ProductDetail")
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            console.log(this.props)
            // this.props.BusyStore.increase()
            setTimeout(() => {
                // this.setState({ products: Products })
                // this.props.BusyStore.decrease()
                this.doRequestAsync(()=>productService.GetAllByCategoryID())
            }, 200)
        })
    }


    render() {
        return (
            <SafeArea>
                <PageWrapper>
                    <FlatListOfProducts
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={this.state.products}
                        renderItem={({ item, index }) => <ProductListRow item={item} index={index} goToProductDetail={this.goToProductDetail} />}
                        ListHeaderComponent={<ProductListHeader />}
                    />
                </PageWrapper>


                <this.RenderErrorModal />

            </SafeArea>
        );
    }
}

export default ProductList;
