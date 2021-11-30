import React from 'react';
import { View, Text ,Image} from 'react-native';
import styled from 'styled-components';

const Wrapper=styled(View)`
padding:${props => props.theme.space[1]};
`
const IconWrapper = styled(View)`
backgroundColor:${props => props.theme.color.white};
padding:${props => props.theme.space[1]};
borderRadius:${props=>props.theme.radius[2]};

`
const CategoryTitle = styled(Text)`
color:${props => props.theme.color.primary};

`
const CategoryIcon=styled(Image)`
    height:50px;
    width:50px;
`

const CategoryListRow = ({
    item ,
    index
}) => (
    <Wrapper key={index}>
        <IconWrapper>
            <CategoryIcon source={{uri:item.categoryIcon}} />
        </IconWrapper>
        <CategoryTitle>
            {item.categoryTitle} 
        </CategoryTitle>
    </Wrapper>
);

export default React.memo(CategoryListRow);
