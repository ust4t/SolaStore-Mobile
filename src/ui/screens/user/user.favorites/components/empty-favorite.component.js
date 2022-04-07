import I18n from 'i18n-js';
import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {heartIcon} from '../../../../../util/icons';
import {SeperatorFromTopOrBottom} from '../../../../components/shared-styled.components';
import PrimaryButton from '../../../../components/primary-button.component';

const Supwrapper = styled(View)`
  padding: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[0]};
  align-items: center;
  justify-content: center;
`;
const Label = styled(Text)``;
const IconWrapper = styled(View)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.white};
  align-items: center;
  justify-content: center;
`;
const BIcon = styled(Icon).attrs(props => ({
  name: heartIcon,
  size: 50,
}))``;
const TitleWrapper = styled(View)`
  width: 100%;
  background-color: ${props => props.theme.color.white};
`;

const Title = styled(Text)`
  color: ${props => props.theme.color.tertiary};
  font-size: ${props => props.theme.text.h2};
  padding-left: ${props => props.theme.space[3]};
  font-weight: bold;
`;
const EmptyFavorite = ({goToHomeTab}) => (
  <Supwrapper>
    <SeperatorFromTopOrBottom />
    <SeperatorFromTopOrBottom />
    <SeperatorFromTopOrBottom />
    <IconWrapper>
      <BIcon />
    </IconWrapper>
    <SeperatorFromTopOrBottom />
    <Label>{I18n.t('$FavoriBos')}</Label>
    <SeperatorFromTopOrBottom />

    <PrimaryButton
      text={I18n.t('$SiparisAlisveriseDevamEt')}
      action={goToHomeTab}
      flexOrWidth={2}
    />
  </Supwrapper>
);

export default React.memo(EmptyFavorite);
