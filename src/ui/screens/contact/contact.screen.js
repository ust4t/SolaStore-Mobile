import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Dimensions, Platform } from 'react-native';
import styled from 'styled-components';
import ScreenHeader from '../../components/screen-header.component';
import { SafeArea, ScrollablePage } from '../../components/shared-styled.components';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { addressIcon, whatsappIcon } from '../../../util/icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import I18n from 'i18n-js';
const ItemTouchable = styled(TouchableOpacity)`
    flexDirection:row;
    justifyContent:center;
    alignItems:center;
`
const ItemText = styled(Text)`
padding:${props => props.theme.space[1]};
`
const LottiePhone = styled(LottieView)`
width:150px;
    height:150px;
`
const phones = [
    "+90 (0212)458 45 00",
    "+90 (0555)400 00 05",
    "+90 (0555)400 00 11",
]
const Wp = "+90 555 400 00 05";

const Title = styled(Text)`
textDecorationLine:underline;
fontWeight:bold;
padding:${props => props.theme.space[2]};
`

const PageWrapper = styled(View)`
    flex:1;
    justifyContent:center;
    alignItems:center;
    backgroundColor:${props => props.theme.color.white};
`
const WpIcon = styled(Icon).attrs({
    color: "green",
    size: 25,
    name: whatsappIcon
})`
`

const MapIconTouchable = styled(TouchableOpacity)`
    padding:${props => props.theme.space[2]};
    position:absolute;
    bottom:0;
    width:100%;
    zIndex:99;
    elevation:99;
    backgroundColor:${props => props.theme.color.white};
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    
`
const MapIcon = styled(Icon).attrs(props => ({
    size: 30,
    color: props.theme.color.secondary,
    name: addressIcon
}))`

`
const MapText = styled(Text)`
    color:${props => props.theme.color.secondary}
`

class ContactScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    ////////////////
    ////NAVIGATION
    goBack = () => { this.props.navigation.goBack() }

    messageToWp = () => { Linking.openURL('whatsapp://send?text=hello&phone=905554000005') }
    openMaps = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `41.0079975,28.9582282`;
        const label = 'Solastore';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }

    render() {
        return (
            <SafeArea>
                <ScreenHeader goBack={this.goBack} title={I18n.t("$AnaSayfaMagaza")} />
                <PageWrapper>
                    <MapIconTouchable onPress={this.openMaps}>
                        <MapIcon />
                        <MapText>
                            {I18n.t("$HesabimHaritadaGor")}
                        </MapText>
                    </MapIconTouchable>

                    {/* <LottiePhone
                        source={require("../../../../assets/medias/phoneLottie.json")}
                        autoPlay={true}
                        loop={true}
                    /> */}
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        // style={styles.map}
                        // style={{ width: Dimensions.get("window").width, height: (Dimensions.get("window").height / 2) - 100 }}
                        style={{ width: Dimensions.get("window").width, height: (Dimensions.get("window").height - 100) }}
                        region={{
                            latitude: 41.0079975,
                            longitude: 28.9582282,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}

                    >
                        <Marker
                            coordinate={{ latitude: 41.0079975, longitude: 28.9582282 }}
                        // image={{ uri: 'custom_pin' }}
                        />
                    </MapView>
                </PageWrapper>
                {/* <PageWrapper>
                    <Title>{I18n.t("phoneNumbers")}:</Title>
                    {
                        phones.map((item, index) => {
                            return <ItemText key={index}>{item}</ItemText>
                        })
                    }
                    <Title>{I18n.t("accessWithWp")}:</Title>
                    <ItemTouchable onPress={this.messageToWp}>
                        <ItemText >{Wp}</ItemText>
                        <WpIcon />
                    </ItemTouchable>
                </PageWrapper> */}






            </SafeArea>
        );
    }
}

export default ContactScreen;
