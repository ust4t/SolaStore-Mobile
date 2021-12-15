import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeNavigator from './home.navigator';
import UserNavigator from './user.navigator';
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationNavigator from './notification.navigator';
import { inject, observer } from 'mobx-react';
import LoadingModal from '../components/modals/loading.modal';
import BasketNavigator from './basket.navigator';
import SearchNavigator from './search.navigator';
import tr from '../../../assets/i18n/tr';
import ru from '../../../assets/i18n/ru';
import ar from '../../../assets/i18n/ar';
import fr from '../../../assets/i18n/fr';
import en from '../../../assets/i18n/en';


import languageService from '../../services/remote/language.service';
import { resultStatus } from '../../util/enums/result-status';
import I18n from 'i18n-js';
import userLocalService from '../../services/local/user-local.service';
import Splash from '../components/splash.component';
enableScreens(true);
const Tab = createBottomTabNavigator();
const hideBottomList = [];


@inject("BusyStore")
@observer
class MainNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languagesLoading:true
        };
    }

    componentDidMount(){
        this.getSelectedLanguage()
    }

    getSelectedLanguage = async () => {
        const rsp = await userLocalService.getLanguagePref();
        if (rsp) {
            I18n.locale = rsp;
        }
        this.getAll()
        
    }

    getAll=async (language)=>{
        let rsp=await languageService.GetAll()
       
        if(rsp.resultStatus==resultStatus.success){
           
            rsp=rsp.data;
           
            console.log("------------------")
            console.log(I18n.locale)

            if(I18n.locale=="tr-TR"){
                rsp.map((item,index)=>{
                    tr[item.defaultValue.replace(".","")]=item.selectedValue
                })
            }else if(I18n.locale=="en-EN"){
                rsp.map((item,index)=>{
                    en[item.defaultValue.replace(".","")]=item.selectedValue
                })
            }else if(I18n.locale=="ru-RU"){
                rsp.map((item,index)=>{
                    ru[item.defaultValue.replace(".","")]=item.selectedValue
                })
            }else if(I18n.locale=="ar-AR"){
                rsp.map((item,index)=>{
                    ar[item.defaultValue.replace(".","")]=item.selectedValue
                })
            }else if(I18n.locale=="fr-FR"){
                rsp.map((item,index)=>{
                    fr[item.defaultValue.replace(".","")]=item.selectedValue
                })
            }

        }
        this.setState({
            languagesLoading:false
        })
    }

    render() {
        if(this.state.languagesLoading){
            return <Splash />
        }
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName = "md-home";

                            if (route.name === 'homeNavigator') {
                                iconName = "md-home"
                            } else if (route.name === 'userNavigator') {
                                iconName = "md-person"
                            }
                            // else if (route.name === 'InfoContainer') {
                            //     iconName = "md-information-circle-outline"
                            // }
                            // else if (route.name === 'TransactionContainer') {
                            //     iconName = transactionIcon
                            // }

                            // if (focused) {
                            //     return <Icon name={iconName} size={size + 5} color={color} />;
                            // }
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        headerShown: false,
                        tabBarStyle: {
                            borderTopColor: 'rgba(0, 0, 0, .2)',
                            height: 0
                        },
                        // tabBarInactiveTintColor: 'red',
                        // tabBarActiveTintColor: colors.bg.primary,
                        tabBarShowLabel: false
                    })}>
                    <Tab.Screen name="homeNavigator" component={HomeNavigator} />
                    <Tab.Screen name="userNavigator" component={UserNavigator} />
                    <Tab.Screen name="searchNavigator" component={SearchNavigator} />
                    <Tab.Screen name="basketNavigator" component={BasketNavigator} 
                    options={({route})=>(
                        {
                            unmountOnBlur:true
                        }
                    )} />
                </Tab.Navigator>
                {
                    this.props.BusyStore.requestCount > 0 &&
                   <LoadingModal />
                }
            
            </NavigationContainer>
        );
    }
}

export default MainNavigator;
