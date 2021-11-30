
import { SafeAreaView, ScrollView } from "react-native"
import styled from "styled-components"

//padding:${(props)=>props.theme.space[3]};
const SafeArea=styled(SafeAreaView)`
    flex:1;
    backgroundColor:${props=>props.theme.color.background};
`;

const ScrollablePage=styled(ScrollView)`
    flex:1;
`

export {
    SafeArea,
    ScrollablePage
}