import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

const StoryBackground = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || 'red'};
  border-radius: 300px;
  width: ${props => props.width || '60px'};
  height: ${props => props.height || '60px'};
`;

const Label = styled(Text)`
  text-align: center;
  font-size: ${props => props.size || '20px'};
  font-weight: ${props => props.weight || 'normal'};
`;

const StoryImage = styled(Image)`
  border-radius: 300px;
  width: ${props => props.width || 60}px;
  height: ${props => props.height || 60}px;
  background-color: white;
`;

const StoryInnerBackground = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  background-color: white;
  width: ${props => props.width || '60px'};
  height: ${props => props.height || '60px'};
`;

const StoryListRow = ({image, label}) => {
  return (
    <TouchableOpacity style={{width: 90}}>
      <StoryBackground width="90px" height="90px" bgColor="purple">
        <StoryInnerBackground width="80px" height="80px">
          <StoryImage
            width={70}
            height={70}
            source={{
              uri: image,
            }}
          />
        </StoryInnerBackground>
      </StoryBackground>
      <Label>{label}</Label>
    </TouchableOpacity>
  );
};

export default StoryListRow;
