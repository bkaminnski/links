export default class Client {

    links() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "http://89.36.219.7:8080/links/resources/links");
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