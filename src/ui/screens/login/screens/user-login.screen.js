import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { ErrorText, Input, InputWrapper, SafeArea, ScrollablePage, SeperatorFromTopOrBottom } from '../../../components/shared-styled.components';
import Tabbar from '../../../components/tabbar.component';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { inject, observer } from 'mobx-react';
import PrimaryButton from '../../../components/primary-button.component';
import Icon from 'react-native-vector-icons/Ionicons'
import { eyeIcon, eyeOffIcon } from '../../../../util/icons';
import BaseScreen from '../../../shared/base.screen';
import userService from '../../../../services/remote/user.service';
import I18n from 'i18n-js';
const Header = styled(View)`
    backgroundColor:${props => props.theme.color.secondary};
    borderBottomEndRadius:${props => props.theme.radius[3]};
    borderBottomLeftRadius:${props => props.theme.radius[3]};
    padding:${props => props.theme.space[3]};
`
const SignInText = styled(Text)`
marginTop:${props => props.theme.space[4]};
    color:${props => props.theme.color.white};
    fontSize:${props => props.theme.text.h2};
`
const SignUpWrapper = styled(View)`
    width:100%;
    alignItems:flex-end;
`
const SignUpText = styled(Text)`

color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.subtitle};
`
const HeaderMessage = styled(Text)`
color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.extraSmall};
opacity:0.7;
marginTop:${props => props.theme.space[2]};

`

const Form = styled(View)`
    padding:${props => props.theme.space[3]};
`
const Touchable = styled(TouchableOpacity)`
`
const IconTouchable = styled(TouchableOpacity)`
    paddingRight:${props => props.theme.space[1]};
`
const ErrorTextWrapper = styled(View)`
    width:100%;
    alignItems:flex-end;
`
const EyeOffIcon = styled(Icon).attrs({
    color: "gray",
    size: 20,
    name: eyeOffIcon
})`
`

const EyeIcon = styled(Icon).attrs({
    color: "gray",
    size: 20,
    name: eyeIcon
})`
`
const NavigationTouch = styled(TouchableOpacity)`
    alignItems:center;
    padding:${props => props.theme.space[1]};
`
const NavigationText = styled(Text)`
    opacity:0.8;
    textDecorationLine:underline;
`


@inject("UserStore", "BusyStore")
@observer
class UserLogin extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,

            passwordIsVisible: false
        };
    }

    ///////////////////////////
    ////NVAIGATIONS
    goToRegister = () => { this.props.navigation.navigate("RegisterScreen") }
    goToSettings = () => { this.props.navigation.navigate("SettingScreen") }
    goToContact = () => { this.props.navigation.navigate("ContactScreen") }

    changePasswordVisibility = () => { this.setState({ passwordIsVisible: !this.state.passwordIsVisible }) }

    handleLoginFormAsync = async (values) => {
        let dtoResponse = await this.doRequestAsync(() => userService.isMember(values.mail, values.password))
        if (dtoResponse) {
            if (dtoResponse == "notFound") {
                this.showErrorModal(I18n.t("$HesabimKullaniciBulunamadi"));
            } else this.props.UserStore.login(dtoResponse)
        }
    }

    render() {
        return (
            <SafeArea>
                <ScrollablePage>
                    <Header >
                        <SignUpWrapper>
                            <Touchable onPress={this.goToRegister}>
                                <SignUpText>
                                    {I18n.t("$HesabimKayitOl")}
                                </SignUpText>
                            </Touchable>

                        </SignUpWrapper>
                        <SignInText>{I18n.t("$HesabimGirisYap")}</SignInText>
                        <HeaderMessage>
                            {I18n.t("$AnaSayfaHoşgeldiniz")}
                        </HeaderMessage>
                    </Header>

                    <Formik
                        onSubmit={this.handleLoginFormAsync}
                        initialValues={{
                            mail: "muammersalkim@hotmail.com",
                            password: "123321"
                        }}
                        validationSchema={
                            Yup.object().shape({
                                mail: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                password: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz"))
                            })
                        }

                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                            <Form>
                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimEmailOrPhone")}
                                        value={values.mail}
                                        onChangeText={handleChange("mail")}
                                        onBlur={() => { setFieldTouched("mail") }} />
                                </InputWrapper>
                                {errors.mail && touched.mail &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.mail}</ErrorText>}
                                <SeperatorFromTopOrBottom />
                                <InputWrapper>

                                    <Input
                                        placeholder={I18n.t("$HesabimSifre")}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={() => { setFieldTouched("password") }}
                                        secureTextEntry={!this.state.passwordIsVisible} />
                                    <IconTouchable onPress={this.changePasswordVisibility}>
                                        {
                                            this.state.passwordIsVisible ?

                                                <EyeIcon />
                                                :

                                                <EyeOffIcon />
                                        }

                                    </IconTouchable>
                                </InputWrapper>
                                {errors.password && touched.password &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.password}</ErrorText>}
                                <SeperatorFromTopOrBottom />
                                {/* <ErrorTextWrapper>
                                    <ErrorText>
                                        Forgot password ?
                                </ErrorText>
                                </ErrorTextWrapper>

                                <SeperatorFromTopOrBottom /> */}

                                <PrimaryButton text={I18n.t("$HesabimGirisYap")} action={handleSubmit} />

                                {/* <SeperatorFromTopOrBottom />
                                <NavigationTouch onPress={this.goToSettings}>
                                    <NavigationText>Choose  your  language</NavigationText>
                                </NavigationTouch>
                                <NavigationTouch onPress={this.goToContact}>
                                    <NavigationText>Contact  Us</NavigationText>
                                </NavigationTouch> */}
                            </Form>
                        )}
                    </Formik>

                    {/* <PrimaryButton text="SIGN IN" action={this.handleLoginFormAsync} /> */}

                </ScrollablePage>





                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default UserLogin;
