export default class LinksListStore {

    constructor(linksListComponent) {
        this.component = linksListComponent;
        this.component.state = { links: [] };
        this.links = [];
        this.slices = [];
    }

    loadLinks() {
        HttpClient
            .sendGet('/links/resources/links')
            .then(links => {
                this.links = links.jsonObject;
                this.rebuildState();
            });
    }

    subscribeToEvents() {
        this.linksListSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.linksListSlice.available', (msg, slice) => {
            this.slices.push(slice);
            this.rebuildState();
        });
        this.linkWasCreatedSubscriptionToken = PubSub.subscribe('uiEvent.linkCreation.linkWasCreated', (msg) => {
            this.loadLinks();
        });
        PubSub.publish('uiEvent.linksListSlices.requested');
    }

    rebuildState() {
        let linksMap = {};
        this.links
            .forEach(link => {
                link.components = [];
                linksMap[link.sharedId] = link;
            });
        this.slices
            .sort((s1, s2) => s1.priority - s2.priority)
            .forEach(slice => slice.fragments.forEach(
                fragment => linksMap[fragment.linkSharedId].components.push(fragment.component)
            ));
        this.component.setState({ links: this.links });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linksListSliceAvailableSubscriptionToken);
        PubSub.unsubscribe(this.linkWasCreatedSubscriptionToken);
    }
}