import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { color } from '../../../../../infrastructure/theme/color';
import PrimaryButton from '../../../../components/primary-button.component';
import { SafeArea, ScrollablePage } from '../../../../components/shared-styled.components';
import Body from '../components/product-detail-body.component';
import Slider from '../components/product-detail-slider.component';


const ButtonWrapper = styled(View)`
    width:100%;
    position:absolute;
    bottom:0;
    padding:${props => props.theme.space[2]};
    backgroundColor:${props => props.theme.color.white};
`

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeArea style={{backgroundColor:color.lightGray}}>
                <ScrollablePage>
                    <Slider />
                    <Body />
                </ScrollablePage>


                <ButtonWrapper>
                    <PrimaryButton text="ADD TO CART" action={()=>alert("Atanmamış!")} />
                </ButtonWrapper>
            </SafeArea>
        );
    }
}

export default ProductDetail;
