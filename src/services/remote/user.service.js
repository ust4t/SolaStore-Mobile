const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class UserService extends BaseService {

    constructor() {
        super()
        this.controllerName = "User";
    }
    isMember = async (UserInfo,UserPassword) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/IsMember`, null,
        [
            {name:"UserInfo",val:UserInfo},
            {name:"UserPassword",val:UserPassword}
        ]);
        return this.handleResponse(rsp)
    }

    
}

export default new UserService()