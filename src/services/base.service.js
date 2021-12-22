import DtoResponse from "../util/dto-response";
import { resultStatus } from "../util/enums/result-status";





class BaseService {
    constructor() {

    }
    handleResponse = async (rsp) => {
  
        if (rsp.status == 200) {

            try {
                rsp = await rsp.json();
            } catch (error) {
                return new DtoResponse(resultStatus.success, rsp)
            }

            // if(rsp.statusCode==0){

            //     return new DtoResponse(resultStatus.success,rsp)
            // }
            return new DtoResponse(resultStatus.success, rsp)

            // return new DtoResponse(resultStatus.error,null,rsp.stateMessage)

        } else if (rsp.status == 401) {
            return new DtoResponse(resultStatus.error, null, "Authentication Error!")
        } else if (rsp.status == 204) {
            return new DtoResponse(resultStatus.noContent, null, "No Content")
        }
        else if (rsp.status == 404) {
            return new DtoResponse(resultStatus.notFound, null, "notFound")
        }

        return new DtoResponse(resultStatus.error, null, "Servise erişelemiyor!");
    }


}

export default BaseService