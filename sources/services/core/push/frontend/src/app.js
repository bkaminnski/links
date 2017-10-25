let endpoint = window.location.href.split('/').slice(0, 3).join('/').replace(/^http/, 'ws') + '/push/push';
let webSocket = new WebSocket(endpoint);
webSocket.onmessage = function (event) {
    let dataObject = JSON.parse(event.data);
    let uiEventName = dataObject.uiEventName;
    let uiEventPayload = dataObject.uiEventPayload;
    PubSub.publish(uiEventName, uiEventPayload);
};