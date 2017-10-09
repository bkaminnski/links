import MenuAndContent from '../page/MenuAndContent.jsx';

export default class ApplicationLayoutEvents {

    subscribeToRequested() {
        this.applicationLayoutRequestedSubscriptionToken = PubSub.subscribe('uiEvent.applicationLayout.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.applicationLayout.available', <MenuAndContent />);
    }
}