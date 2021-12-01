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



@inject("UserStore")
@observer
class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    ///////////////////////////
    ////NVAIGATIONS
    goToRegister=()=>{this.props.navigation.navigate("RegisterScreen")}

    handleLoginFormAsync = async () => {
        this.props.UserStore.login()
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
                        initialValues={{
                            name: "",
                            password: ""
                        }}
                        validationSchema={
                            Yup.object().shape({
                                name: Yup.string(),
                                password: Yup.string()
                            })
                        }
                        onSubmit={this.handleLoginFormAsync}>
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                            <Form>
                                <InputWrapper>
                                    <Input
                                        placeholder="Name..." />
                                </InputWrapper>
                                <SeperatorFromTopOrBottom />
                                <InputWrapper>
                                    <Input
                                        placeholder="Password..." />
                                    <IconTouchable>
                                        <EyeIcon />
                                    </IconTouchable>
                                </InputWrapper>
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



                </ScrollablePage>



                <Tabbar navigation={this.props.navigation} navigatorName={"userNavigator"} />
            </SafeArea>
        );
    }
}

export default UserLogin;
