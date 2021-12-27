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
import { eyeOffIcon } from '../../../../util/icons';
import BaseScreen from '../../../shared/base.screen';
import userService from '../../../../services/remote/user.service';
import { showToast } from '../../../../util/toast-message';
import I18n from 'i18n-js';
const Header = styled(View)`
    backgroundColor:${props => props.theme.color.secondary};
    borderBottomEndRadius:${props => props.theme.radius[3]};
    borderBottomLeftRadius:${props => props.theme.radius[3]};
    padding:${props => props.theme.space[3]};
`
const SignInText = styled(Text)`
color:${props => props.theme.color.white};
fontSize:${props => props.theme.text.subtitle};
`
const SignUpWrapper = styled(View)`
    width:100%;
    alignItems:flex-end;
`
const SignUpText = styled(Text)`
marginTop:${props => props.theme.space[4]};
    color:${props => props.theme.color.white};
    fontSize:${props => props.theme.text.h2};

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
const EyeIcon = styled(Icon).attrs({
    color: "gray",
    size: 20,
    name: eyeOffIcon
})`
`



@inject("BusyStore")
@observer
class RegisterScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        };
    }

    ///////////////////////////
    ////NVAIGATIONS
    goToLogin = () => { this.props.navigation.goBack() }


    handleLoginFormAsync = async (values) => {
        // this.props.UserStore.login()
        let data = this.doRequestAsync(() => userService.addMember(
            values.name,
            values.surname,
            values.phone,
            values.email,
            values.password
        ))
        if (data) {
            showToast(I18n.t("$HesabimYeniKullaniciOlusturuldu"));
            this.props.BusyStore.decrease() //logine dönünce modal açık kalıyor
            this.goToLogin()

        }
    }

    render() {
        return (
            <SafeArea>
                <ScrollablePage>
                    <Header >
                        <SignUpWrapper>
                            <Touchable onPress={this.goToLogin}>
                                <SignInText>
                                    {I18n.t("$HesabimGirisYap")}
                                </SignInText>
                            </Touchable>

                        </SignUpWrapper>
                        <SignUpText>  {I18n.t("$HesabimKayitOl")}</SignUpText>
                        <HeaderMessage>
                            {I18n.t("$AnaSayfaHoşgeldiniz")}
                        </HeaderMessage>
                    </Header>

                    <Formik
                        initialValues={{
                            name: "",
                            surname: "",
                            phone: "",
                            email: "",
                            password: "",
                            passwordConfirm: ""
                        }}
                        validationSchema={
                            Yup.object().shape({
                                name: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                surname: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                phone: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                email: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                password: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                passwordConfirm: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz"))
                            })
                        }
                        onSubmit={this.handleLoginFormAsync}>
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                            <Form>

                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimAdi")}
                                        value={values.name}
                                        onChangeText={handleChange("name")}
                                        onBlur={() => { setFieldTouched("name") }} />
                                </InputWrapper>
                                {errors.name && touched.name &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.name}</ErrorText>}
                                <SeperatorFromTopOrBottom />

                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimSoyadi")}
                                        value={values.surname}
                                        onChangeText={handleChange("surname")}
                                        onBlur={() => { setFieldTouched("surname") }} />
                                </InputWrapper>
                                {errors.surname && touched.surname &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.surname}</ErrorText>}
                                <SeperatorFromTopOrBottom />


                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimTelefon")}
                                        value={values.phone}
                                        onChangeText={handleChange("phone")}
                                        onBlur={() => { setFieldTouched("phone") }} />
                                </InputWrapper>
                                {errors.phone && touched.phone &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.phone}</ErrorText>}
                                <SeperatorFromTopOrBottom />


                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimEpostaAdresi")}
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => { setFieldTouched("email") }} />
                                </InputWrapper>
                                {errors.email && touched.email &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.email}</ErrorText>}
                                <SeperatorFromTopOrBottom />


                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimSifre")}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={() => { setFieldTouched("password") }}
                                        secureTextEntry={true} />
                                </InputWrapper>
                                {errors.password && touched.password &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.password}</ErrorText>}
                                <SeperatorFromTopOrBottom />


                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimSifreTekrari")}
                                        value={values.passwordConfirm}
                                        onChangeText={handleChange("passwordConfirm")}
                                        onBlur={() => { setFieldTouched("passwordConfirm") }}
                                        secureTextEntry={true} />
                                </InputWrapper>
                                {errors.passwordConfirm && touched.passwordConfirm &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.passwordConfirm}</ErrorText>}
                                <SeperatorFromTopOrBottom />








                                <PrimaryButton text={I18n.t("$HesabimKayitOl")} action={handleSubmit} />
                            </Form>
                        )}
                    </Formik>



                </ScrollablePage>


                <this.RenderErrorModal />




            </SafeArea>
        );
    }
}

export default RegisterScreen;
