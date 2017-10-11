import LinksPage from '../page/LinksPage.jsx';

export default class ContentEvents {

    subscribeToRequested() {
        this.contentRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.links', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.content.available', <LinksPage />);
    }
}