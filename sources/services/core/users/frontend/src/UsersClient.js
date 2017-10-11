export default class UsersClient {

    login(username, password) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", '/users/resources/sessions');
            request.setRequestHeader("Content-type", "application/json");
            request.setRequestHeader("Accept", "*/*");
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState == 4 && (request.status == 204 || request.status == 401)) {
                    resolve(request);
                }
            }
            request.send(JSON.stringify({
                username: username,
                password: password
            }));
        });
        return result;
    }
}