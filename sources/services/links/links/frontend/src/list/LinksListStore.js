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
        this.linksListSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.links.linksListSlice.available', (msg, slice) => {
            this.slices = this.slices.filter(s => s.name != slice.name);
            this.slices.push(slice);
            this.rebuildState();
        });
        this.linkWasCreatedSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreation.linkWasCreated', (msg) => {
            this.loadLinks();
        });
        PubSub.publish('uiEvent.links.linksListSlices.requested');
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
            .forEach(slice => slice.elements.forEach(
                element => {
                    if (linksMap[element.linkSharedId] != null) linksMap[element.linkSharedId].components.push(element.component)
                }
            ));
        this.component.setState({ links: this.links });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linksListSliceAvailableSubscriptionToken);
        PubSub.unsubscribe(this.linkWasCreatedSubscriptionToken);
    }
}