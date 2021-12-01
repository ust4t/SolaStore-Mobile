import { makeObservable, observable, computed, action } from "mobx"


class UserStore {
    isLogined=false

    login=()=>{
        this.isLogined=true;
    }
    logout=()=>{
        this.isLogined=false;
    }


    constructor(){
        makeObservable(this, {
            isLogined:observable,
            login:action,
            logout:action
        })
    }
}
export default new UserStore()