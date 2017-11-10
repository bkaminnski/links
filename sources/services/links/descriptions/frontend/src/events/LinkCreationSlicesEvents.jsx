import DescriptionCreationForm from '../creation/DescriptionCreationForm.jsx';

export default class ContentEvents {

    subscribeToRequested() {
        this.contentRequestedSubscriptionToken = PubSub.subscribe('uiEvent.descriptions.description.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.descriptions.description.available', <DescriptionCreationForm />);
    }
}