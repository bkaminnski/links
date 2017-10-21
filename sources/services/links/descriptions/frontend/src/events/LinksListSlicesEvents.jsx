import DescriptionItemsStore from '../list/DescriptionItemsStore.jsx';

export default class LinksListSlicesEvents {

    constructor() {
        this.descriptionItemsStore = new DescriptionItemsStore();
    }

    subscribeToRequested() {
        this.linksListSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.linksListSlices.requested', msg => {
            this.descriptionItemsStore.loadTransformAndPublish();
        });
    }
}