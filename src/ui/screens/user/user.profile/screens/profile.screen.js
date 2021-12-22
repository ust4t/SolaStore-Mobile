import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import ScreenHeader from '../../../../components/screen-header.component';
import { ErrorText, Input, InputWrapper, SafeArea, ScrollablePage, SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';
import BaseScreen from '../../../../shared/base.screen';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { inject, observer } from 'mobx-react';
import PrimaryButton from '../../../../components/primary-button.component';
import userService from '../../../../../services/remote/user.service';
import { showToast } from '../../../../../util/toast-message';
import I18n from 'i18n-js';

const Form = styled(View)`
    padding:${props => props.theme.space[3]};
`

@inject("UserStore", "BusyStore")
@observer
class ProfileScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        };
    }

    //////////////////////
    ////NAVIGATIONS
    goBack = () => { this.props.navigation.goBack() }

    handleSubmit = async (values) => {
        this.props.BusyStore.increase()
        if (values.name != this.props.UserStore.userName || values.surname != this.props.UserStore.userSurname) {
            let resp = await this.doRequestAsync(() => userService.updateUserNameAndSurname(
                values.name,
                values.surname,
                values.email,
                values.password
            ))

            if (resp == "notFound") {
                this.showErrorModal(I18n.t("missingInfo"))
                // this.goBack()
                this.props.BusyStore.decrease()
                return;
            } else {
                showToast(I18n.t("infoUpdated"));
                this.props.UserStore.updateNameAndSurname(values.name, values.surname)

            }
        }
        if (values.phone != this.props.UserStore.phone) {
            let rsp = await this.doRequestAsync(() => userService.updateUserPhone(
                values.phone,
                values.email,
                values.password
            ))
            if (rsp === "notFound") {
            } else {
                showToast(I18n.t("infoUpdated"));
                this.props.UserStore.updatePhone(values.phone)

            }
        }

        this.props.BusyStore.decrease()

    }





    render() {
        return (
            <SafeArea>
                <ScreenHeader title={I18n.t("$AnaSayfaProfilim")} goBack={this.goBack} />

                <ScrollablePage>

                    <Formik
                        onSubmit={this.handleSubmit}
                        initialValues={{
                            name: this.props.UserStore.userName,
                            surname: this.props.UserStore.userSurname,
                            email: this.props.UserStore.userEmail,
                            phone: this.props.UserStore.userPhone,
                            password: ""
                        }}
                        validationSchema={
                            Yup.object().shape({
                                name: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                surname: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                phone: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                email: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                                password: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                            })
                        }

                    >
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
                                        onBlur={() => { setFieldTouched("surname") }}
                                    />
                                </InputWrapper>
                                {errors.surname && touched.surname &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.surname}</ErrorText>}
                                <SeperatorFromTopOrBottom />

                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimTelefon")}
                                        value={values.phone}
                                        onChangeText={handleChange("phone")}
                                        onBlur={() => { setFieldTouched("phone") }}
                                    />
                                </InputWrapper>
                                {errors.phone && touched.phone &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.phone}</ErrorText>}
                                <SeperatorFromTopOrBottom />


                                <InputWrapper>
                                    <Input
                                        placeholder={I18n.t("$HesabimEpostaAdresi")}
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => { setFieldTouched("email") }}
                                    />
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



                                <PrimaryButton text={I18n.t("$HesabimGuncelle")} action={handleSubmit} />
                            </Form>
                        )}
                    </Formik>
                </ScrollablePage>

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default ProfileScreen;
