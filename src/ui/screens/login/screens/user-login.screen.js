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
const EyeIcon = styled(Icon).attrs({
    color: "gray",
    size: 20,
    name: eyeOffIcon
})`
`



@inject("UserStore", "BusyStore")
@observer
class UserLogin extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        };
    }

    ///////////////////////////
    ////NVAIGATIONS
    goToRegister = () => { this.props.navigation.navigate("RegisterScreen") }

    handleLoginFormAsync = async (values) => {
        console.log("user-login.screen line 78")
        console.log(values)
        let dtoResponse = await this.doRequestAsync(() => userService.isMember(values.mail, values.password))
        console.log(dtoResponse)
        if (dtoResponse) {
            if (dtoResponse.userID == 0) {
                this.showErrorModal("Kullanıcı Bulunamadı");
            } else this.props.UserStore.login()

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
                                    SIGN UP
                                </SignUpText>
                            </Touchable>

                        </SignUpWrapper>
                        <SignInText>Sign in</SignInText>
                        <HeaderMessage>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</HeaderMessage>
                    </Header>

                    <Formik
                        onSubmit={this.handleLoginFormAsync}
                        initialValues={{
                            mail: "muammersalkim@hotmail.com",
                            password: "anestunara1"
                        }}
                        validationSchema={
                            Yup.object().shape({
                                mail: Yup.string().required("Telefon numarası girin!"),
                                password: Yup.string().required("Şifre gerekli!").min(8, "En az 8 karakter").max(30, "En fazla 30 karakter")
                            })
                        }

                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                            <Form>
                                <InputWrapper>
                                    <Input
                                        placeholder="Name..."
                                        value={values.mail}
                                        onChangeText={handleChange("mail")}
                                        onBlur={() => { setFieldTouched("mail") }} />
                                </InputWrapper>
                                {errors.mail && touched.mail &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.mail}</ErrorText>}
                                <SeperatorFromTopOrBottom />
                                <InputWrapper>
                                    <Input
                                        placeholder="Password..."
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={() => { setFieldTouched("password") }}
                                        secureTextEntry={true} />
                                    <IconTouchable>
                                        <EyeIcon />
                                    </IconTouchable>
                                </InputWrapper>
                                {errors.password && touched.password &&
                                    <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.password}</ErrorText>}
                                <SeperatorFromTopOrBottom />
                                <ErrorTextWrapper>
                                    <ErrorText>
                                        Forgot password ?
                                </ErrorText>
                                </ErrorTextWrapper>

                                <SeperatorFromTopOrBottom />

                                <PrimaryButton text="SIGN IN" action={handleSubmit} />
                            </Form>
                        )}
                    </Formik>

                    {/* <PrimaryButton text="SIGN IN" action={this.handleLoginFormAsync} /> */}

                </ScrollablePage>



                <Tabbar navigation={this.props.navigation} navigatorName={"userNavigator"} />

                <this.RenderErrorModal />
            </SafeArea>
        );
    }
}

export default UserLogin;
