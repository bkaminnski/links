export default class Client {

    loadDescriptions() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", '/descriptions/resources/descriptions');
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