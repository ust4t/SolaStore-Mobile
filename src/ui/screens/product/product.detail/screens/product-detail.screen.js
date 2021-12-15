import React, { Component } from 'react';
import { View, Text, InteractionManager, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { color } from '../../../../../infrastructure/theme/color';
import productService from '../../../../../services/remote/product.service';
import PrimaryButton from '../../../../components/primary-button.component';
import { ErrorText, SafeArea, ScrollablePage, SeperatorFromRightOrLeft } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import Body from '../components/product-detail-body.component';
import Slider from '../components/product-detail-slider.component';
import { inject, observer } from 'mobx-react';
import FavoriteButton from '../components/favorite-button.component';
import favoriteService from '../../../../../services/remote/favorite.service';
import basketService from '../../../../../services/remote/basket.service';
import { showToast } from '../../../../../util/toast-message';
import I18n from 'i18n-js';
import CartButton from '../components/cart-button.component';
const FavoriteButtonWrapper = styled(View)`
    position:absolute;
    top:10px;
    right:10px;
    flexDirection:row;
    alignItems:center;
    alignItems:center;
    padding:${props=>props.theme.space[1]};
    backgroundColor:${props=>props.theme.color.transparentWhite};
    borderRadius:${props=>props.theme.radius[2]};
`


const ButtonWrapper = styled(View)`
    width:100%;
    position:absolute;
    bottom:0;
    padding:${props => props.theme.space[2]};
    backgroundColor:${props => props.theme.color.white};
`
@inject("BusyStore", "UserStore")
@observer
class ProductDetail extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,




            ////////////////product details
            name: "",
            price: "",
            description: "",
            images: [],
            sizes:"",
            oldPrice:"",


            variations: [],

            count: 1,


            isFavorite: false,


            videoName: null
        };

        this.selectedProductVariationId = this.props.route.params.productId

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            this.props.BusyStore.increase()
            await this.getProductDetail()
            this.props.BusyStore.decrease()
            // this.getVariations()
        })
    }
    //////////////////////
    ///////NAVIGATIONS
    goToUserTab = () => { this.props.navigation.jumpTo("userNavigator") }
    goToVideoPlayer = () => { this.props.navigation.navigate("ProductVideoPlayer", { videoName: this.state.videoName,name:this.state.name}) }
    goToBasketTab=()=>{this.props.navigation.jumpTo("basketNavigator") }
    //////////////////////
    ///////STATE CHANGES
    increse = () => { this.setState({ count: this.state.count += 1 }) }
    decrease = () => {
        if (this.state.count <= 2) {
            this.setState({ count: 1 })
        } else this.setState({ count: this.state.count -= 1 })
    }

    onVariationSelected = (item) => {
        this.setState({
            name: item.productShortName,
            price: item.price,
            oldPrice:item.oldPrice,
            description: item.productSelectedDetail ? item.productSelectedDetail : "",
            images: item.pictures,
            sizes:item.sizes,
            videoName: item.video_1
        })
        this.selectedProductVariationId = item.productID
    }

    ///////////////////
    //////REQUESTS
    getProductDetail = async () => {
        // if(itemProductId!=null) this.props.route.params.productId=itemProductId
        // console.log("product-detail.screen line 66")
        // console.log(this.props.route.params.productId)
        if (this.props.route.params.productId) {
            let data = await this.doRequestAsync(() => productService.GetProductById(this.props.route.params.productId))
            if (data && data.length > 0) {
                data = data[0];
                this.setState({
                    name: data.productShortName,
                    price: data.price,
                    oldPrice:data.oldPrice,
                    description: data.productSelectedDetail ? data.productSelectedDetail : "",
                    images: data.pictures,
                    sizes:data.sizes,
                    videoName: data.video_1

                }, async () => {
                    await this.getVariations(data)
                })
            }

        }
    }
    getVariations = async (originalData) => {
        if (this.props.route.params.productId) {
            let data = await this.doRequestAsync(() => productService.GetVariationsByProductID(this.props.route.params.productId))
            console.log(data)
            if (data) {
                this.setState({
                    variations: [originalData, ...data]
                })
            }
        }
    }
    addToFavorites = async () => {
        let resp = await this.doRequestAsync(() => favoriteService.AddFavoriteProduct(this.props.route.params.productId))
        if (resp.status == 200) {
            this.setState({ isFavorite: true })
        }
    }
    addToBasket = async () => {
        let rsp = await this.doRequestAsync(() => basketService.addToBasket(this.selectedProductVariationId, this.state.count))
        if (rsp) {
            showToast(I18n.t("addedToChart"));
        }
    }

    render() {
        return (
            <SafeArea style={{ backgroundColor: color.lightGray }}>
                <ScrollablePage>
                    <Slider images={this.state.images} videoName={this.state.videoName} goToVideoPlayer={this.goToVideoPlayer} />
                    {/* {
                        this.state.videoName &&
                        <TouchableOpacity onPress={this.goToVideoPlayer}>
                            <Text>gittt</Text>
                        </TouchableOpacity>
                    } */}

                    <Body
                        name={this.state.name}
                        price={this.state.price}
                        oldPrice={this.state.oldPrice}
                        description={this.state.description}
                        sizes={this.state.sizes}
                        variations={this.state.variations}
                        onVariationSelected={this.onVariationSelected}
                        count={this.state.count}
                        increase={this.increse}
                        decrease={this.decrease}
                    />


                </ScrollablePage>


                <ButtonWrapper>
                    <PrimaryButton text={I18n.t("addToCart")} action={this.addToBasket} />
                </ButtonWrapper>


                <FavoriteButtonWrapper>
                <CartButton action={this.goToBasketTab}/>
                    <FavoriteButton action={this.addToFavorites} isFavorite={this.state.isFavorite} />
                   
                </FavoriteButtonWrapper>

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default ProductDetail;
