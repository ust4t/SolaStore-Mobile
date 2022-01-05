import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styled from 'styled-components';
import { cartIcon, personIcon, CallIcon, whatsappIcon, heartIcon, basketIcon, personAddIcon } from '../../../../../util/icons';
import { SafeArea, ScrollablePage } from '../../../../components/shared-styled.components';
import TabBar from '../../../../components/tabbar.component';
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from 'i18n-js';
const Label = styled(Text)`
    fontWeight:bold;
    padding:${props => props.theme.space[2]};
`
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
class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /////////////
    ////NAVIGATIONS
    goToLogin = () => { this.props.navigation.navigate("UserLogin") }
    goToFavorites = () => { this.props.navigation.navigate("UserFavoriteListScreen", { force: "" }) }
    messageToWp = () => { Linking.openURL('whatsapp://send?text=hello&phone=905554000005') }
    callNumber = () => { Linking.openURL('tel:+9002124584500') }
    goToContact = () => { this.props.navigation.navigate("ContactScreen") }
    goToCart = () => { this.props.navigation.jumpTo("basketNavigator") }
    goToRegister = () => { this.props.navigation.navigate("RegisterScreen") }


    render() {
        const ProfileItems = [
            { text: I18n.t("$AnaSayfaGiriş"), icon: personIcon, action: this.goToLogin },
            { text: I18n.t("$HesabimKayitOl"), icon: personAddIcon, action: this.goToRegister },
            { text: I18n.t("$AnaSayfaFavorilerim"), icon: heartIcon, action: this.goToFavorites },
            { text: I18n.t("$AnaSayfaSepet"), icon: basketIcon, action: this.goToCart },
           

        ]
        const AdditionalItems = [
            { text: I18n.t("$AnaSayfaMagaza"), icon: cartIcon, action: this.goToContact },
            { text: I18n.t("$AnaSayfaMusteriHizmetleri"), icon: CallIcon, action: this.callNumber },
            { text: I18n.t("$AnaSayfaWhatsapp"), icon: whatsappIcon, action: this.messageToWp },
        ]
        return (
            <SafeArea>
                {/* <Label>
                    Hesabım
                </Label> */}

                <ScrollablePage>
                    <Wrapper>
                        <Label>
                            {I18n.t("$AnaSayfaProfilim")}
                        </Label>
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
                        <Label>
                            {I18n.t("$HesabimYardim")}
                        </Label>
                        {
                            AdditionalItems.map((item, index) => {
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
                </ScrollablePage>


                <TabBar navigation={this.props.navigation} navigatorName={"userNavigator"} />
            </SafeArea>
        );
    }
}

export default UserMenu;
