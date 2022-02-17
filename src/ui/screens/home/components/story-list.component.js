import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components';
import StoryListRow from './story-list-row.component';

const staticData = [
  {
    id: 21,
    name: 'Product',
    img: 'https://www.solastore.com.tr/wwwroot/img/ProductWM/minPic/2a942cee-a.jpg',
  },
  {
    id: 32,
    name: 'Product',
    img: 'https://www.solastore.com.tr/wwwroot/img/ProductWM/minPic/2a942cee-a.jpg',
  },
  {
    id: 44,
    name: 'Product',
    img: 'https://www.solastore.com.tr/wwwroot/img/ProductWM/minPic/2a942cee-a.jpg',
  },
];

const StoryWrapper = styled(View)`
  padding: ${props => props.theme.space[3]};
`;

const StoryList = styled(FlatList).attrs(props => ({
  horizontal: true,
  contentContainerStyle: {
    paddingRight: parseInt(props.theme.space[3].substring(0, 2)),
  },
}))`
  padding-top: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[3]};
`;

export const StoryItems = () => {
  return (
    <StoryWrapper>
      {/* <StoryList
        data={staticData}
        renderItem={({item}) => (
          <StoryItems image={item.img} label={item.name} />
        )}
      /> */}
    </StoryWrapper>
  );
};
