import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components';
import { cartIcon, heartIcon, heartOutlineIcon } from '../../../../../util/icons';

const Touchable = styled(TouchableOpacity)`
    padding:${props => props.theme.space[2]};
`

const AddedIcon = styled(Icon).attrs(props => ({
    name: cartIcon,
    size: 30,
    color: props.theme.color.primary
}))`

`

const CartButton = ({
    action,

}) => (
    <Touchable onPress={action}>

        <AddedIcon />


    </Touchable>

);

export default React.memo(CartButton);
