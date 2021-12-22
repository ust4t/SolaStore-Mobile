import userStore from "../../infrastructure/stores/user.store";
import DeviceInfo from 'react-native-device-info';
const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class OrderService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Order";
    }
    GetSalesReps = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`User/GetSalesReps`, null,
            [
            ]);
        return this.handleResponse(rsp)
    }

    getMyOrders = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/OrderList`, null,
            [
                { name: "UserID", val: userStore.userID }
            ]);
        return this.handleResponse(rsp)
    }

    getOrderDetail = async (orderId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/OrderLinesList`, null,
            [
                { name: "OrderID", val: orderId }
            ]);
        return this.handleResponse(rsp)
    }

    createOrder = async (BuyerName, BuyerPhone, SalesRepresantID, PaymentType) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/AddOrderVisitor`,
            [

            ], null,
            {
                BuyerName,
                BuyerPhone,
                SalesRepresantID: SalesRepresantID.toString(),
                PaymentType,
                visitorGuidID: this.handleUserId()
            });
        return this.handleResponse(rsp)
    }

    generateHash = async (oid,amount,okUrl,failUrl,islemtipi,taksit,rnd) => {
        let rsp = await remoteDataAccessObject.GetRequest(`Helpers/GenerateHash`, null,
            [
                { name: "oid", val: oid },
                { name: "amount", val: amount },
                { name: "okUrl", val: okUrl },
                { name: "failUrl", val: failUrl },
                { name: "islemtipi", val: islemtipi },
                { name: "taksit", val: taksit },
                { name: "rnd", val: rnd },
          
                
            ]);
        return this.handleResponse(rsp)
    }
    handleUserId = () => {
        return userStore.userID != null ? userStore.userID.toString() : DeviceInfo.getUniqueId()
    }




}

export default new OrderService()