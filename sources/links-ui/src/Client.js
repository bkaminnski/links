export default class Client {

    links() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "http://localhost:8080/links/resources/links");
            request.onreadystatechange = () => {
                let raw = request.responseText;
                console.log('raw:' + raw);
                let objectified = JSON.parse(raw);
                resolve(objectified);
            }
            request.send();
        });
        return result;
    }
}