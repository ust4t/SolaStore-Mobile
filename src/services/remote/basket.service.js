import userStore from "../../infrastructure/stores/user.store";
import DeviceInfo from 'react-native-device-info';
import BaseService from "../base.service";
import remoteDataAccessObject from "../../dataaccess/remote-data-access-object";





class ProductService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Order";
    }


    getBasketItems = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/ChartList`, null, [
            {
                name: "UserID",
                val: this.handleUserId()
            }
        ]);
        return this.handleResponse(rsp)
    }

    addToBasket = async (productId, quantity = 1) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/AddToChart`, [
            { name: "UserID", val: this.handleUserId() },
            { name: "Quantity", val: quantity },
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    removeFromBasket = async (productId) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/RemoveFromChart`, [
            { name: "UserID", val: this.handleUserId() },
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    IncreaseProductCountInChart = async (productId) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/IncreaseProductCountInChart`, [
            { name: "UserID", val: this.handleUserId() },
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }
    DecreaseProductCountInChart = async (productId) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/DecreaseProductCountInChart`, [
            { name: "UserID", val: this.handleUserId() },
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    handleUserId = () => {
        return userStore.userID != null ? userStore.userID : DeviceInfo.getUniqueId()
    }
}

export default new ProductService()