import userStore from "../../infrastructure/stores/user.store";
import DeviceInfo from 'react-native-device-info';
import BaseService from "../base.service";
import remoteDataAccessObject from "../../dataaccess/remote-data-access-object";


class LanguageService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Language";
    }

    GetAll = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetAll`, null, [
           
        ]);
        return this.handleResponse(rsp)
    }


    
}

export default new LanguageService()