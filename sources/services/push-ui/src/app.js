let webSocket = new WebSocket(services.get('push').replace(/^http/, 'ws') + '/push');
webSocket.onmessage = function (event) {
    let dataObject = JSON.parse(event.data);
    let uiEventName = dataObject.uiEventName;
    let uiEventPayload = dataObject.uiEventPayload;
    PubSub.publish(uiEventName, uiEventPayload);
};