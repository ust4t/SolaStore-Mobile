import I18n from "i18n-js";





class RemoteDataAccessObject {
    apiUrl = "https://api.solastore.com.tr";
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

    PostRequest2 = async (route = "", params = [], signal = null, body = null) => {
        let url = this.apiUrl + "/api/" + route;

        if (body != null) {

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



        return this.timeout(20000, fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            signal
        }))
    }

    GetRequestBylangIntValues(route = "", signal = null, params = []) {
        let url = this.apiUrl + "/api/" + route;

        url += `?sourceProof=${this.sourceProof}`
        // url += `&lang=${this.lang}`
        var langValue = I18n.locale.substring(3, 5);
        var langInt = 1;
        switch (langValue) {
            case "TR":
                langInt = 1;
                break;
            case "EN":
                langInt = 2;
                break;
            case "RU":
                langInt = 5;
                break;
            case "AR":
                langInt = 4;
                break;
            case "FR":
                langInt = 3;
                break;
            default:
                langInt = 1;
                break;

        }
        url += `&lang=${langInt}`



        params.map((item, index) => {
            // if (index == 0) url += `?${item}`;
            // else url += `&${item}`;
            url += `&${item.name}=${item.val}`;
        })



        return this.timeout(20000, fetch(url, {
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
                reject(new Error("404 :("))
            }, ms)
            promise.then(resolve, reject)
        })
    }
}


export default new RemoteDataAccessObject()