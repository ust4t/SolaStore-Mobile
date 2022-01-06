import React from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Touchable, Platform } from 'react-native';
import styled from 'styled-components';
import { searchIcon, basketIcon } from '../../../../util/icons';
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from 'i18n-js';

const SupWrapper = styled(View)`
    width:100%;
    flexDirection:row;
    backgroundColor:${props => props.theme.color.primary};
    paddingLeft:${props => props.theme.space[2]};
    paddingBottom:${props => props.theme.space[2]};
    paddingRight:${props => props.theme.space[2]};
    paddingTop:${props => props.theme.space[2]};

`
const SearchBarView = styled(View)`
backgroundColor:${props => props.theme.color.white};
   
 
    borderRadius:${props => props.theme.radius[3]};
    flex:1;
    flexDirection:row;
`
const SearchEditText = styled(TextInput)`
    flex:1;
    
    padding:${props => Platform.OS=="ios"? props.theme.space[2]: props.theme.space[1]};
    paddingLeft:${props => props.theme.space[2]};
`
const SearchIconWrapper = styled(TouchableOpacity)`
borderRadius:${props => props.theme.radius[3]};
backgroundColor:${props => props.theme.color.secondary};
justifyContent:center;
alignItems:center;
paddingLeft:${props => props.theme.space[2]};
paddingRight:${props => props.theme.space[2]};

`
const SearchIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.white,
    size: 20
}))`
`
const BasketIconWrapper = styled(TouchableOpacity)`
borderRadius:${props => props.theme.radius[3]};
backgroundColor:${props => props.theme.color.secondary};
justifyContent:center;
alignItems:center;
paddingLeft:${props => props.theme.space[2]};
paddingRight:${props => props.theme.space[2]};
marginLeft:${props => props.theme.space[2]};
`
const ActivityLoading = styled(ActivityIndicator).attrs(props => ({
    color: props.theme.color.white,
    size: 20
}))`

`
const BasketIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.white,
    size: 20
}))`
`
const SearchBar = ({
    goToBasket,
    searchText = "",
    onChangeText,
    action
}) => (
    <SupWrapper style={{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8.30,

        elevation: 13,
    }}>
        <SearchBarView>
            <SearchEditText
            
            placeholder={I18n.t("$AnaSayfaArama")} value={searchText} onChangeText={onChangeText} />

            <SearchIconWrapper onPress={action}>

                <SearchIcon name={searchIcon} />



            </SearchIconWrapper>
        </SearchBarView>

        <BasketIconWrapper onPress={goToBasket}>
            <BasketIcon name={basketIcon} />
        </BasketIconWrapper>


    </SupWrapper>
);

export default React.memo(SearchBar);
