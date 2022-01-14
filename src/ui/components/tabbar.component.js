import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { basketIcon, heartIcon, homeIcon, notificationIcon, ordersIcon, personIcon, searchIcon, starIcon } from '../../util/icons';
import { color } from '../../infrastructure/theme/color';
import I18n from 'i18n-js';
import StaticWpButton from './static-wp-button.component';
const SupWrapper = styled(View)`

paddingBottom:${props => props.theme.space[2]};
paddingLeft:5px;
paddingRight:5px;
position:absolute;
width:100%;
bottom:0;
right:0;
zIndex:99;
elevation:99;

`
const SubWrapper = styled(View)`
flexDirection:row;
padding:${props => props.theme.space[2]};
backgroundColor:${props => props.theme.color.white};
borderRadius:${props => props.theme.radius[3]};
justifyContent:space-around;

`
const IconWrapper = styled(TouchableOpacity)`
    alignItems:center;
    flex:1;
`
const TabbarICon = styled(Icon).attrs({
    size: 25
})`

`
const TabText = styled(Text)`
    fontSize:${props => props.theme.text.extraSmall};
    textAlign:center;
`
const Tabbar = ({
    navigation,
    navigatorName = "homeNavigator"
}) => (
    <SupWrapper>
        <StaticWpButton />
        <SubWrapper style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }}>
            <IconWrapper onPress={() => navigation.jumpTo("homeNavigator")}>
                <TabbarICon name={homeIcon} color={navigatorName == "homeNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "homeNavigator" ? color.primary : "gray"
                    }}
                >
                    {I18n.t("$AnaSayfaAnaSayfa")}
                </TabText>
            </IconWrapper>
            <IconWrapper onPress={() => navigation.jumpTo("categoriesNavigator")}>
                <TabbarICon name={ordersIcon} color={navigatorName == "categoriesNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "categoriesNavigator" ? color.primary : "gray"
                    }}
                >
                    {I18n.t("$AnaSayfaKategoriler")}
                </TabText>
            </IconWrapper>
            <IconWrapper onPress={() => navigation.jumpTo("favoritesNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={heartIcon} color={navigatorName == "favoritesNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "favoritesNavigator" ? color.primary : "gray"
                    }}
                >
                    {I18n.t("$AnaSayfaFavorilerim")}
                </TabText>
            </IconWrapper>
            {/* <IconWrapper onPress={() => navigation.jumpTo("basketNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={basketIcon} color={navigatorName == "basketNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "basketNavigator" ? color.primary : "gray"
                    }}
                >
                    {I18n.t("$AnaSayfaSepet")}
                </TabText>
            </IconWrapper> */}
            {/* <IconWrapper onPress={() => navigation.jumpTo("searchNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={searchIcon} color={navigatorName == "searchNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "searchNavigator" ? color.primary : "gray"
                    }}
                >
                     {I18n.t("$AnaSayfaARA")}
                </TabText>
            </IconWrapper> */}

            <IconWrapper onPress={() => navigation.jumpTo("newProductNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={starIcon} color={navigatorName == "newProductNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "newProductNavigator" ? color.primary : "gray"
                    }}
                >
                    {I18n.t("$AnaSayfaYeniÜrünler")}
                </TabText>
            </IconWrapper>


            <IconWrapper onPress={() => navigation.jumpTo("userNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={personIcon} color={navigatorName == "userNavigator" ? color.primary : "gray"} />
                <TabText
                    style={{
                        color: navigatorName == "userNavigator" ? color.primary : "gray"
                    }}
                >
                    {I18n.t("$AnaSayfaProfilim")}
                </TabText>
            </IconWrapper>



        </SubWrapper>
    </SupWrapper>
);

export default React.memo(Tabbar);
