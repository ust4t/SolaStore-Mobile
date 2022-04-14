import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Entypo';
import {SocialMediasList} from '../../util/constants';
const SupWrapper = styled(View)`
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 25px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.color.lightGray};
  padding-top: ${props => props.theme.space[2]};
  margin-bottom: 70px;
`;
const Wrapper = styled(View)`
  align-items: center;
  justify-content: center;
`;
const Touchable = styled(TouchableOpacity)`
  width: 35px;
  height: 35px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${props => props.theme.color.gray};
  align-items: center;
  justify-content: center;
`;
const SocialMediaIcon = styled(FeatherIcon).attrs(props => ({
  name: props.iconName,
  color: props.theme.color.darkGray,
  size: 25,
}))``;

const SocialMedias = ({openLink}) => {
  return (
    <SupWrapper>
      {SocialMediasList.map((item, index) => {
        return (
          <Wrapper key={`${index}..|`}>
            <Touchable onPress={() => openLink(item.link)}>
              <SocialMediaIcon iconName={item.iconName} />
            </Touchable>
          </Wrapper>
        );
      })}
    </SupWrapper>
  );
};

export default React.memo(SocialMedias);
