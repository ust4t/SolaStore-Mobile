import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(View)`
    width:100%;
    padding:${props => props.theme.space[2]};
    flexDirection:row;
    alignItems:center;
    backgroundColor:${props=>props.theme.color.white};

`
const ItemTouch = styled(TouchableOpacity)`
    flex:1;
    justifyContent:center;
    alignItems:center;
`
const ItemImage = styled(Image)`
    width:45px;
    height:30px;
`
const LanguageSelector = ({
    onSelected
}) => (
    <SupWrapper >
        <ItemTouch onPress={()=>onSelected("tr-TR")}>
            <ItemImage source={require("../../../../../assets/medias/tr.jpg")} />
        </ItemTouch>

        <ItemTouch onPress={()=>onSelected("fr-FR")}>
            <ItemImage source={require("../../../../../assets/medias/fr.jpg")} />
        </ItemTouch>

        <ItemTouch onPress={()=>onSelected("ru-RU")}>
            <ItemImage source={require("../../../../../assets/medias/rs.jpg")} />
        </ItemTouch>

        <ItemTouch onPress={()=>onSelected("ar-AR")}>
            <ItemImage source={require("../../../../../assets/medias/sa.jpg")} />
        </ItemTouch>

        <ItemTouch onPress={()=>onSelected("en-EN")}>
            <ItemImage source={require("../../../../../assets/medias/uk.jpg")} />
        </ItemTouch>


    </SupWrapper>
);

export default React.memo(LanguageSelector);
