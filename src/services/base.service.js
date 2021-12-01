import DtoResponse from "../util/dto-response";
import { resultStatus } from "../util/enums/result-status";





class BaseService{
    constructor(){

    }
    handleResponse=async (rsp)=>{
        console.log("base.service line 13")
        console.log(rsp)
        if(rsp.status==200){

            rsp=await rsp.json();

            if(rsp.statusCode==0){

                return new DtoResponse(resultStatus.success,rsp)
            }

            return new DtoResponse(resultStatus.error,null,rsp.stateMessage)

        }else if(rsp.status==401){
            return new DtoResponse(resultStatus.error,null,"Authentication Error!")
        }

        return new DtoResponse(resultStatus.error,null,"Servise erişelemiyor!");
    }


}

export default BaseService