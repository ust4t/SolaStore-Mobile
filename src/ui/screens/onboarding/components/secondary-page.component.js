import I18n from 'i18n-js';
import React from 'react';
import { Dimensions, View } from 'react-native';
import PrimaryButton from '../../../components/primary-button.component';
import styled from 'styled-components';

const deviceWidth = Dimensions.get('window').width;
const SliderView = styled(View)`
width:${props => deviceWidth}px;
padding:${props=>props.theme.space[2]};
`
const SecondaryPage = ({
    finish
}) => (
    <SliderView>
        <PrimaryButton text={I18n.t("$AnaSayfaHemenKullan")} action={finish} flexOrWidth={2} paddingCount={2} />
    </SliderView>
);

export default React.memo(SecondaryPage);
