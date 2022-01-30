import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Entypo'
import { SocialMediasList } from '../../util/constants';
const SupWrapper = styled(View)`
width:100%;
justifyContent:space-around;
flexDirection:row;
marginTop:25px;
borderTopWidth:1px;
borderTopColor:${props=>props.theme.color.lightGray};
paddingTop:${props=>props.theme.space[2]};
marginBottom:70px;
`
const Wrapper = styled(View)`
    alignItems:center;
    justifyContent:center;
`
const Touchable = styled(TouchableOpacity)`
    width:35px;
    height:35px;
    borderRadius:15px;
    borderWidth:1px;
    borderColor:${props => props.theme.color.gray};
    alignItems:center;
    justifyContent:center;
`
const SocialMediaIcon = styled(FeatherIcon).attrs(props => ({
    name: props.iconName,
    color: props.theme.color.darkGray,
    size: 25
}))`

`


const SocialMedias = ({
    openLink,
}) => {
  
    return (
        <SupWrapper>
            {
                SocialMediasList.map((item, index) => {
                    return (
                        <Wrapper key={index}>
                            <Touchable onPress={() => openLink(item.link)}>
                                <SocialMediaIcon iconName={item.iconName} />
                            </Touchable>
                        </Wrapper>
                    )
                })
            }

        </SupWrapper>

    );
}

export default React.memo(SocialMedias);
