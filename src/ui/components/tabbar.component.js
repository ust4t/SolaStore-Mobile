import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { basketIcon, homeIcon, notificationIcon, personIcon, searchIcon } from '../../util/icons';
import { color } from '../../infrastructure/theme/color';
const SupWrapper = styled(View)`
padding:${props => props.theme.space[3]};
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

`
const TabbarICon = styled(Icon).attrs({
    size: 30
})`

`
const Tabbar = ({
    navigation,
    navigatorName = "homeNavigator"
}) => (
    <SupWrapper>
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
                <TabbarICon name={homeIcon} color={navigatorName == "homeNavigator" ? color.primary : color.lightGray} />
            </IconWrapper>
            <IconWrapper onPress={() => navigation.jumpTo("basketNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={basketIcon} color={navigatorName == "basketNavigator" ? color.primary : color.lightGray} />
            </IconWrapper>
            <IconWrapper onPress={() => navigation.jumpTo("searchNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={searchIcon} color={navigatorName == "searchNavigator" ? color.primary : color.lightGray} />
            </IconWrapper>
            <IconWrapper onPress={() => navigation.jumpTo("userNavigator")} navigatorName={navigatorName}>
                <TabbarICon name={personIcon} color={navigatorName == "userNavigator" ? color.primary : color.lightGray} />
            </IconWrapper>

        </SubWrapper>
    </SupWrapper>
);

export default React.memo(Tabbar);
