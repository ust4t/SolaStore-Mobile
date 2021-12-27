import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { repUrl } from '../../../../util/constants';
const SupWrapper = styled(TouchableOpacity)`
    alignItems:center;
    padding:${props => props.theme.space[1]};
`
const RepImage = styled(Image)`
    width:${props=>props.specifiedWidth};
    height:${props=>props.specifiedWidth};

    backgroundColor:${props => props.theme.color.lightGray};
    borderWidth:${props => props.selectedRepId == props.id ? "2px" : "0px"};
    borderColor:${props => props.theme.color.primary};
`
const RepName = styled(Text)`

`


const SalesRepsListRow = ({
    item, index, selectedRepId, onRepSelected,specifiedWidth
}) => {
    const { name, surname, pictureGuidName, id } = item;
    return (
        <SupWrapper key={index} onPress={() => onRepSelected(id)}>
            <RepImage  source={{ uri: `${repUrl}${pictureGuidName}` }} selectedRepId={selectedRepId} id={id} specifiedWidth={specifiedWidth} />
            <RepName>
                {name}
            </RepName>
            {/* <RepName>
                {surname}
            </RepName> */}
        </SupWrapper>
    );
}

export default React.memo(SalesRepsListRow);
