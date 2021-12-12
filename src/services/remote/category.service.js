const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class CategoryService extends BaseService {

    constructor() {
        super()
        this.controllerName = "Category";
    }
    getAllCategories = async () => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetAll`, null);
        return this.handleResponse(rsp)
    }
    GetSubCategoryList = async (categoryId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetSubCategoryList`, null, [
            { name: "id", val: categoryId }
        ]);
        return this.handleResponse(rsp)
    }
}

export default new CategoryService()