import I18n from 'i18n-js';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

const SupWrapper = styled(TouchableOpacity)`
    alignItems:center;
    borderWidth:1px;
    borderColor:${props =>props.selectedRepId == 9999 ? props.theme.color.primary:props.theme.color.lightGray};
`
const HeaderText = styled(Text)`
  
    textAlign:center;

`
const NoRepImages = styled(Image)`
    height:80px;
    width:80px;
`


const SalesRepHeader = ({
    action,
    selectedRepId
}) => (
    <SupWrapper onPress={() => action(9999)} selectedRepId={selectedRepId}>
        <NoRepImages source={require("../../../../../assets/medias/sola.jpg")} />
        <HeaderText >
            {I18n.t("$UyarilarIlkSiparisim_SatisTemsilcimYok")}
            </HeaderText>
    </SupWrapper>
);

export default React.memo(SalesRepHeader);
