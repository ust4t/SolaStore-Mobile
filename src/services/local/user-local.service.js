import AsyncStorage from '@react-native-async-storage/async-storage';

class UserLocalService {

    storeUserData = async (userInfo) => {
        try {
            const stringJson = JSON.stringify(userInfo);
            await AsyncStorage.setItem("userInfo", stringJson)
        } catch (error) {
            console.log(error)
        }
    }
    getUSerData = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            return userInfo != null ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.log(error)
        }
    }

    storeLanguagePref = async (lang) => {
        try {
            await AsyncStorage.setItem("lang", lang)
        } catch (error) {
            console.log(error)
        }
    }

    getLanguagePref = async () => {
        try {
            const lang = await AsyncStorage.getItem("lang");
            return lang;
        } catch (error) {
            console.log(error)
        }
    }


}
export default new UserLocalService();