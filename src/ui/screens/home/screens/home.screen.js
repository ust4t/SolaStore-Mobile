import React, {Component} from 'react';
import {
  View,
  Text,
  InteractionManager,
  ScrollView,
  I18nManager,
  ActivityIndicator,
  Linking,
  Dimensions,
  FlatList,
} from 'react-native';

import categoryService from '../../../../services/remote/category.service';
import {Categories, Products} from '../../../../util/fake-data';
import {
  Line,
  SafeArea,
  ScrollablePage,
  SeperatorFromTopOrBottom,
} from '../../../components/shared-styled.components';
import Tabbar from '../../../components/tabbar.component';
import BaseScreen from '../../../shared/base.screen';
import CategoryList from '../components/category-list.component';
import SearchBar from '../components/search-bar.component';
import {inject, observer} from 'mobx-react';
import productService from '../../../../services/remote/product.service';
import userLocalService from '../../../../services/local/user-local.service';
import I18n from '../../../../../assets/i18n/_i18n';
import _I18n from '../../../../../assets/i18n/_i18n';
import LanguageSelector from '../components/language-selector.component';
import {showToast} from '../../../../util/toast-message';
import DetailedSearch from '../components/detailed-search.component';
import SelectListModal from '../../../components/modals/selectlist-modal';
import brandService from '../../../../services/remote/brand.service';
import HomeSlider from '../components/home-slider.component';
import styled from 'styled-components';
import MultipleSelectListModal from '../../../components/modals/multiple-select-list.modal';
import advertisingService from '../../../../services/remote/advertising.service';
import SpecificCategories from '../components/specific-categories.screen';
import HomeBrands from '../components/home-brands.component';
import {space} from '../../../../infrastructure/theme/space';
import HomeCampaigns from '../components/home-campaigns.component';
import SocialMedias from '../../../components/social-medias.component';
import {brandUrl, SocialMediasList} from '../../../../util/constants';
import {StoryItems} from '../components/story-list.component';

///////////brand images calculates
const deviceWidth = Dimensions.get('window').width;
const smallPaddingSum = 8 * space[1].substr(0, 1);
const bigPaddingSum = 2 * space[2].substr(0, 2);
const oneBrandImageWidth = (deviceWidth - smallPaddingSum - bigPaddingSum) / 4;
const oneBrandImageHeight = (oneBrandImageWidth / 160) * 110;

const smallCmpSum = 4 * space[1].substr(0, 1);
const oneCmpImageWidth = (deviceWidth - smallCmpSum - bigPaddingSum) / 2;
const oneCmpImageHeight = (oneCmpImageWidth / 410) * 470;

const smallSpecSum = 2 * space[2].substr(0, 2);
const oneSpecImageWidth = deviceWidth - smallSpecSum;
const oneSpecImageHeight = (oneSpecImageWidth / 1000) * 595;

const prices = [
  '0-10 USD',
  '10-20 USD',
  '20-30 USD',
  '30-40 USD',
  '40-50 USD',
  '50-60 USD',
  '60-70 USD',
  '70-80 USD',
  '80-90 USD',
  '90-100 USD',
];
const PageScrollable = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingBottom: 100,
  },
})``;

const LoadingIndicator = styled(ActivityIndicator).attrs(props => ({
  color: props.theme.color.primary,
  size: 30,
}))`
  padding: ${props => props.theme.space[5]};
`;

@inject('BusyStore', 'UserStore')
@observer
class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      categories: [],
      categoriesForList: [
        {
          selectedCategoryName: '',
        },
      ],

      // subCategories: [],
      products: [],
      popularProducts: [],
      brands: [],
      organizedBrands: [],

      selectedCategories: [],

      selectedBrands: [],

      selectedRange: null,

      categoriesModalVisible: false,
      brandsModalVisible: false,
      pricesModalVisible: false,

      ads: [],

      searchText: '',

      categoriesLoading: true,
      brandsLoading: false,

      organizedCampaigns: [],
      mainCampaignsLoading: false,
    };

    this.mainCampainsIsLoaded = false;
  }
  /////////////////////////
  ///////MODAL
  showCategoriesModal = () => {
    this.setState({categoriesModalVisible: true});
  };
  hideCategoriesModal = () => {
    this.setState({categoriesModalVisible: false});
  };
  hideCategoriesLoading = () => {
    this.setState({categoriesLoading: false});
  };
  hideBrandsLoading = () => {
    this.setState({brandsLoading: false});
  };
  showCampingsLoading = () => {
    this.setState({mainCampaignsLoading: true});
  };
  hideCampingsLoading = () => {
    this.setState({mainCampaignsLoading: false});
  };

  showBrandsModal = () => {
    this.setState({
      brandsModalVisible: true,
    });
  };
  hideBrandsModal = () => {
    this.setState({
      brandsModalVisible: false,
    });
  };
  showPricesModal = () => {
    this.setState({pricesModalVisible: true});
  };
  hidePricesModal = () => {
    this.setState({pricesModalVisible: false});
  };
  onCategorySelected = item => {
    // this.setState({ selectedCategory: item });
    if (item == null) {
      if (
        this.state.selectedCategories.length ==
        this.state.categories.slice(0, this.state.categories.length - 3).length
      ) {
        this.setState({
          selectedCategories: [],
        });
      } else {
        this.setState({
          selectedCategories: [
            ...this.state.categories.slice(0, this.state.categories.length - 3),
          ],
        });
      }

      return;
    }
    if (this.state.selectedCategories.includes(item)) {
      this.setState({
        selectedCategories: this.state.selectedCategories.filter(
          x => x != item,
        ),
      });
    } else {
      this.setState({
        selectedCategories: [item, ...this.state.selectedCategories],
      });
    }
  };
  onBrandSelected = item => {
    if (item == null) {
      if (this.state.selectedBrands.length == this.state.brands.length) {
        this.setState({
          selectedBrands: [],
        });
      } else {
        this.setState({
          selectedBrands: [...this.state.brands],
        });
      }

      return;
    }

    if (this.state.selectedBrands.includes(item)) {
      this.setState({
        selectedBrands: this.state.selectedBrands.filter(x => x != item),
      });
    } else {
      this.setState({
        selectedBrands: [item, ...this.state.selectedBrands],
      });
    }
  };
  onPriceRangeSelected = item => {
    this.setState({selectedRange: item});
    this.hidePricesModal();
  };

  /////////////////////////
  ///////REQUESTS
  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      await this.getSelectedLanguage();
      // this.loginControl() mainnavigatore taşındı
      this.getAllCategories();
      this.getBrands();
      this.getAdvertisingSlider();

      // this.getDiscountedProducts()
      // this.getBestSellers()
    });
  }

  // getAndSetFavorites = async () => {
  //     let dtoResponse = await this.doRequestAsync(favoriteService.GetUserFavoritesList)
  //     if (dtoResponse) {
  //         this.props.UserStore.setFavorites(dtoResponse)
  //     }
  // }

  // loginControl = async () => {
  //     const userInfos = await userLocalService.getUSerData()
  //     if (userInfos != null) {
  //         let resp = await this.doRequestAsync(() => userService.isMember(userInfos.userEmail, userInfos.userPassword))
  //         if (resp) this.props.UserStore.login(resp)
  //     }
  //     this.getAndSetFavorites()
  // }

  getSelectedLanguage = async () => {
    const rsp = await userLocalService.getLanguagePref();
    if (rsp) {
      I18n.locale = rsp;
    }
  };

  getAllCategories = async () => {
    // this.props.BusyStore.increase()
    let dtoRepsonse = await this.doRequestAsync(
      categoryService.getAllCategories,
      false,
    );
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
      this.setState(
        {
          categoriesForList: dtoRepsonse,
        },
        () => {
          this.getSubCategories(dtoRepsonse);
        },
      );

      // this.setState({
      //     categories: [...dtoRepsonse, ...this.state.categories]
      // }, () => {
      //     this.getSubCategories()
      // })
    }
  };
  getDiscountedProducts = async () => {
    let dtoRepsonse = await this.doRequestAsync(productService.GetSaleProducts);
    if (dtoRepsonse) {
      this.setState({
        products: dtoRepsonse,
      });
    }
  };
  getBestSellers = async () => {
    let dtoRepsonse = await this.doRequestAsync(
      productService.GetBestSellerProducts,
    );
    if (dtoRepsonse) {
      this.setState({
        popularProducts: dtoRepsonse,
      });
    }
  };
  getBrands = async () => {
    let dtoRepsonse = await this.doRequestAsync(
      brandService.GetAllBrands,
      false,
    );

    if (dtoRepsonse) {
      var organizedBrands = this.listToMatrix(dtoRepsonse, 4);
      this.setState(
        {
          brands: dtoRepsonse,
          organizedBrands: organizedBrands,
        },
        () => {},
      );
    }
    this.hideBrandsLoading();
  };
  listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
      i,
      k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  }

  chooseSliderType = id => {
    switch (id) {
      case 55552:
        return 3;
      case 55641:
        return 1;
      default:
        return 1;
    }
  };

  getAdvertisingSlider = async () => {
    let dtoResponse = await this.doRequestAsync(
      advertisingService.Slider,
      false,
    );
    if (dtoResponse) {
      this.setState({
        ads: dtoResponse.map(item => ({
          ...item,
          type: 'variation',
          variationType: this.chooseSliderType(item.pictureID),
        })),
      });
    }
  };

  getSubCategories = async mainCategories => {
    const all = [...this.state.categories];
    await mainCategories.map(async item => {
      let dtoRepsonse = await this.doRequestAsync(
        () => categoryService.GetSubCategoryList(item.categoryID),
        false,
      );
      all.push(item);
      if (dtoRepsonse) {
        dtoRepsonse.map(item => {
          item.selectedCategoryName = `--${item.selectedCategoryName}`;
        });
        all.push(...dtoRepsonse);
      }
    });

    this.setState({categories: all}, () => {
      this.hideCategoriesLoading();
    });
    // this.props.BusyStore.decrease()
  };

  getMainCampaings = async () => {
    this.mainCampainsIsLoaded = true;
    this.showCampingsLoading();
    let rsp = await this.doRequestAsync(advertisingService.getCampaigns, false);
    if (rsp) {
      var organizedCampaigns = this.listToMatrix(rsp, 2);
      this.setState({
        organizedCampaigns,
      });
    }
    this.hideCampingsLoading();
  };

  /////////////////////////
  ///////NAVIGATIONS
  clearParameters = () => {
    this.setState({
      selectedCategories: [],
      selectedBrands: [],
      selectedRange: null,
    });
  };
  goToProductListWithSearchParams = () => {
    if (
      this.state.selectedCategories.length == 0 &&
      this.state.selectedBrands.length == 0 &&
      this.state.selectedRange == null
    ) {
      showToast(I18n.t('$AnaSayfaFiltreBos'));
      return;
    }
    this.props.navigation.navigate('ProductList', {
      type: 'variation',
      variationType: 4,
      selectedCategories: this.state.selectedCategories,
      selectedBrands: this.state.selectedBrands,
      priceRange: this.state.selectedRange,
    });
  };
  goToProductList = item => {
    this.props.navigation.navigate('ProductList', {
      categoryID: item.categoryID,
      type: item.type ? item.type : 'category',
      variationType: item.variationType,
    });
  };
  goToFavorites = () => {
    this.props.navigation.navigate('UserFavoriteListScreen');
  };
  goToContact = () => {
    this.props.navigation.navigate('ContactScreen');
  };
  goToSettings = () => {
    this.props.navigation.navigate('SettingScreen');
  };
  goToProductDetail = productId => {
    this.props.navigation.navigate('ProductDetail', {productId});
  };
  goToBasket = () => {
    this.props.navigation.jumpTo('basketNavigator');
  };
  goProductsWithBrand = item => {
    this.props.navigation.navigate('ProductList', {
      categoryID: item.brandID,
      type: 'brands',
    });
  };

  /////////////////////////
  ///////SEARCH
  onChangeText = val => {
    this.setState({searchText: val});
  };
  goToProductWithSearchValues = () => {
    if (this.state.searchText.length != 0)
      this.props.navigation.navigate('ProductList', {
        type: 'variation',
        variationType: 5,
        text: this.state.searchText,
      });
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 150
    );
  };

  render() {
    return (
      <SafeArea style={{backgroundColor: 'white'}}>
        <PageScrollable
          onScroll={({nativeEvent}) => {
            if (
              this.isCloseToBottom(nativeEvent) &&
              !this.mainCampainsIsLoaded &&
              !this.state.brandsLoading &&
              !this.state.mainCampaignsLoading
            ) {
              this.getMainCampaings();
            }
          }}
          scrollEventThrottle={400}>
          {/* <FlatList
                        data={SocialMediasList}

                        numColumns={8}
                        renderItem={({ item, index }) => <SocialMedias rowWidth={deviceWidth / 8} openLink={this.openLink} item={item} index={index} />}


                    /> */}
          <LanguageSelector onSelected={this.onSelected} />
          {/* <SearchBarComponent goToBasket={this.goToBasket} /> */}

          <SearchBar
            goToBasket={this.goToBasket}
            searchText={this.state.searchText}
            onChangeText={this.onChangeText}
            action={this.goToProductWithSearchValues}
          />

          <SeperatorFromTopOrBottom />
          {/* <StoryItems /> */}
          <HomeSlider
            images={this.state.ads}
            goToProductList={this.goToProductList}
          />

          {this.state.categoriesLoading ? (
            <LoadingIndicator />
          ) : (
            <CategoryList
              // categories={[...this.state.categories, ...defaultCategories]}
              categories={this.state.categoriesForList}
              goToProductList={this.goToProductList}
            />
          )}

          <SeperatorFromTopOrBottom />
          <SeperatorFromTopOrBottom />
          <DetailedSearch
            showCategoriesModal={this.showCategoriesModal}
            showBrandsModal={this.showBrandsModal}
            showPricesModal={this.showPricesModal}
            selectedRange={this.state.selectedRange}
            goToProductListWithSearchParams={
              this.goToProductListWithSearchParams
            }
            selectedCategories={this.state.selectedCategories}
            selectedBrands={this.state.selectedBrands}
            subCategories={this.state.subCategories}
            clearParameters={this.clearParameters}
          />

          <SeperatorFromTopOrBottom />
          <SpecificCategories
            goToProductList={this.goToProductList}
            oneSpecImageWidth={oneSpecImageWidth}
            oneSpecImageHeight={oneSpecImageHeight}
          />

          <SeperatorFromTopOrBottom />

          {this.state.mainCampaignsLoading ? (
            <LoadingIndicator />
          ) : (
            <HomeCampaigns
              organizedCampaigns={this.state.organizedCampaigns}
              oneCmpImageWidth={oneCmpImageWidth}
              oneCmpImageHeight={oneCmpImageHeight}
              goToProductList={this.goToProductList}
            />
          )}

          <SeperatorFromTopOrBottom />
          {this.state.brandsLoading ? (
            <LoadingIndicator />
          ) : (
            <HomeBrands
              organizedBrands={this.state.organizedBrands}
              goProductsWithBrand={this.goProductsWithBrand}
              oneBrandImageHeight={oneBrandImageWidth}
              oneBrandImageWidth={oneBrandImageWidth}
              campaignLength={this.state.organizedCampaigns.length}
            />
          )}

          <SocialMedias openLink={this.openLink} />
        </PageScrollable>

        <Tabbar
          navigation={this.props.navigation}
          navigatorName={'homeNavigator'}
        />

        <this.RenderErrorModal />

        <MultipleSelectListModal
          selectListModalVisible={this.state.categoriesModalVisible}
          hideSelectListModal={this.hideCategoriesModal}
          onSelected={this.onCategorySelected}
          selectItems={this.state.categories.slice(
            0,
            this.state.categories.length - 3,
          )}
          selectedItems={this.state.selectedCategories}
          propertyName="selectedCategoryName"
        />

        <MultipleSelectListModal
          selectListModalVisible={this.state.brandsModalVisible}
          hideSelectListModal={this.hideBrandsModal}
          onSelected={this.onBrandSelected}
          selectItems={this.state.brands}
          selectedItems={this.state.selectedBrands}
          propertyName="brandName"
        />

        <SelectListModal
          selectListModalVisible={this.state.pricesModalVisible}
          hideSelectListModal={this.hidePricesModal}
          onSelected={this.onPriceRangeSelected}
          selectItems={prices}
        />
      </SafeArea>
    );
  }

  onSelected = value => {
    userLocalService.storeLanguagePref(value);
    this.props.UserStore.changeLanguage();

    // I18n.locale = value;
    // showToast(`${value}${I18n.t("$AnaSayfaLanguageChanges")}`)
  };
}

export default HomeScreen;
