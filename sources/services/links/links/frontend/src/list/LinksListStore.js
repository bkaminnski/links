export default class LinksListStore {

    constructor(linksListComponent) {
        this.component = linksListComponent;
        this.component.state = { links: [] };
        this.slices = {};
    }

    subscribeToEvents() {
        this.linksListSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.links.linksListSlice.available', (msg, slice) => {
            this.slices[slice.name] = slice;
            this.rebuildState();
        });
        PubSub.publish('uiEvent.links.linksListSlices.requested');
    }

    rebuildState() {
        let linksMap = {};
        let links = [];
        Object
            .keys(this.slices)
            .map(k => this.slices[k])
            .forEach(slice => slice.items
                .forEach(item => {
                    if (linksMap[item.linkSharedId] == null) {
                        let link = {
                            sharedId: item.linkSharedId,
                            components: []
                        };
                        links.push(link);
                        linksMap[item.linkSharedId] = link;
                    }
                }
                )
            );

        Object
            .keys(this.slices)
            .map(k => this.slices[k])
            .sort((s1, s2) => s1.priority - s2.priority)
            .forEach(slice => slice.items.forEach(
                item => {
                    linksMap[item.linkSharedId].components.push(item.component)
                }
            ));
        this.component.setState({ links: links });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linksListSliceAvailableSubscriptionToken);
    }
}