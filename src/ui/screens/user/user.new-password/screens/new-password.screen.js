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
            console.log("new-password-screen line 38")
            console.log(rsp)
            if (rsp === "notFound") {
                this.showErrorModal(I18n.t("missingInfo"))
            } else {
                showToast(I18n.t("passwordChanged"));
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
                this.showErrorModal(I18n.t("infoControl"));
            } else this.props.UserStore.login(dtoResponse)
        }
    }

    render() {
        return (
            <SafeArea>
                <ScreenHeader goBack={this.goBack} title={I18n.t("psChange")} />
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
                                email: Yup.string().required(I18n.t("required")),
                                password: Yup.string().required(I18n.t("required")),
                                passwordNew: Yup.string().required(I18n.t("required")),
                            })
                        }

                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                            <Form>

                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("email")}
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => { setFieldTouched("email") }} />
                                </InputWrapper>
                                {errors.email && touched.email &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.email}</ErrorText>}
                                <SeperatorFromTopOrBottom />

                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("password")}
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
                                        placeholder={I18n.t("newPassword")}
                                        value={values.passwordNew}
                                        onChangeText={handleChange("passwordNew")}
                                        onBlur={() => { setFieldTouched("passwordNew") }}
                                        secureTextEntry={true}
                                    />
                                </InputWrapper>
                                {errors.passwordNew && touched.passwordNew &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.passwordNew}</ErrorText>}
                                <SeperatorFromTopOrBottom />






                                <PrimaryButton text={I18n.t("update")} action={handleSubmit} />
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
