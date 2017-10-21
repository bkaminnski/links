import KeywordsItemsStore from '../keywordsItems/KeywordsItemsStore.jsx';

export default class LinksListSlicesEvents {

    constructor() {
        this.keywordsItemsStore = new KeywordsItemsStore();
    }

    subscribeToRequested() {
        this.linksListSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.links.linksListSlices.requested', msg => {
            this.keywordsItemsStore.loadTransformAndPublish();
        });
    }
}