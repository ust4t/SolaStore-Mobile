import { makeObservable, observable, computed, action } from "mobx"
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.production.min";
import userLocalService from "../../services/local/user-local.service";


class UserStore {
    isLogined = false
    userID = null
    userName = null
    userSurname = null
    userEmail = null
    userPhone=null

    updateNameAndSurname=(userName,userSurname)=>{
        this.userName=userName;
        this.userSurname=userSurname;
    }
    updatePhone=(userPhone)=>{
        this.userPhone=userPhone;
    }
  

    login = (userData) => {
        console.log("user.store line 22")
        console.log(userData)
        userLocalService.storeUserData(userData)
        this.userID = userData.userID
        this.userName = userData.userName
        this.userSurname = userData.userSurname
        this.userEmail = userData.userEmail
        this.userPhone=userData.userPhone

    }
    logout = () => {
        this.userID = null
        this.userName = null
        this.userSurname = null
        this.userEmail = null
        this.userPhone=null
        userLocalService.storeUserData(null);
    }


    constructor() {
        makeObservable(this, {
            userID: observable,
            userName: observable,
            userSurname: observable,
            userEmail: observable,
            login: action,
            logout: action,
            updateNameAndSurname:action,
            updatePhone:action
        })
    }
}
export default new UserStore()