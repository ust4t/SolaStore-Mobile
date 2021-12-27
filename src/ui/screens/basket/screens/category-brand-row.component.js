import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import { forwardChevron } from '../../../../util/icons';
import { SeperatorFromRightOrLeft } from '../../../components/shared-styled.components';
import { brandUrl, midImageUrl } from '../../../../util/constants';

const SupWrapper = styled(View)`

    padding:${props => props.theme.space[2]};
    paddingBottom:${props => props.theme.space[1]};
    paddingTop:${props => props.theme.space[1]};

`
const Wrapper = styled(TouchableOpacity)`
backgroundColor:${props => props.theme.color.white};
padding:${props => props.theme.space[2]};
flexDirection:row;
alignItems:center;
`
const ImageOfItem = styled(Image)`

width:${props => props.type == 1 ? "80px" : "100px"};
height:${props => props.type == 1 ? "120px" : "72px"};

borderRadius:${props => props.theme.radius[2]};
`
const NameOfItem = styled(Text)`
flex:1;
fontWeight:bold;
`
const IconOfItem = styled(Icon).attrs(props => ({
    size: 20,
    name: forwardChevron,
    color: props => props.theme.color.secondary
}))`
`

const CategoryBrandRow = ({
    item,
    index,
    textPropertyName,
    imagePropertyName,
    type,
    action
}) => {
    const { } = item;
    return (
        <SupWrapper ket={index}>
            <Wrapper onPress={() => action(item)}>
                <ImageOfItem source={{
                    uri: (type == 1 ? midImageUrl : brandUrl) + item[imagePropertyName]
                }} resizeMode="contain"
                    type={type} />
                <SeperatorFromRightOrLeft />
                <NameOfItem>
                    {item[textPropertyName]}
                </NameOfItem>
                <IconOfItem />
            </Wrapper>


        </SupWrapper>

    );

}
export default React.memo(CategoryBrandRow);
