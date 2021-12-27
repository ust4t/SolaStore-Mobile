import userStore from "../../infrastructure/stores/user.store";
import DeviceInfo from 'react-native-device-info';
import BaseService from "../base.service";
import remoteDataAccessObject from "../../dataaccess/remote-data-access-object";


class FavoriteService extends BaseService {

    constructor() {
        super()
        this.controllerName = "User";
    }

    GetUserFavoritesList = async (userId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetUserFavoritesList`, null, [
            { name: "UserID", val: userId ? userId : this.handleUserId() }
        ]);
        return this.handleResponse(rsp)
    }

    AddFavoriteProduct = async (productId) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/AddFavoriteProduct`, [
            { name: "UserID", val: this.handleUserId() },
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    DeleteFavoriteProduct = async (productId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/DeleteFavoriteProduct`, null, [
            { name: "UserID", val: this.handleUserId() },
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    handleUserId = () => {
        return userStore.userID != null ? userStore.userID : DeviceInfo.getUniqueId()
    }
}

export default new FavoriteService()