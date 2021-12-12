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

    GetAllByCategoryID = async (categoryId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetAllByCategoryID`, null, [
            { name: "id", val: categoryId }
        ]);
        return this.handleResponse(rsp)
    }

    GetProductById = async (productId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetByProductID`, null, [
            { name: "id", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    GetVariationsByProductID = async (productId) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/GetVariationsByProductID`, null, [
            { name: "ProductID", val: productId }
        ]);
        return this.handleResponse(rsp)
    }

    searchProducts = async (text) => {
        let rsp = await remoteDataAccessObject.GetRequest(`Helpers/AdvancedSearchTextSearch`, null, [
            { name: "text", val: text }
        ]);
        return this.handleResponse(rsp)
    }

    advancedSearchProducts = async (categories, brands, minPrice, maxPrice) => {
        let rsp = await remoteDataAccessObject.GetRequest(`Helpers/AdvancedSearchProductList`, null, [
            { name: "CatIDList", val: categories },
            { name: "BrandIDList", val: brands },
            { name: "MinPrice", val: minPrice },
            { name: "MaxPrice", val: maxPrice }
        ]);
        return this.handleResponse(rsp)
    }


}

export default new ProductService()