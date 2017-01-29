import LinksClient from '../LinksClient.js';

export default class LinksListStateBuilder {

    constructor(linksListComponent) {
        this.linksListComponent = linksListComponent;
        this.linksClient = new LinksClient();
        this.links = [];
        this.slices = [];
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
        this.linksListComponent.setState({ links: this.links });
    }

    loadLinks() {
        this.linksClient
            .loadLinks()
            .then(links => {
                this.links = links;
                this.rebuildState();
            });
    }

    subscribeToEvents() {
        this.sliceWasLoadedSubscriptionToken = PubSub.subscribe('uiEvent.linksList.sliceWasLoaded', (msg, slice) => {
            this.slices.push(slice);
            this.rebuildState();
        });
        this.linkWasCreatedSubscriptionToken = PubSub.subscribe('uiEvent.linkCreation.linkWasCreated', (msg) => {
            this.loadLinks();
        });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.sliceWasLoadedSubscriptionToken);
        PubSub.unsubscribe(this.linkWasCreatedSubscriptionToken);
    }
}