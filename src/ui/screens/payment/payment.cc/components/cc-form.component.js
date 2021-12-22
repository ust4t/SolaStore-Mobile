import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { ErrorText, Input, SafeArea, ScrollablePage, SeperatorFromRightOrLeft, SeperatorFromTopOrBottom } from '../../../../components/shared-styled.components';
import { Formik } from 'formik';
import * as Yup from 'yup'
import I18n from 'i18n-js';
import PrimaryButton from '../../../../components/primary-button.component';
import TextInputMask from 'react-native-text-input-mask';

const Wrapper = styled(View)`
    flex:1;
    alignItems:center;
    justifyContent:center;

    
`
const Form = styled(View)`
    padding:${props => props.theme.space[3]};
`
const InputContainer = styled(View)`
    width:100%;
    flexDirection:row;
`
const InputWrapper = styled(View)`
    backgroundColor:${props => props.theme.color.lightGray};
    borderRadius:${props => props.theme.radius[4]};
    width:100%;
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    padding:${props => props.theme.space[2]};
    paddingLeft:${props => props.theme.space[3]};
    paddingRight:${props => props.theme.space[3]};
    
`
const InputWrapperInline = styled(View)`
    backgroundColor:${props => props.theme.color.lightGray};
    borderRadius:${props => props.theme.radius[4]};
    flex:1;
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    padding:${props => props.theme.space[2]};
    
`
const InputInline = styled(TextInput).attrs(props => ({
    underlineColor: "rgba(0,0,0,0)",
    activeUnderlineColor: "rgba(0,0,0,0)"
}))`
    flex:1;
    backgroundColor:rgba(0,0,0,0);
`
const CcForm = ({
    handleSubmit
}) => (
    <ScrollablePage >
        <Wrapper>
            <Formik
            
                onSubmit={handleSubmit}
                initialValues={{
                    name: "Ahmet Mehmet",
                    no: "4546-7112-3456-7894",
                    cvv: "123",
                    year: "12/26",
                  

                }}
                validationSchema={
                    Yup.object().shape({
                        name: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                        no: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                        cvv: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                        year: Yup.string().required(I18n.t("$UyarilarBuAlanBosBirakilamaz")),
                      

                    })
                }

            >
                {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid }) => (
                    <Form>

                        <InputWrapper>
                            <InputInline
                                placeholder={"Kart sahibi adı soyadı"}
                                value={values.name}
                                onChangeText={handleChange("name")}
                                onBlur={() => { setFieldTouched("name") }} />
                        </InputWrapper>
                        {errors.name && touched.name &&
                            <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.name}</ErrorText>}
                        <SeperatorFromTopOrBottom />

                        <InputWrapper>
                            <InputInline
                                placeholder={"Kart Numarası"}
                                value={values.no}
                                onChangeText={handleChange("no")}
                                onBlur={() => { setFieldTouched("no") }}


                                render={props =>
                                    <TextInputMask {...props} mask="[0000]-[0000]-[0000]-[0000]" />
                                }
                                keyboardType="numeric"
                            />
                        </InputWrapper>
                        {errors.no && touched.no &&
                            <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.no}</ErrorText>}
                        <SeperatorFromTopOrBottom />

                        <InputContainer>
                            <InputWrapperInline>
                                <InputInline
                                    placeholder={"Cvv"}
                                    value={values.cvv}
                                    onChangeText={handleChange("cvv")}
                                    onBlur={() => { setFieldTouched("cvv") }}
                                    render={props =>
                                        <TextInputMask {...props} mask="[000]" />
                                    }
                                    keyboardType="numeric" />

                            </InputWrapperInline>

                            <SeperatorFromRightOrLeft />



                            <InputWrapperInline>
                                <InputInline
                                    placeholder={"Expire Date"}
                                    value={values.year}
                                    onChangeText={handleChange("year")}
                                    onBlur={() => { setFieldTouched("year") }}
                                    render={props =>
                                        <TextInputMask {...props} mask="[00]/[00]" />
                                    }
                                    keyboardType="numeric" />
                            </InputWrapperInline>

                        </InputContainer>
                        {errors.cvv && touched.cvv &&
                            <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.cvv}</ErrorText>}
                        {errors.year && touched.year &&
                            <ErrorText style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'red' }}>{errors.year}</ErrorText>}









                        {/* <ErrorTextWrapper>
                                    <ErrorText>
                                        Forgot password ?
                                </ErrorText>
                                </ErrorTextWrapper>

                                <SeperatorFromTopOrBottom /> */}
                        <SeperatorFromTopOrBottom />
                        <PrimaryButton
                            text={I18n.t("$OdemeTamamla")}
                            action={handleSubmit}
                        />

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
        </Wrapper>

    </ScrollablePage>
);

export default React.memo(CcForm);
