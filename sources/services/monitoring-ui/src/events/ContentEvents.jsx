import MonitoringPage from '../page/MonitoringPage.jsx';

export default class ContentEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.monitoring', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.content.available', <MonitoringPage />);
    }
}