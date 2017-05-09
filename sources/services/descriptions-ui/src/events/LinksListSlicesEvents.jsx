import DescriptionsList from '../list/DescriptionsList.jsx';

export default class LinksListSlicesEvents {

    constructor() {
        this.descriptionsList = new DescriptionsList();
    }

    subscribeToRequested() {
        this.linksListSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.linksListSlices.requested', msg => {
            this.descriptionsList.loadTransformAndPublish();
        });
    }
}