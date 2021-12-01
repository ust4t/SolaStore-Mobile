import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ErrorText, SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import { addressIcon, heartIcon, homeIcon, infoIcon, ordersIcon, personIcon, settingsIcon, walletIcon } from '../../../../util/icons';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import Tabbar from '../../../components/tabbar.component';
import { inject, observer } from 'mobx-react';

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
    logOut=()=>{this.props.UserStore.logout()}

    render() {
        const ProfileItems = [
            { text: "Account", icon: personIcon, action: () => {alert("Atanmamış!") } },
            { text: "My Address", icon: addressIcon, action: () => {alert("Atanmamış!") } },
            { text: "My Order", icon: ordersIcon, action: () => { alert("Atanmamış!")} },
            { text: "My Favourites", icon: heartIcon, action: () => {alert("Atanmamış!") } },
            { text: "Payment", icon: walletIcon, action: () => {alert("Atanmamış!") } },
            { text: "Settings", icon: settingsIcon, action: () => {alert("Atanmamış!") } }
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
                                Kylie
                        </UserNameText>
                            <UserMailText>
                                kYLİE_04@GMAİL.COM
                        </UserMailText>

                        <TouchableOpacity onPress={this.logOut}>
                            <ErrorText>
                                Çıkış Yap
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
