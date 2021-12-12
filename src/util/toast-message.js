import { Platform, ToastAndroid, AlertIOS, Alert } from "react-native";

export function showToast(msg, title) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
        Alert.alert(title, msg, [

            {
                text: "Tamam",

                style: "cancel"
            },


        ])
    }
}