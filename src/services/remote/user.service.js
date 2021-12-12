const { default: remoteDataAccessObject } = require("../../dataaccess/remote-data-access-object");
const { default: BaseService } = require("../base.service");



class UserService extends BaseService {

    constructor() {
        super()
        this.controllerName = "User";
    }
    isMember = async (UserInfo, UserPassword) => {
        let rsp = await remoteDataAccessObject.GetRequest(`${this.controllerName}/IsMember`, null,
            [
                { name: "UserInfo", val: UserInfo },
                { name: "UserPassword", val: UserPassword }
            ]);
        return this.handleResponse(rsp)
    }

    addMember = async (Name, Surname, Phone, UserEmail, UserPassword) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/AddMember`,
            [
                { name: "Name", val: Name },
                { name: "Surname", val: Surname },
                { name: "Phone", val: Phone },
                { name: "UserEmail", val: UserEmail },
                { name: "UserPassword", val: UserPassword },

            ]);
        return this.handleResponse(rsp)
    }

    updateUserNameAndSurname = async (name, surname, email, password) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/UpdateMemberName`, 
            [
                { name: "Name", val: name },
                { name: "Surname", val: surname },
                { name: "UserEmail", val: email },
                { name: "UserPassword", val: password }
            ]);
        return this.handleResponse(rsp)
    }

    updateUserPhone = async (phone, email, password) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/UpdateMemberPhone`,
            [
                { name: "Phone", val: phone },
                { name: "UserEmail", val: email },
                { name: "UserPassword", val: password }
            ]);
        return this.handleResponse(rsp)
    }

    updatePassword = async (newPassword, email, password) => {
        let rsp = await remoteDataAccessObject.PostRequest(`${this.controllerName}/UpdateMemberPassword`, 
            [
                { name: "NewPassword", val: newPassword },
                { name: "UserEmail", val: email },
                { name: "UserPassword", val: password }
            ]);
        return this.handleResponse(rsp)
    }


}

export default new UserService()