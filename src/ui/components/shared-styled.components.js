
import { SafeAreaView, ScrollView,  View ,Text,TextInput} from "react-native"
import styled from "styled-components"

//padding:${(props)=>props.theme.space[3]};
const SafeArea=styled(SafeAreaView)`
    flex:1;
    backgroundColor:${props=>props.theme.color.background};
`;

const ScrollablePage=styled(ScrollView)`
    flex:1;
`

const InputWrapper=styled(View)`
    backgroundColor:${props=>props.theme.color.lightGray};
    borderRadius:${props=>props.theme.radius[4]};
    width:100%;
    flexDirection:row;
    alignItems:center;
    justifyContent:center;
    paddingLeft:${props=>props.theme.space[2]};
    paddingRight:${props=>props.theme.space[2]};
    
`
const Input=styled(TextInput)`
    flex:1;
    padding:${props=>props.theme.space[2]};
`

const SeperatorFromTopOrBottom=styled(View)`
    height:${props=>props.theme.space[2]};
`
const SeperatorFromRightOrLeft=styled(View)`
    width:${props=>props.theme.space[2]};
`
const ErrorText=styled(Text)`
    color:${props=>props.theme.color.error};
    textAlign:center;
`
    

const Line = styled(View)`
    width:100%;
    borderWidth:1px;
    borderColor:${props => props.theme.color.lightGray};
`
export {
    SafeArea,
    ScrollablePage,
    InputWrapper,
    Input,
    SeperatorFromTopOrBottom,
    ErrorText,
    SeperatorFromRightOrLeft,
    Line
}