export default class TopicMessagesListStore {

    constructor(topicMessagesList) {
        this.component = topicMessagesList;
        this.component.state = { topicMessages: [] };
        this.topicMessages = [];
        this.bufferTimeout = null;
    }

    subscribeToEvents() {
        this.topicMessageAvailableSubscriptionToken = PubSub.subscribe('uiEvent.monitoring.topicMessage.available', (msg, topicMessage) => {
            this.addTopicMessage(topicMessage);
        });
    }

    addTopicMessage(topicMessage) {
        this.topicMessages.unshift(topicMessage);
        this.component.setState({ topicMessages: this.topicMessages });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.topicMessageAvailableSubscriptionToken);
    }
}