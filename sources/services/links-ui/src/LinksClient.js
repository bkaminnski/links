export default class Client {

    createLink(url) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:8080/links/resources/links");
            request.setRequestHeader("Content-type", "application/json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    resolve(request.status);
                }
            }
            request.send(JSON.stringify({
                sharedId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);}),
                url: url
            }));
        });
        return result;
    }

    loadLinks() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "http://localhost:8080/links/resources/links");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    resolve(JSON.parse(request.responseText));
                }
            }
            request.send();
        });
        return result;
    }
}