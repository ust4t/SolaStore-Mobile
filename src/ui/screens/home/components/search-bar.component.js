import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Touchable,
  Platform,
} from 'react-native';
import styled from 'styled-components';
import {searchIcon, basketIcon} from '../../../../util/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from 'i18n-js';

const SupWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  background-color: ${props => props.theme.color.primary};
  padding-left: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[2]};
  padding-right: ${props => props.theme.space[2]};
  padding-top: ${props => props.theme.space[2]};
`;
const SearchBarView = styled(View)`
  background-color: ${props => props.theme.color.white};

  border-radius: ${props => props.theme.radius[3]};
  flex: 1;
  flex-direction: row;
`;
const SearchEditText = styled(TextInput)`
  flex: 1;
  color: #000;
  padding: ${props =>
    Platform.OS == 'ios' ? props.theme.space[2] : props.theme.space[1]};
  padding-left: ${props => props.theme.space[2]};
`;
const SearchIconWrapper = styled(TouchableOpacity)`
  border-radius: ${props => props.theme.radius[3]};
  background-color: ${props => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
  padding-left: ${props => props.theme.space[2]};
  padding-right: ${props => props.theme.space[2]};
`;
const SearchIcon = styled(Icon).attrs(props => ({
  color: props.theme.color.white,
  size: 20,
}))``;
const BasketIconWrapper = styled(TouchableOpacity)`
  border-radius: ${props => props.theme.radius[3]};
  background-color: ${props => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
  padding-left: ${props => props.theme.space[2]};
  padding-right: ${props => props.theme.space[2]};
  margin-left: ${props => props.theme.space[2]};
`;
const ActivityLoading = styled(ActivityIndicator).attrs(props => ({
  color: props.theme.color.white,
  size: 20,
}))``;
const BasketIcon = styled(Icon).attrs(props => ({
  color: props.theme.color.white,
  size: 20,
}))``;
const SearchBar = ({goToBasket, searchText = '', onChangeText, action}) => (
  <SupWrapper
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8.3,

      elevation: 13,
    }}>
    <SearchBarView>
      <SearchEditText
        placeholder={I18n.t('$AnaSayfaArama')}
        placeholderTextColor="#909090"
        value={searchText}
        onChangeText={onChangeText}
      />

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
