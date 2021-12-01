const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class ProductService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Product";
    }
    GetAllByCategoryID = async () => {
        console.log("product.service line 10")
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetAllByCategoryID`, null);
        return this.handleResponse(rsp)
    }
}

export default new ProductService()