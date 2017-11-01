import UrlItemsStore from '../urlItems/UrlItemsStore.jsx';

export default class LinksListSlicesEvents {

    constructor() {
        this.urlItemsStore = new UrlItemsStore();
    }

    subscribeToRequested() {
        this.linksListSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.links.linksListSlices.requested', msg => {
            this.urlItemsStore.loadTransformAndPublish();
        });
    }
}