import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  View,
  Alert,
  Text,
  InteractionManager,
  I18nManager,
  Platform,
  Linking,
  Modal,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';

import HomeNavigator from './home.navigator';
import UserNavigator from './user.navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationNavigator from './notification.navigator';
import {inject, observer} from 'mobx-react';
import LoadingModal from '../components/modals/loading.modal';
import BasketNavigator from './basket.navigator';
import SearchNavigator from './search.navigator';
import UpdateModal from '../components/modals/update-modal';
import tr from '../../../assets/i18n/tr';
import ru from '../../../assets/i18n/ru';
import ar from '../../../assets/i18n/ar';
import fr from '../../../assets/i18n/fr';
import en from '../../../assets/i18n/en';

import languageService from '../../services/remote/language.service';
import {resultStatus} from '../../util/enums/result-status';

import userLocalService from '../../services/local/user-local.service';
import Splash from '../components/splash.component';
import CategoriesNavigator from './categories.navigator';
import {SafeArea} from '../components/shared-styled.components';
import FavoritesNavigator from './favorites.navigator';
import NewProductNavigator from './new-products.navigator';
import OrderDetailNavigator from './order-detail.navigator';
import {intercept, observe} from 'mobx';
import I18n from '../../../assets/i18n/_i18n';
import OnBoardScreen from '../screens/onboarding/screens/on-board.screen';
import favoriteService from '../../services/remote/favorite.service';
import userService from '../../services/remote/user.service';
enableScreens(true);
const Tab = createBottomTabNavigator();

@inject('BusyStore', 'UserStore')
@observer
class MainNavigator extends Component {
  state = {
    story: [],
    likedList: [],

    storeVersion: '',
    currentVersion: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      languagesLoading: true,
      firstTime: false,
      updateModalVisible: false,
      forceRefreshFlag1: true,
    };
  }

  doRequestAsync = async (requestFunc, showLoadingModal = true) => {
    try {
      let response = await requestFunc();
      if (response.resultStatus == resultStatus.success) {
        return response.data;
      } else if (response.resultStatus == resultStatus.noContent) {
        return [];
      } else if (response.resultStatus == resultStatus.notFound) {
        return 'notFound';
      } else throw new Error(response.errorMessage);
    } catch (error) {
      // console.log(error)
      if (this._isMounted)
        this.showErrorModal(
          error.message ? error.message : I18n.t('$UyarilarBirHataOlustu'),
        );
    } finally {
    }
  };

  componentDidMount() {
    this.checkAppVersion().then(() => {
      InteractionManager.runAfterInteractions(async () => {
        await this.loginControl();
        this.getFirstTimeValue();
        // observe(this.props.UserStore.userId,()=>{

        // })
        // intercept(this.props.UserStore,"userID",change=>{
        //     console.log(change)

        //     return change
        // })
        observe(this.props.UserStore, 'languageChanged', e => {
          this.getSelectedLanguage(true);
        });
        //this.getAll()
        // await this.checkAppVersion();
        if (this.state.currentVersion === this.state.storeVersion)
          this.showUpdateModal();
      });
    });
  }

  updateApp = () => {
    Linking.openURL(
      Platform.select({
        ios: 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1532399779&mt=8',
        android:
          'https://play.google.com/store/apps/details?id=com.solastore.solastoreapp',
        default:
          'https://play.google.com/store/apps/details?id=com.solastore.solastoreapp',
      }),
    ).finally(() => {
      this.hideSuccessModal();
    });
  };

  checkAppVersion = async () => {
    const storeVersion = await VersionCheck.getLatestVersion({
      provider: Platform.OS === 'ios' ? 'appStore' : 'googlePlay',
    });

    const currentVersion = DeviceInfo.getVersion();

    this.setState({
      storeVersion,
      currentVersion,
    });
  };

  hideSuccessModal = () => {
    this.setState({updateModalVisible: false});
  };

  showUpdateModal = () => {
    this.setState({updateModalVisible: true});
  };

  getAndSetFavorites = async () => {
    let dtoResponse = await this.doRequestAsync(
      favoriteService.GetUserFavoritesList,
    );
    if (dtoResponse) {
      this.props.UserStore.setFavorites(dtoResponse);
    }
  };
  loginControl = async () => {
    const userInfos = await userLocalService.getUSerData();
    if (userInfos != null) {
      let resp = await this.doRequestAsync(() =>
        userService.isMember(userInfos.userEmail, userInfos.userPassword),
      );
      if (resp) this.props.UserStore.login(resp);
    }
    this.getAndSetFavorites();
  };

  getFirstTimeValue = async () => {
    this.setState({languagesLoading: true});
    let firstVal = await userLocalService.getFirstTimeValu();
    this.getSelectedLanguage(true);
  };

  getSelectedLanguage = async firstVal => {
    this.setState({languagesLoading: true});
    const rsp = await userLocalService.getLanguagePref();
    if (rsp) {
      I18n.locale = rsp;
    }
    this.getAll(firstVal);
  };

  getAll = async firstVal => {
    let rsp = await languageService.GetAll();

    if (rsp.resultStatus == resultStatus.success) {
      rsp = rsp.data;

      if (I18n.locale == 'tr-TR') {
        rsp.map((item, index) => {
          tr[item.defaultValue.replace('.', '')] = item.selectedValue;
        });
      } else if (I18n.locale == 'en-EN') {
        rsp.map((item, index) => {
          en[item.defaultValue.replace('.', '')] = item.selectedValue;
        });
      } else if (I18n.locale == 'ru-RU') {
        rsp.map((item, index) => {
          ru[item.defaultValue.replace('.', '')] = item.selectedValue;
        });
      } else if (I18n.locale == 'ar-AR') {
        rsp.map((item, index) => {
          ar[item.defaultValue.replace('.', '')] = item.selectedValue;
        });
      } else if (I18n.locale == 'fr-FR') {
        rsp.map((item, index) => {
          fr[item.defaultValue.replace('.', '')] = item.selectedValue;
        });
      } else {
        I18n.locale = 'tr-TR';
        rsp.map((item, index) => {
          tr[item.defaultValue.replace('.', '')] = item.selectedValue;
        });
      }
    }
    if (firstVal) {
      this.setState({firstTime: false});
    } else {
      this.setState({firstTime: true});
    }
    this.setState({
      languagesLoading: false,
    });
  };

  finish = () => {
    userLocalService.storeFirstTime('true');
    this.setState({
      firstTime: false,
    });
  };

  render() {
    if (this.state.languagesLoading) {
      return <Splash />;
    }
    if (this.state.firstTime) {
      return <OnBoardScreen finish={this.finish} />;
    }
    return (
      <>
        <UpdateModal
          successModalVisibilty={this.state.updateModalVisible}
          onUpdate={this.updateApp}
          buttonText={I18n.t('updateButton')}
          successMessage={I18n.t('updateModal')}
        />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName = 'md-home';

                if (route.name === 'homeNavigator') {
                  iconName = 'md-home';
                } else if (route.name === 'userNavigator') {
                  iconName = 'md-person';
                }
                // else if (route.name === 'InfoContainer') {
                //     iconName = "md-information-circle-outline"
                // }
                // else if (route.name === 'TransactionContainer') {
                //     iconName = transactionIcon
                // }

                // if (focused) {
                //     return <Icon name={iconName} size={size + 5} color={color} />;
                // }
                return <Icon name={iconName} size={size} color={color} />;
              },
              headerShown: false,
              tabBarStyle: {
                borderTopColor: 'rgba(0, 0, 0, .2)',
                height: 0,
              },
              // tabBarInactiveTintColor: 'red',
              // tabBarActiveTintColor: colors.bg.primary,
              tabBarShowLabel: false,
            })}>
            <Tab.Screen name="homeNavigator" component={HomeNavigator} />
            <Tab.Screen
              name="categoriesNavigator"
              component={CategoriesNavigator}
            />
            <Tab.Screen name="userNavigator" component={UserNavigator} />
            <Tab.Screen
              name="newProductNavigator"
              component={NewProductNavigator}
            />
            <Tab.Screen
              name="orderDetailNavigator"
              component={OrderDetailNavigator}
              options={({route}) => ({
                unmountOnBlur: true,
              })}
            />
            <Tab.Screen
              name="favoritesNavigator"
              component={FavoritesNavigator}
              options={({route}) => ({
                unmountOnBlur: true,
              })}
            />
            {/* <Tab.Screen name="searchNavigator" component={SearchNavigator}
                            options={({ route }) => (
                                {
                                    unmountOnBlur: true
                                }
                            )} /> */}
            <Tab.Screen
              name="basketNavigator"
              component={BasketNavigator}
              options={({route}) => ({
                unmountOnBlur: true,
              })}
            />
          </Tab.Navigator>
          {this.props.BusyStore.requestCount > 0 && <LoadingModal />}
        </NavigationContainer>
      </>
    );
  }
}

export default MainNavigator;
