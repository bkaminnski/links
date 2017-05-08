import LinksPage from '../LinksPage.jsx';

export default class ContentEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.links', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.content.isAvailable', <LinksPage />);
    }
}