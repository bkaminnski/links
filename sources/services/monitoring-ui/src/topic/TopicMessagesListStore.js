export default class TopicMessagesListStore {

    constructor(topicMessagesList) {
        this.component = topicMessagesList;
        this.component.state = { topicMessages: [] };
    }

    subscribeToEvents() {
        this.topicMessageAvailableSubscriptionToken = PubSub.subscribe('uiEvent.topicMessage.available', (msg, topicMessage) => {
            this.addTopicMessage(topicMessage);
        });
    }

    addTopicMessage(topicMessage) {
        let topicMessages = this.component.state.topicMessages;
        topicMessages.unshift(topicMessage);
        this.component.setState({ topicMessages: topicMessages });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.topicMessageAvailableSubscriptionToken);
    }
}