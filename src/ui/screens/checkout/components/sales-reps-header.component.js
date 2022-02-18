import I18n from 'i18n-js';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(TouchableOpacity)`
  align-items: center;
  border-width: 1px;
  border-color: ${props =>
    props.selectedRepId == 9999
      ? props.theme.color.primary
      : props.theme.color.lightGray};
`;
const HeaderText = styled(Text)`
  text-align: center;
`;
const NoRepImages = styled(Image)`
  height: 80px;
  width: 140px;
`;

const SalesRepHeader = ({action, selectedRepId}) => (
  <SupWrapper onPress={() => action(9999)} selectedRepId={selectedRepId}>
    <NoRepImages
      source={require('../../../../../assets/medias/firstorder.jpg')}
    />
    <HeaderText>{I18n.t('$UyarilarIlkSiparisim_SatisTemsilcimYok')}</HeaderText>
  </SupWrapper>
);

export default React.memo(SalesRepHeader);
