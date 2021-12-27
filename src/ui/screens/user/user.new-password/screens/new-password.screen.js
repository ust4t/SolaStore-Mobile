import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenHeader from '../../../../components/screen-header.component';
import { ErrorText, Input, InputWrapper, SafeArea, ScrollablePage, SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import styled from 'styled-components';

import { Formik } from 'formik';
import * as Yup from 'yup'
import { inject, observer } from 'mobx-react';
import I18n from 'i18n-js';
import PrimaryButton from '../../../../components/primary-button.component';
import userService from '../../../../../services/remote/user.service';
import { showToast } from '../../../../../util/toast-message';

const Form = styled(View)`
    padding:${props => props.theme.space[3]};
`

@inject("UserStore", "BusyStore")
@observer
class NewPasswordScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        };
    }

    ///////////////////
    ///NAVIGATION
    goBack = () => { this.props.navigation.goBack() }


    handleSubmit = async (values) => {
        let rsp = await this.doRequestAsync(() => userService.updatePassword(values.passwordNew, values.email, values.password))
        if (rsp) {

            if (rsp === "notFound") {
                this.showErrorModal(I18n.t("$UyarilarEpostaVeyaSifreHatali"))
            } else {
                showToast(I18n.t("$HesabimSifreDegistirildi"));
                await this.handleLoginFormAsync({
                    mail: values.email,
                    values: values.passwordNew
                })
                this.goBack()
            }

        }
    }
    handleLoginFormAsync = async (values) => {
        let dtoResponse = await this.doRequestAsync(() => userService.isMember(values.mail, values.password))
        if (dtoResponse) {
            if (dtoResponse == "notFound") {
                this.showErrorModal(I18n.t("$UyarilarEpostaVeyaSifreHatali"));
            } else this.props.UserStore.login(dtoResponse)
        }
    }

    render() {
        return (
            <SafeArea>
                <ScreenHeader goBack={this.goBack} title={I18n.t("$HesabimSifreDegisikligi")} />
                <ScrollablePage>
                    <Formik
                        onSubmit={this.handleSubmit}
                        initialValues={{
                            email: this.props.UserStore.userEmail,
                            password: "",
                            passwordNew: ""
                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                password: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                passwordNew: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                            })
                        }

                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                            <Form>

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
                                        secureTextEntry={true}
                                    />
                                </InputWrapper>
                                {errors.password && touched.password &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.password}</ErrorText>}
                                <SeperatorFromTopOrBottom />


                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimYeniSifre")}
                                        value={values.passwordNew}
                                        onChangeText={handleChange("passwordNew")}
                                        onBlur={() => { setFieldTouched("passwordNew") }}
                                        secureTextEntry={true}
                                    />
                                </InputWrapper>
                                {errors.passwordNew && touched.passwordNew &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.passwordNew}</ErrorText>}
                                <SeperatorFromTopOrBottom />






                                <PrimaryButton text={I18n.t("$Hesabim.Guncelle")} action={handleSubmit} />
                            </Form>
                        )}
                    </Formik>
                </ScrollablePage>

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default NewPasswordScreen;
