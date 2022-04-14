import React from 'react';
import {View, StyleSheet, Share, Platform, Alert} from 'react-native';
import Story from 'react-native-stories-plus';
import {inject, observer} from 'mobx-react';
import I18n from 'i18n-js';

import productService from '../../../../services/remote/product.service';
import BaseScreen from '../../../shared/base.screen';
import favoriteService from '../../../../services/remote/favorite.service';
import basketService from '../../../../services/remote/basket.service';
import {encodeURLString} from '../../../../util/encodeURLString';
import SuccessModal from '../../../components/success-modal';

@inject('BusyStore', 'UserStore')
@observer
class StoryList extends BaseScreen {
  state = {
    story: [],
    likedList: [],
    successModalVisible: false,
    forceRefreshFlag1: true,
  };

  showSuccessModal = () => {
    this.setState({successModalVisible: true}, () => {
      setTimeout(() => {
        this.setState({
          forceRefreshFlag1: !this.state.forceRefreshFlag1,
        });
      }, 10);
    });
  };

  hideSuccessModal = () => {
    this.setState({successModalVisible: false});
  };

  addToFavorites = async id => {
    const favoriteState = this.props.UserStore.favorites.find(
      a => a.masterProductID == id,
    )
      ? true
      : false;

    if (favoriteState) {
      const resp = await this.doRequestAsync(() =>
        favoriteService.DeleteFavoriteProduct(id),
      );

      this.setState({
        likedList: this.state.likedList.filter(
          item => item.masterProductID !== id,
        ),
      });
      if (resp.status == 200) {
        this.props.UserStore.deleteFromFavoriteWithId(id);
      }
    } else {
      let resp = await this.doRequestAsync(() =>
        favoriteService.AddFavoriteProduct(id),
      );

      if (resp.status == 200) {
        let resp = await this.doRequestAsync(() =>
          productService.GetProductById(id),
        );
        this.props.UserStore.addToFavorites(resp[0]);
      }
    }
  };

  fetchNew = async () => {
    let dtoResponse = await this.doRequestAsync(productService.getNewProducts);
    this.setState({
      story: dtoResponse
        .slice(0, 6)
        .filter(item => item.picture_1 !== null)
        .map((item, i) => ({
          user_id: i,
          user_image: `https://solastore.com.tr/img/ProductWM/maxPic/${item.picture_1}`,
          user_name: item.productShortName,
          stories: item.pictures.map((pic, index) => ({
            id: item.masterProductID,
            productId: item.productID,
            story_id: index,
            story_image: `https://solastore.com.tr/img/ProductWM/maxPic/${pic.guidName}`,
            swipeText: I18n.t('goToProduct'),
            onBottomPress: null,
          })),
        })),
    });
  };

  addToBasket = async id => {
    let rsp = await this.doRequestAsync(() => basketService.addToBasket(id, 1));
    if (rsp) {
      const platform = Platform.OS;
      // showToast(I18n.t("$UrunlerSepeteEklendi"));
      if (platform === 'ios') {
        Alert.alert(I18n.t('$AnaSayfaSepet'), I18n.t('$UrunlerSepeteEklendi'));
      } else {
        this.showSuccessModal();
      }
    }
  };

  shareProduct = async id => {
    let resp = await this.doRequestAsync(() =>
      productService.GetProductById(id),
    );
    const respData = resp[0];
    await Share.share({
      title: respData.productShortName,
      message: `https://solastore.com.tr/detail/${encodeURLString(
        respData.productShortName,
      )}:${respData.productID}?selected=${respData.productID}`,
      url:
        Platform.OS === 'ios'
          ? `https://solastore.com.tr/detail/${encodeURLString(
              respData.productShortName,
            )}:${respData.productID}?selected=${respData.productID}`
          : '',
    });
  };

  componentDidMount() {
    this.fetchNew();
  }

  render() {
    return (
      <View style={styles.container}>
        <SuccessModal
          successModalVisibilty={this.state.successModalVisible}
          hideSuccessModal={this.hideSuccessModal}
          forceRefresh={this.state.forceRefreshFlag1}
          // lottieName = "basketLottie",
          // buttonText = I18n.t("$DetayliAramaTamam"),
          // successMessage= I18n.t("$UrunlerSepeteEklendi")
        />
        {this.state.story.length ? (
          <Story
            data={this.state.story}
            avatarSize={65}
            avatarTextStyle={{
              fontSize: 12,
            }}
            likedList={this.props.UserStore.favorites.map(
              item => item.masterProductID,
            )}
            onLikePress={this.addToFavorites}
            onCartPress={this.addToBasket}
            onSharePress={this.shareProduct}
            iconSize={45}
            duration={5}
            style={{marginTop: 30}}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}

export default StoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
