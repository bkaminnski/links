export default class LinksClient {

    createLink(url, uniqueId) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", '/links/resources/links');
            request.setRequestHeader("Content-type", "application/json");
            request.setRequestHeader("Accept", "*/*");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 204) {
                    resolve(request.status);
                }
            }
            request.send(JSON.stringify({
                sharedId: uniqueId,
                url: url
            }));
        });
        return result;
    }

    loadLinks() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", '/links/resources/links');
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        resolve(JSON.parse(request.responseText));
                    } else if (request.status == 401) {
                        PubSub.publish('uiEvent.authentication.requested');
                    }
                }
            }
            request.send();
        });
        return result;
    }
}