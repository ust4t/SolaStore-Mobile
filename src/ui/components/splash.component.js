import React from 'react';
import { View ,Text,Image} from 'react-native';
import styled from 'styled-components';
const SupWrappers=styled(View)`
    flex:1;
    alignItems:center;
    justifyContent:center;
    backgroundColor:${props=>props.theme.color.white};
`
const Logo=styled(Image)`
    height:196px;
    width:196px;
`
const SplashComponent = ({
    
}) => (
    <SupWrappers>
        <Logo source={require("../../../assets/medias/sola.jpg")} />
    </SupWrappers>
);

export default React.memo(SplashComponent);
