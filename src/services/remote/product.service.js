const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class ProductService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Product";
    }
    GetAllByCategoryID = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetAllByCategoryID`, null);
        return this.handleResponse(rsp)
    }

    GetSaleProducts = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetSaleProducts`, null);
        return this.handleResponse(rsp)
    }

    GetBestSellerProducts = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetBestSellerProducts`, null);
        return this.handleResponse(rsp)
    }
}

export default new ProductService()