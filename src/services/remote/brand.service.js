import userStore from "../../infrastructure/stores/user.store";

const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class BrandService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Brand";
    }

    GetAllBrands = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetAllBrands`, null, [
            // { name: "UserID", val: userStore.userID }
        ]);
        return this.handleResponse(rsp)
    }

}

export default new BrandService()