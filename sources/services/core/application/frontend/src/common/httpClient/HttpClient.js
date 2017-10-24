export default class HttpClient {
    sendGet(url) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", url);
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("CUI-Session-Token", sessionStorage.getItem('cuiSessionToken'));
            request.onreadystatechange = () => {
                this.handleResponse(request, resolve);
            }
            request.send();
        });

        return result;
    }

    sendPut(url, data) {
        return new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open("PUT", url);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            request.setRequestHeader("CUI-Session-Token", sessionStorage.getItem('cuiSessionToken'));
            request.onreadystatechange = () => {
                this.handleResponse(request, resolve);
            }
            request.send(JSON.stringify(data));
        });
    }

    sendPost(url, data, isFormData) {
        return new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open("POST", url);
            if (!isFormData) {
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                data = JSON.stringify(data)
            }
            request.setRequestHeader("CUI-Session-Token", sessionStorage.getItem('cuiSessionToken'));
            request.onreadystatechange = () => {
                this.handleResponse(request, resolve, isFormData);
            }
            request.send(data);
        });
    }

    sendDelete(url) {
        return new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open("DELETE", url);
            request.setRequestHeader("CUI-Session-Token", sessionStorage.getItem('cuiSessionToken'));
            request.onreadystatechange = () => {
                this.handleResponse(request, resolve);
            }
            request.send();
        });
    }

    handleResponse(request, resolve, isFormData) {
        if (request.readyState != 4)
            return;

        let response = { status: request.status };
        if (request.status == 200) {
            if (request.responseText != "") {
                response.jsonObject = JSON.parse(request.responseText);
            }
            resolve(response);
        } else if (request.status == 401) {
            PubSub.publish('uiEvent.users.authentication.requested');
        }
    }
}