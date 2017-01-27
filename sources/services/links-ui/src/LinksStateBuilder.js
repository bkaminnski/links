import LinksClient from './LinksClient.js';

export default class LinksStateBuilder {

    constructor(linksComponent) {
        this.linksComponent = linksComponent;
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
        this.linksComponent.setState({ links: this.links });
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
        this.subscriptionToken = PubSub.subscribe('uiEvent.linksSlice.wasLoaded', (msg, slice) => {
            this.slices.push(slice);
            this.rebuildState();
        });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.subscriptionToken);
    }
}