import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import Video from 'react-native-video';
import { videoUrl } from '../../../../../util/constants';
import ScreenHeader from '../../../../components/screen-header.component';
import LoadingModal from '../../../../components/modals/loading.modal';

class ProductVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingModalVisible: false
        };
    }


    ////////////////////
    /////NAVIGATION
    showLoading = () => { this.setState({ loadingModalVisible: true }) }
    hideLoading = () => { this.setState({ loadingModalVisible: false }) }

    ////////////////////
    /////NAVIGATION
    goBack = () => { this.props.navigation.goBack() }



    render() {
        return (
            <SafeArea>
                {/* <ScreenHeader title={this.props.route.params.name} goBack={this.goBack} /> */}
                <Video source={{ uri: `${videoUrl}${this.props.route.params.videoName}` }}   // Can be a URL or a local file.
                    // ref={(ref) => {
                    //     this.player = ref
                    // }}                                      // Store reference
                    onLoadStart={this.showLoading}
                    onLoad={this.hideLoading}               // Callback when remote video is buffering
                    // onError={this.videoError}               // Callback when video cannot be loaded
                    // fullscreen={true}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0

                    }}
                    repeat={true}
                    resizeMode="contain"
                    controls={true}
                />

                {
                    this.state.loadingModalVisible &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={30} />

                    </View>
                }
            </SafeArea>
        );
    }
}

export default ProductVideoPlayer;
