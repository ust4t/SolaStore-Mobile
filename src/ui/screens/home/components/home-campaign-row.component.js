import React from 'react';
import { View, Text ,TouchableOpacity,Image} from 'react-native';
import styled from 'styled-components';
import { mainCampaignsUrl } from '../../../../util/constants';

const Wrapper = styled(TouchableOpacity)`
padding:${props => props.theme.space[1]};
paddingBottom:0px;
paddingTop:0px;
alignItems:center;

`
const IconWrapper = styled(View)`
backgroundColor:${props => props.theme.color.white};

borderRadius:${props => props.theme.radius[2]};


`

const CategoryIcon = styled(Image)`

    width:${props => props.oneCmpImageWidth}px;
    height:${props => props.oneCmpImageHeight}px;
    borderRadius:${props => props.theme.radius[2]};
    
`

const HomeCampaignRow = ({
    item,
    index,
    oneCmpImageWidth,
    oneCmpImageHeight,
    goToProductList
}) => {
    console.log(oneCmpImageWidth,oneCmpImageHeight)
    const { pictureGuidName ,pictureLink} = item;
    return (
        <Wrapper key={index}
             onPress={() => goToProductList({categoryID: pictureLink.substr((pictureLink.indexOf("x/"))+2,pictureLink.length)})}
        >
            <IconWrapper
            >
                <CategoryIcon
                    source={{ uri: mainCampaignsUrl + pictureGuidName }}
                    resizeMode="stretch"
                    oneCmpImageWidth={oneCmpImageWidth}
                    oneCmpImageHeight={oneCmpImageHeight} 
                    />
            </IconWrapper>

        </Wrapper>
    );
}

export default React.memo(HomeCampaignRow);
