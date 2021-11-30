import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeArea } from '../../../../components/shared-styled.components';
import Tabbar from '../../../../components/tabbar.component';

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeArea>
        <Text style={{color:"red",fontWeight:'bold'}}> notification-list.screen(Geliştirme Aşamasında)</Text>
        <Tabbar navigation={this.props.navigation} navigatorName={"notificationNavigator"} />
      </SafeArea>
    );
  }
}

export default NotificationList;
