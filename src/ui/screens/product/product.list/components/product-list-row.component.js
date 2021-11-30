import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';


const SupWrapper = styled(View)`
    width:${props => ((Dimensions.get('window').width / 2) - (props.theme.space[3].substring(0, 2)))}px;
    padding:${props => props.theme.space[2]};
    
`
const SubWrapper = styled(TouchableOpacity)`

`

const ProductImage = styled(Image)`
width:100%;
height:150px;


borderRadius:${props => props.theme.radius[2]};
backgroundColor:${props => props.theme.color.lightGray};
`
const DescriptionWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
    paddingTop:${props => props.theme.space[1]};
`
const DescriptionLeft = styled(View)`
flex:1;
`
const DescriptionRight = styled(View)`

`
const NameText = styled(Text)`
color:${props => props.theme.color.primary};
`

const PriceText = styled(Text)`
color:${props => props.theme.color.primary};
fontWeight:bold;
fontSize:${props => props.theme.text.subtitle};
`
const IconWrapper = styled(View)`
    flexDirection:row;
    alignItems:center;
`
const StarCount = styled(Text)`
    fontSize:${props => props.theme.text.extraSmall};
    marginLeft:${props => props.theme.space[1]};
`

const StarIcon = styled(Icon).attrs(props => (
    {
        color: props.theme.color.orange,
        size: 8,
        name: "md-star"
    }
))`

`
import Icon from 'react-native-vector-icons/Ionicons'
const ProductListRow = ({
    item,
    index
}) => {
    const { image, name, price = 65 } = item;
    return (

        <SupWrapper key={index}>
            <SubWrapper>
                <ProductImage source={{ uri: image }} 
                // style={{ flex: 1, resizeMode: "contain", aspectRatio: 1 }} 
                />
                <DescriptionWrapper>

                    <DescriptionLeft>
                        <NameText>
                            {name}
                        </NameText>
                        <IconWrapper>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarCount>4.5</StarCount>

                        </IconWrapper>
                    </DescriptionLeft>

                    <DescriptionRight>
                        <PriceText>{price}</PriceText>
                    </DescriptionRight>
                </DescriptionWrapper>
            </SubWrapper>

        </SupWrapper>

    )
}

export default ProductListRow;
