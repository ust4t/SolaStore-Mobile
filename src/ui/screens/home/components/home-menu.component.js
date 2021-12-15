import React from 'react';
import { Touchable, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { heartIcon, settingsIcon, whatsappIcon } from '../../../../util/icons';
import I18n from 'i18n-js';

const SupWrapper = styled(View)`

   
    padding:${props => props.theme.space[1]};
    
`
const SubWrapper = styled(View)`
backgroundColor:${props => props.theme.color.pink};
padding:${props => props.theme.space[1]};
borderRadius:${props => props.theme.radius[2]};
flexDirection:row;

`
const TouchItem = styled(TouchableOpacity)`
padding:${props => props.theme.space[1]};
    alignItems:center;
`
const TouchIcon = styled(Icon).attrs(props => ({
    size: 20,
    color: props.theme.color.white
}))`

`
const TouchText = styled(Text)`
color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.extraSmall};
`
const Seperator = styled(View)`
padding:1px;
backgroundColor:${props => props.theme.color.white};
`
const HomeMenu = ({
    goToFavorites,
    goToContact,
    goToSettings
}) => (
    <SupWrapper style={{ alignItems: "flex-end" }}>
        <SubWrapper >

            <TouchItem onPress={goToFavorites}>
                <TouchIcon name={heartIcon} />
                <TouchText>
                    {I18n.t("$AnaSayfaFavorilerim")}
                </TouchText>
            </TouchItem>
            <Seperator style={{ transform: [{ rotate: "10deg" }] }}></Seperator>
            <TouchItem onPress={goToContact}>
                <TouchIcon name={whatsappIcon} />
                <TouchText>
                    {I18n.t("contact")}
                </TouchText>
            </TouchItem>
            <Seperator style={{ transform: [{ rotate: "10deg" }] }}></Seperator>
            <TouchItem onPress={goToSettings}>
                <TouchIcon name={settingsIcon} />
                <TouchText>
                    {I18n.t("settings")}
                </TouchText>
            </TouchItem>

        </SubWrapper>

    </SupWrapper>
);

export default React.memo(HomeMenu);
