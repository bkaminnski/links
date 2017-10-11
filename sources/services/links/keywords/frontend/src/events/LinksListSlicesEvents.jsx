import KeywordsList from '../list/KeywordsList.jsx';

export default class LinksListSlicesEvents {

    constructor() {
        this.keywordsList = new KeywordsList();
    }

    subscribeToRequested() {
        this.linksListSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.linksListSlices.requested', msg => {
            this.keywordsList.loadTransformAndPublish();
        });
    }
}