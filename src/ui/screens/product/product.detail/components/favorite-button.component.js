import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {heartIcon, heartOutlineIcon} from '../../../../../util/icons';

const Touchable = styled(TouchableOpacity)`
  position: absolute;
  top: ${props => props.theme.space[props.spaceCount]};
  right: ${props => props.theme.space[props.spaceCount]};
  z-index: 99;
  elevation: 99;
`;
const FavoiteIcon = styled(Icon).attrs(props => ({
  name: heartOutlineIcon,
  size: 30,
}))``;
const AddedIcon = styled(Icon).attrs(props => ({
  name: heartIcon,
  size: 30,
  color: 'red',
}))``;

const FavoriteButton = ({action, isFavorite, spaceCount = 2}) => {
  return (
    <Touchable onPress={action} spaceCount={spaceCount}>
      {isFavorite ? <AddedIcon /> : <FavoiteIcon />}
    </Touchable>
  );
};

export default React.memo(FavoriteButton);
