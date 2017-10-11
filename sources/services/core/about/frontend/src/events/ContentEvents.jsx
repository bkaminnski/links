import AboutPage from '../page/AboutPage.jsx';

export default class ContentEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.about', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.content.available', <AboutPage />);
    }
}