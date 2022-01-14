import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { whatsappIcon } from '../../util/icons';

const TouchableWrapper=styled(TouchableOpacity)`

width:50px;
marginBottom:${props=>props.theme.space[1]};
alignItems:center;
justifyContent:center;

`
const WpIcon = styled(Icon).attrs(props => (
    {
        name: whatsappIcon,
        color: props.theme.color.white,
        size: 40
    }
))`
marginRight:${props=>props.theme.space[1]};
backgroundColor:${props=>props.theme.color.succes};
borderRadius:20px;
opacity:0.8;
`
 
const messageToWp = () => { Linking.openURL('whatsapp://send?text=hello&phone=905554000005') }

const StaticWpIcon = ({
    
}) => (
    <TouchableWrapper onPress={messageToWp} >
       <WpIcon />
    </TouchableWrapper>
);

export default React.memo(StaticWpIcon);
