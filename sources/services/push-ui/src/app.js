console.log('push service is available');

let webSocket = new WebSocket("ws://localhost:8080/push/push");
webSocket.onmessage = function (event) {
    let dataObject = JSON.parse(event.data);
    let uiEventName = dataObject.uiEventName;
    let uiEventPayload = dataObject.uiEventPayload;
    console.log('uiEventName, uiEventPayload');
    console.log(uiEventName);
    console.log(uiEventPayload);
    PubSub.publish(uiEventName, uiEventPayload);
};