import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { searchIcon, basketIcon } from '../../../../util/icons';
import Icon from 'react-native-vector-icons/Ionicons'

const SupWrapper = styled(View)`
    width:100%;
    flexDirection:row;
    paddingLeft:${props => props.theme.space[3]};
    paddingRight:${props => props.theme.space[3]};
    paddingTop:${props => props.theme.space[3]};

`
const SearchBarView = styled(View)`
backgroundColor:${props => props.theme.color.white};
   
 
    borderRadius:${props => props.theme.radius[3]};
    flex:1;
    flexDirection:row;
`
const SearchEditText = styled(TextInput)`
    flex:1;
    padding:${props => props.theme.space[1]};
    paddingLeft:${props => props.theme.space[2]};
`
const SearchIconWrapper = styled(View)`
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
const BasketIcon = styled(Icon).attrs(props => ({
    color: props.theme.color.white,
    size: 20
}))`
`
const SearchBar = ({
    goToBasket=()=>{alert('bbelirtilmemis')}
}) => (
    <SupWrapper >
        <SearchBarView>
            <SearchEditText placeholder="Search" value="" />

            <SearchIconWrapper>
                <SearchIcon name={searchIcon} />
            </SearchIconWrapper>
        </SearchBarView>

        <BasketIconWrapper onPress={goToBasket}>
            <BasketIcon name={basketIcon} />
        </BasketIconWrapper>


    </SupWrapper>
);

export default React.memo(SearchBar);
