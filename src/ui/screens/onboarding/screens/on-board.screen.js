import React, { Component, useState } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { SafeArea } from '../../../components/shared-styled.components';
import FirstPage from '../components/first-page.component';
import SecondaryPage from '../components/secondary-page.component';
const deviceWidth = Dimensions.get('window').width;
const Slider = styled(ScrollView).attrs({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false

})`
flex:1;
backgroundColor:${props => props.theme.color.white};
`
const SliderView = styled(View)`
width:${props => deviceWidth}px;
`

const ThumbnailWrapper = styled(View)`
    width:100%;
    justifyContent:center;
    flexDirection:row;
    position:absolute;
    bottom:5px;
`
const Tn = styled(View)`
    padding:${props => props.theme.space[1]};
`
const Thumbnail = styled(View)`
backgroundColor:${props => props.tnColor == props.index ? props.theme.color.primary : props.theme.color.lightGray};
width:8px;
height:8px;
borderRadius:4px;
`
const OnBoard = ({
    finish
}) => {
    const [activePage, setActivePage] = useState(0);
    return (
        <SafeArea>
            <Slider
                onScroll={(event) => {
                    setActivePage(Math.round(parseFloat(event.nativeEvent.contentOffset.x / deviceWidth)))
                }}>
                <FirstPage />
                <SecondaryPage finish={finish} />



            </Slider>
            <ThumbnailWrapper>
                {
                    [1, 2].map((item, index) => {
                        return (
                            <Tn key={index}>
                                <Thumbnail tnColor={activePage} index={index}>

                                </Thumbnail>
                            </Tn>
                        )
                    })
                }

            </ThumbnailWrapper>
        </SafeArea>
    );
}

export default React.memo(OnBoard);

