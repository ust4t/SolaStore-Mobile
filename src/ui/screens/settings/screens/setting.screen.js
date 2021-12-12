import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { FlagIcon } from '../../../../util/icons';
import SelectListModal from '../../../components/modals/selectlist-modal';
import ScreenHeader from '../../../components/screen-header.component';
import { SafeArea } from '../../../components/shared-styled.components';
import BaseScreen from '../../../shared/base.screen';
import Icon from 'react-native-vector-icons/Ionicons'
import userLocalService from '../../../../services/local/user-local.service';
import { showToast } from '../../../../util/toast-message';
import { inject, observer } from 'mobx-react';
import I18n from 'i18n-js';

const Wrapper = styled(View)`
flex:1;
    padding:${props => props.theme.space[3]};
    marginBottom:100px;

`
const TouchableItem = styled(View)`
    backgroundColor:${props => props.theme.color.white};
    
    marginTop:${props => props.theme.space[2]};
    borderRadius:${props => props.theme.radius[2]};

`
const TouchableInner = styled(TouchableOpacity)`
padding:${props => props.theme.space[3]};
    flexDirection:row;
    alignItems:center;
    borderRadius:${props => props.theme.radius[2]};
`

const ItemIcon = styled(Icon).attrs(props => ({
    size: 20,
    color: props.theme.color.primary
}))`

`
const ItemText = styled(Text)`
    color:${props => props.theme.color.primary};
    marginLeft:${props => props.theme.space[2]};
    flex:1;
`

const SelectedItemText = styled(Text)`
    
`

const Languages = [
    { name: "Türkçe", value: "tr-TR" },
    { name: "English", value: "en-EN" },
    { name: "Pусский", value: "ru-RU" },
    { name: "Français", value: "fr-FR" },
    { name: "عربى", value: "ar-AR" },
]

@inject("BusyStore")
@observer
class SettingScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            selectListModalVisible: false,
            selectedLanguage: ""
        };
    }
    ////////////////
    ////NAVIGATION
    goBack = () => { this.props.navigation.goBack() }

    ////////////////
    ////LIFECYCLES
    componentDidMount() {
        this.getSelectedLanguage()
    }

    getSelectedLanguage = async () => {
        this.props.BusyStore.increase()
        const rsp = await userLocalService.getLanguagePref();
        if (rsp) {
            this.setState({
                selectedLanguage: rsp
            })
        } else {
            this.setState({
                selectedLanguage: I18n.locale
            })

        }
        this.props.BusyStore.decrease()
    }

    ////////////////
    ////MODAL
    showSelectListModal = () => { this.setState({ selectListModalVisible: true }) }
    hideSelectListModal = () => { this.setState({ selectListModalVisible: false }) }
    onSelected = (item) => {
        userLocalService.storeLanguagePref(item.value);
        this.setState({ selectedLanguage: item.value, selectListModalVisible: false })
        I18n.locale = item.value;
        showToast(item.value + I18n.t("languageChanges"))
    }


    render() {
        // const ProfileItems = [
        //     { text: "Language", icon: FlagIcon, action: this.showSelectListModal },
        // ]
        return (
            <SafeArea>
                <ScreenHeader goBack={this.goBack} title={I18n.t("settings")} />

                <Wrapper>
                    <TouchableItem style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                    >
                        <TouchableInner onPress={this.showSelectListModal}>
                            <ItemIcon name={FlagIcon} />
                            <ItemText>{I18n.t("language")}</ItemText>
                            <SelectedItemText>
                                {this.state.selectedLanguage}
                            </SelectedItemText>
                        </TouchableInner>

                    </TouchableItem>
                    {/* {
                        ProfileItems.map((item, index) => {
                            return (
                               
                            )
                        })
                    } */}
                </Wrapper>

                <SelectListModal
                    selectListModalVisible={this.state.selectListModalVisible}
                    hideSelectListModal={this.hideSelectListModal}
                    selectItems={Languages}
                    onSelected={this.onSelected}

                />


                <this.RenderErrorModal />


            </SafeArea>
        );
    }
}

export default SettingScreen;
