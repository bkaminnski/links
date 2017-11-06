import UrlLinkCreationSlice from '../creation/UrlLinkCreationSlice.jsx';

export default class UrlsListSlicesEvents {

    constructor() {
        this.urlLinkCreationSlice = new UrlLinkCreationSlice();
    }

    subscribeToRequested() {
        this.linkCreationSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreationSlices.requested', msg => {
            this.urlLinkCreationSlice.prepareAndPublish();
        });
    }
}