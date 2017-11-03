export default class LinksListStore {

    constructor(linksListComponent) {
        this.component = linksListComponent;
        this.component.state = { links: [] };
        this.listSlices = {};
    }

    subscribeToEvents() {
        this.linksListSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.links.linksListSlice.available', (msg, listSlice) => {
            this.listSlices[listSlice.name] = listSlice;
            this.rebuildState();
        });
        PubSub.publish('uiEvent.links.linksListSlices.requested');
    }

    rebuildState() {
        let linksMap = {};
        let links = [];
        Object
            .keys(this.listSlices)
            .map(k => this.listSlices[k])
            .forEach(listSlice => listSlice.items
                .forEach(item => {
                    if (linksMap[item.linkSharedId] == null) {
                        let link = {
                            sharedId: item.linkSharedId,
                            itemSlices: []
                        };
                        links.push(link);
                        linksMap[item.linkSharedId] = link;
                    }
                })
            );
        Object
            .keys(this.listSlices)
            .map(k => this.listSlices[k])
            .sort((s1, s2) => s1.priority - s2.priority)
            .forEach(listSlice => listSlice.items
                .forEach(item => {
                    let itemSlice = {
                        name: listSlice.name,
                        component: item.component
                    }
                    linksMap[item.linkSharedId].itemSlices.push(itemSlice)
                }
                ));
        this.component.setState({ links: links });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linksListSliceAvailableSubscriptionToken);
    }
}