import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeArea, ScrollablePage } from '../../../components/shared-styled.components';
import { addressIcon, heartIcon, homeIcon, infoIcon, personIcon, walletIcon } from '../../../../util/icons';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import Tabbar from '../../../components/tabbar.component';

const Wrapper = styled(View)`
flex:1;
    padding:${props => props.theme.space[3]};
    marginBottom:100px;

`
const TouchableItem = styled(View)`
    backgroundColor:${props => props.theme.color.white};
    padding:${props => props.theme.space[3]};
    flexDirection:row;
    alignItems:center;
    borderRadius:${props => props.theme.radius[2]};
    marginTop:${props => props.theme.space[2]};

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
class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const ProfileItems = [
            { text: "Account", icon: personIcon, action: () => { } },
            { text: "My Address", icon: addressIcon, action: () => { } },
            { text: "My Order", icon: walletIcon, action: () => { } },
            { text: "My Favourites", icon: heartIcon, action: () => { } },
            { text: "Payment", icon: walletIcon, action: () => { } },
            { text: "Settings", icon: infoIcon, action: () => { } }
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
                                    }}>
                                        <ItemIcon name={item.icon} />
                                        <ItemText>{item.text}</ItemText>
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
