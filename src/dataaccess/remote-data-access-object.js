



class RemoteDataAccessObject {
    apiUrl = "http://api.solastore.com.tr";


    PostRequest = async (route = "", requestObject = null, signal = null) => {
        return this.timeout(7000, fetch(this.apiUrl + "/api/" + route, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObject),
            signal
        }))
    }
    GetRequest(route="",signal=null,...params){
        let url=this.apiUrl + "/api/" + route;
        params.map((item,index)=>{
            if(index==0)url+=`?${item}`;
            else url+= `&${item}`;
        })

        console.log(url)
        return this.timeout(7000, fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            signal
        }))
    }

   
    timeout(ms, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("İstek zaman aşımına uğradı.Hata Alıyorum sayfasına bakın!"))
            }, ms)
            promise.then(resolve, reject)
        })
    }
}


export default new RemoteDataAccessObject()