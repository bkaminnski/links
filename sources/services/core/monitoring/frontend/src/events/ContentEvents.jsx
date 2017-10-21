import MonitoringPage from '../page/MonitoringPage.jsx';

export default class ContentEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menu-and-content.content.requested.monitoring', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.menu-and-content.content.available', <MonitoringPage />);
    }
}