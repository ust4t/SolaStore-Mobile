import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ErrorText, SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import { addressIcon, basketIcon, heartIcon, homeIcon, whatsappIcon, ordersIcon, personIcon, settingsIcon, walletIcon, lockIcon } from '../../../../util/icons';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import Tabbar from '../../../components/tabbar.component';
import { inject, observer } from 'mobx-react';
import I18n from 'i18n-js';

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
@inject("UserStore")
@observer
class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    logOut = () => { this.props.UserStore.logout() }

    /////////////////////
    ////NAVIGATION
    goToFavorites = () => { this.props.navigation.navigate("UserFavoriteListScreen") }
    goToOrders = () => { this.props.navigation.navigate("OrderListScreen") }
    goToProfile = () => { this.props.navigation.navigate("ProfileScreen") }
    goToBasket = () => { this.props.navigation.navigate("basketNavigator") }
    goToContact = () => { this.props.navigation.navigate("ContactScreen") }
    goToSettings = () => { this.props.navigation.navigate("SettingScreen") }
    goNewPassword = () => { this.props.navigation.navigate("NewPasswordScreen") }
    render() {
        const ProfileItems = [
            { text: I18n.t("myAccount"), icon: personIcon, action: this.goToProfile },
            { text:  I18n.t("myCart"), icon: basketIcon, action: this.goToBasket },
            { text:  I18n.t("myOrders"), icon: ordersIcon, action: this.goToOrders },
            { text:  I18n.t("favorites"), icon: heartIcon, action: this.goToFavorites },
            { text:  I18n.t("settings"), icon: settingsIcon, action: this.goToSettings },
            { text: I18n.t("psChange"), icon: lockIcon, action: this.goNewPassword },
            { text:  I18n.t("contact"), icon: whatsappIcon, action: this.goToContact },

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

                            <TouchableOpacity onPress={this.logOut}>
                                <ErrorText>
                                    {I18n.t("logout")}
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





                <Tabbar navigation={this.props.navigation} navigatorName={"userNavigator"} />
            </SafeArea>
        );
    }
}

export default UserScreen;
