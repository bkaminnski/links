export default class UsersClient {

    login(username, password) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", services.get('users') + '/resources/sessions');
            request.setRequestHeader("Content-type", "application/json");
            request.setRequestHeader("Accept", "*/*");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    resolve(request.responseText);
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