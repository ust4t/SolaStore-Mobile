import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ErrorText, SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import { addressIcon, basketIcon, heartIcon, homeIcon, whatsappIcon, ordersIcon, personIcon, settingsIcon, walletIcon, lockIcon, cartIcon, CallIcon } from '../../../../util/icons';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import Tabbar from '../../../components/tabbar.component';
import { inject, observer } from 'mobx-react';
import I18n, { toHumanSize } from 'i18n-js';
import DeviceInfo from 'react-native-device-info';
import BaseScreen from '../../../shared/base.screen';
import favoriteService from '../../../../services/remote/favorite.service';

const Wrapper = styled(View)`
flex:1;
    padding:${props => props.theme.space[3]};
    marginBottom:100px;

`
const TouchableItem = styled(View)`
    backgroundColor:${props => props.theme.color.white};
    
    marginTop:${props => props.theme.space[2]};
    borderRadius:${props => props.theme.radius[2]};

`
const TouchableInner = styled(TouchableOpacity)`
padding:${props => props.theme.space[3]};
    flexDirection:row;
    alignItems:center;
    borderRadius:${props => props.theme.radius[2]};
`

const ItemIcon = styled(Icon).attrs(props => ({
    size: 20,
    color: props.theme.color.primary
}))`

`
const ItemText = styled(Text)`
    color:${props => props.theme.color.primary};
    marginLeft:${props => props.theme.space[2]};
`

const UserNameText = styled(Text)`
fontWeight:bold;
`
const UserMailText = styled(Text)`
    fontSize:${props => props.theme.text.extraSmall};
    marginTop:${props => props.theme.space[1]};
    
`

const HeaderWrapper = styled(View)`
    flex:1;
    justifyContent:center;
    alignItems:center;
`
const PersonIconWrapper = styled(View)`
    width:60px;
    height:60px;
    borderRadius:30px;
    border:4px;
    borderColor:${props => props.theme.color.white};
    justifyContent:center;
    alignItems:center;

`
const PersonIcon = styled(Icon).attrs(props => ({
    size: 45,
    color: props.theme.color.primary
}))`


`
@inject("UserStore", "BusyStore")
@observer
class UserScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        };
    }
    logout = () => {
        this.getAndSetFavorites()
    }
    getAndSetFavorites = async () => {
        let dtoResponse = await this.doRequestAsync(() => favoriteService.GetUserFavoritesList(DeviceInfo.getUniqueId()))
        if (dtoResponse) {
            this.props.UserStore.setFavorites(dtoResponse)
        }
        this.props.UserStore.logout()
    }

    /////////////////////
    ////NAVIGATION
    goToFavorites = () => { this.props.navigation.navigate("UserFavoriteListScreen", { force: "" }) }
    goToOrders = () => { this.props.navigation.navigate("OrderListScreen") }
    goToProfile = () => { this.props.navigation.navigate("ProfileScreen") }
    goToBasket = () => { this.props.navigation.jumpTo("basketNavigator") }
    goToContact = () => { this.props.navigation.navigate("ContactScreen") }
    goToSettings = () => { this.props.navigation.navigate("SettingScreen") }
    goNewPassword = () => { this.props.navigation.navigate("NewPasswordScreen") }

    messageToWp = () => { Linking.openURL('whatsapp://send?text=hello&phone=905554000005') }
    callNumber = () => { Linking.openURL('tel:+9002124584500') }



    render() {
        const ProfileItems = [
            { text: I18n.t("$AnaSayfaProfilim"), icon: personIcon, action: this.goToProfile },
            { text: I18n.t("$AnaSayfaSepet"), icon: basketIcon, action: this.goToBasket },
            { text: I18n.t("$AnaSayfaSiparişlerim"), icon: ordersIcon, action: this.goToOrders },
            { text: I18n.t("$AnaSayfaFavorilerim"), icon: heartIcon, action: this.goToFavorites },
            // { text: I18n.t("$AnaSayfaAyarlar"), icon: settingsIcon, action: this.goToSettings },
            { text: I18n.t("$HesabimSifreDegisikligi"), icon: lockIcon, action: this.goNewPassword },
            // { text:  I18n.t("contact"), icon: whatsappIcon, action: this.goToContact },
            { text: I18n.t("$AnaSayfaMagaza"), icon: cartIcon, action: this.goToContact },
            { text: I18n.t("$AnaSayfaMusteriHizmetleri"), icon: CallIcon, action: this.callNumber },
            { text: I18n.t("$AnaSayfaWhatsapp"), icon: whatsappIcon, action: this.messageToWp },


        ]
        return (
            <SafeArea>

                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Wrapper>
                        <HeaderWrapper>
                            <PersonIconWrapper>
                                <PersonIcon name={personIcon} />
                            </PersonIconWrapper>

                            <UserNameText>
                                {this.props.UserStore.userName} {this.props.UserStore.userSurname}
                            </UserNameText>
                            <UserMailText>
                                {this.props.UserStore.userEmail}
                            </UserMailText>

                            <TouchableOpacity onPress={this.logout}>
                                <ErrorText>
                                    {I18n.t("$HesabimCikisYap")}
                                </ErrorText>
                            </TouchableOpacity>
                        </HeaderWrapper>
                        {
                            ProfileItems.map((item, index) => {
                                return (
                                    <TouchableItem key={index} style={{
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                    }}
                                    >
                                        <TouchableInner onPress={item.action}>
                                            <ItemIcon name={item.icon} />
                                            <ItemText>{item.text}</ItemText>
                                        </TouchableInner>

                                    </TouchableItem>
                                )
                            })
                        }
                    </Wrapper>
                </ScrollView>



                <this.RenderErrorModal />

                <Tabbar navigation={this.props.navigation} navigatorName={"userNavigator"} />
            </SafeArea>
        );
    }
}

export default UserScreen;
