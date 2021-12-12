import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components';
import { heartIcon, heartOutlineIcon } from '../../../../../util/icons';

const Touchable = styled(TouchableOpacity)`
    padding:${props => props.theme.space[2]};
`
const FavoiteIcon = styled(Icon).attrs(props => ({
    name: heartOutlineIcon,
    size: 30
}))`

`
const AddedIcon = styled(Icon).attrs(props => ({
    name: heartIcon,
    size: 30,
    color: "red"
}))`

`

const FavoriteButton = ({
    action,
    isFavorite
}) => (
    <Touchable onPress={action}>
        {
            isFavorite ?
                <AddedIcon />
                :
                <FavoiteIcon />
        }
       
    </Touchable>

);

export default FavoriteButton;
