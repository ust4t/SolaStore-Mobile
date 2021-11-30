import { makeObservable, observable, computed, action } from "mobx"


class BusyStore {
    requestCount = 0;

    increase(){
        this.requestCount+=1;
    }
    decrease(){
        if(this.requestCount <= 1){
            this.requestCount=0;
        }
        else this.requestCount-=1;
    }

    constructor(){
        makeObservable(this, {
            requestCount:observable,
            increase:action,
            decrease:action
        })
    }
}
export default new BusyStore()