import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { forwardChevron, shareIcon } from '../../../../../util/icons';
import { Line } from '../../../../components/shared-styled.components';
import I18n from 'i18n-js';


const Wrapper = styled(View)`
    width:100%;


`

const Touch = styled(TouchableOpacity)`
backgroundColor:${props => props.theme.color.secondary};
flexDirection:row;
padding:${props => props.theme.space[2]};
borderRadius:${props => props.theme.radius[3]};
alignItems:center;
`
const Label = styled(Text)`
color:${props => props.theme.color.white};
marginLeft:${props=>props.theme.space[2]};
`
const LineView=styled(View)`
padding:1px;

backgroundColor:${props => props.theme.color.white};
    flex:1;
`
const WpIcon = styled(Icon).attrs(props => (
    {
        name: shareIcon,
        color: props.theme.color.white,
        size: 20
    }
))`
marginRight:${props=>props.theme.space[1]};
`

const ShareButton = ({
    shareProduct
}) => (
    <Wrapper style={{

    }}>
        <Touch onPress={shareProduct} >
            <LineView />
            <Label>
            {I18n.t("$UrunlerPaylas")}
            </Label>
            <WpIcon />
            <LineView />
        </Touch>
    </Wrapper>
);

export default React.memo(ShareButton);
