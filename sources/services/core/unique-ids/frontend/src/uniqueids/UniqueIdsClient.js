export default class UniqueIdsClient {
    loadUniqueIds() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "/unique-ids/resources/uniqueIds");
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