export default class DtoResponse{
    constructor(resultStatus,data=null,errorMessage=null){
        this.resultStatus=resultStatus
        this.data=data
        this.errorMessage=errorMessage
    }
}

