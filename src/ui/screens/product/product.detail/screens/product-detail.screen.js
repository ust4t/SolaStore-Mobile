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
import ImageSliderModal from '../components/image-slider.modal';
import { arrowBack } from '../../../../../util/icons';
import Icon from 'react-native-vector-icons/Ionicons'
import SuccessModal from '../../../../components/success-modal';
import SecondaryButton from '../../../../components/secondary-button.component';

const FavoriteButtonWrapper = styled(View)`
    position:absolute;
    top:10px;
    right:10px;
    flexDirection:row;
    alignItems:center;
    alignItems:center;
    padding:${props => props.theme.space[1]};
    backgroundColor:${props => props.theme.color.transparentWhite};
    borderRadius:${props => props.theme.radius[2]};

`
const BackButtonWrapper = styled(TouchableOpacity)`
position:absolute;
top:10px;
left:10px;
flexDirection:row;
alignItems:center;
alignItems:center;
padding:${props => props.theme.space[1]};
backgroundColor:${props => props.theme.color.transparentWhite};
borderRadius:${props => props.theme.radius[3]};
`

const Back = styled(Icon).attrs(props => ({
    name: arrowBack,
    size: 30,
    color: props.theme.color.primary
}))`

`


const ButtonWrapper = styled(View)`
    width:100%;
    position:absolute;
    bottom:0;
    padding:${props => props.theme.space[2]};
    backgroundColor:${props => props.theme.color.white};
    flexDirection:row;
    alignItems:center;
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
            sizes: "",
            oldPrice: "",


            variations: [],

            count: 1,


            isFavorite: this.props.UserStore.favorites.find(a => a.productID == this.props.route.params.productId) ? true : false,


            videoName: null,


            sliderModalVisible: false,


            successModalVisible: false
        };

        this.selectedProductVariationId = this.props.route.params.productId
        this.detailItem = null
    


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
    goToVideoPlayer = () => { this.props.navigation.navigate("ProductVideoPlayer", { videoName: this.state.videoName, name: this.state.name }) }
    goToBasketTab = () => { this.props.navigation.jumpTo("basketNavigator") }
    goBack = () => { this.props.navigation.goBack() }
    //////////////////////
    ///////STATE CHANGESs
    showSuccessModal = () => { this.setState({ successModalVisible: true }) }
    hideSuccessModal = () => { this.setState({ successModalVisible: false }) }
    increse = () => { this.setState({ count: this.state.count += 1 }) }
    decrease = () => {
        if (this.state.count <= 2) {
            this.setState({ count: 1 })
        } else this.setState({ count: this.state.count -= 1 })
    }
    showSliderModal = () => { this.setState({ sliderModalVisible: true }) }
    hideSliderModal = () => { this.setState({ sliderModalVisible: false }) }

    onVariationSelected = (item) => {
        this.setState({
            name: item.productShortName,
            price: item.price,
            oldPrice: item.oldPrice,
            description: item.productSelectedDetail ? item.productSelectedDetail : "",
            images: item.pictures,
            sizes: item.sizes,
            videoName: item.video_1,
        })
        // this.selectedProductVariationId = item.productID
    }

    ///////////////////
    //////REQUESTS
    getProductDetail = async () => {

        if (this.props.route.params.productId) {
            let data = await this.doRequestAsync(() => productService.GetProductById(this.props.route.params.productId))
            if (data && data.length > 0) {
                data = data[0];
                //////////////Favoriye ekleme için gerekli
                this.item = data;
                this.setState({
                    name: data.productShortName,
                    price: data.price,
                    oldPrice: data.oldPrice,
                    description: data.productSelectedDetail ? data.productSelectedDetail : "",
                    images: data.pictures,
                    sizes: data.sizes,
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

            if (data) {
                this.setState({
                    variations: [originalData, ...data]
                })
            }
        }
    }
    addToFavorites = async () => {
        if (this.state.isFavorite) {
            let resp = await this.doRequestAsync(() => favoriteService.DeleteFavoriteProduct(this.props.route.params.productId))
            if (resp.status == 200) {
                this.setState({ isFavorite: !this.state.isFavorite })
                this.props.UserStore.deleteFromFavoriteWithId(this.props.route.params.productId)
            }
        } else {
            let resp = await this.doRequestAsync(() => favoriteService.AddFavoriteProduct(this.props.route.params.productId))
            if (resp.status == 200) {
                this.setState({ isFavorite: !this.state.isFavorite })
                this.props.UserStore.addToFavorites(this.item)
            }
        }

    }
    addToBasket = async () => {
        let rsp = await this.doRequestAsync(() => basketService.addToBasket(this.selectedProductVariationId, this.state.count))
        if (rsp) {
            // showToast(I18n.t("$UrunlerSepeteEklendi"));
            this.showSuccessModal()
        }
    }

    render() {
        return (
            <SafeArea style={{ backgroundColor: color.lightGray }}>
                <ScrollablePage>
                    <Slider images={this.state.images}
                        videoName={this.state.videoName}
                        goToVideoPlayer={this.goToVideoPlayer}
                        showSliderModal={this.showSliderModal} />
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
                        showSliderModal={this.showSliderModal}
                    />


                </ScrollablePage>


                <ButtonWrapper>
                    <PrimaryButton text={I18n.t("$AnaSayfasepeteekle")} action={this.addToBasket} paddingCount={2} />
                    <SeperatorFromRightOrLeft />
                    <SecondaryButton text={I18n.t("$AnaSayfaSepetGoster")} action={this.goToBasketTab} paddingCount={2} />

                </ButtonWrapper>

                <BackButtonWrapper onPress={this.goBack}>
                    <Back />
                </BackButtonWrapper>


                <FavoriteButton action={this.addToFavorites} isFavorite={this.state.isFavorite} spaceCount={3}/>

                {
                    this.state.successModalVisible &&
                    <SuccessModal
                        successModalVisibilty={this.state.successModalVisible}
                        hideSuccessModal={this.hideSuccessModal}
                    // lottieName = "basketLottie",
                    // buttonText = I18n.t("$DetayliAramaTamam"),
                    // successMessage= I18n.t("$UrunlerSepeteEklendi")
                    />
                }
                <ImageSliderModal
                    sliderModalVisible={this.state.sliderModalVisible}
                    hideSliderModal={this.hideSliderModal}
                    images={this.state.images}
                />

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default ProductDetail;
