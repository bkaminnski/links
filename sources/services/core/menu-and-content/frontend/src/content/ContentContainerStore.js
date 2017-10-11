export default class ContentContainerStore {

    constructor(contentContainerComponent) {
        this.contentContainerComponent = contentContainerComponent;
    }

    subscribeToEvents() {
        this.contentIsAvailableSubscriptionToken = PubSub.subscribe('uiEvent.content.available', (msg, contentComponent) => {
            this.contentContainerComponent.setState({ contentComponent: contentComponent });
        });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.contentIsAvailableSubscriptionToken);
    }
}