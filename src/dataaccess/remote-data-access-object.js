import I18n from "i18n-js";




class RemoteDataAccessObject {
    apiUrl = "http://api.solastore.com.tr";
    sourceProof = "ugurturkmenn@gmail.com";
    lang = "TR";


    PostRequest = async (route = "", params = [], signal = null, body = null) => {
        let url = this.apiUrl + "/api/" + route;

        url += `?sourceProof=${this.sourceProof}`
        // url += `&lang=${this.lang}`
        url += `&lang=${I18n.locale.substring(3, 5)}`

        params.map((item, index) => {
            // if (index == 0) url += `?${item}`;
            // else url += `&${item}`;
            url += `&${item.name}=${item.val}`;
        })



      
        if (body != null) {
            console.log("remote-data-access-obecjt line 29")
            console.log(params)
            console.log(body)
            return this.timeout(10000, fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                signal
            }))
        }
        return this.timeout(10000, fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(requestObject),
            signal
        }))
    }
    GetRequest(route = "", signal = null, params = []) {
        let url = this.apiUrl + "/api/" + route;

        url += `?sourceProof=${this.sourceProof}`
        // url += `&lang=${this.lang}`
        url += `&lang=${I18n.locale.substring(3, 5)}`

        params.map((item, index) => {
            // if (index == 0) url += `?${item}`;
            // else url += `&${item}`;
            url += `&${item.name}=${item.val}`;
        })




        console.log(url)
        return this.timeout(10000, fetch(url, {
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
                reject(new Error("İstek zaman aşımına uğradı!"))
            }, ms)
            promise.then(resolve, reject)
        })
    }
}


export default new RemoteDataAccessObject()