import userStore from "../../infrastructure/stores/user.store";
import DeviceInfo from 'react-native-device-info';
import BaseService from "../base.service";
import remoteDataAccessObject from "../../dataaccess/remote-data-access-object";


class AdvertisingService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Advertising";
    }

    Slider = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/Slider`, null, [

        ]);
        return this.handleResponse(rsp)
    }

    getCampaigns = async () => {
        let rsp = await remoteDataAccessObject.GetRequestBylangIntValues(`${this.controllerName}/CampaignPictruresByLang`, null, [

        ]);
        return this.handleResponse(rsp)
    }

}

export default new AdvertisingService()