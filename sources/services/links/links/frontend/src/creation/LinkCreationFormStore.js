export default class LinkCreationFormStore {

    constructor(component) {
        this.component = component;
        this.component.state = { slices: [] };
        this.slices = {};
    }

    subscribeToEvents() {
        this.linkCreationSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreationSlice.available', (msg, slice) => {
            this.slices[slice.name] = slice;
            this.rebuildState();
        });
        PubSub.publish('uiEvent.links.linkCreationSlices.requested');
    }

    rebuildState() {
        let slices = Object
            .keys(this.slices)
            .map(k => this.slices[k])
            .sort((s1, s2) => s1.priority - s2.priority);
        this.component.setState({ slices: slices });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linkCreationSliceAvailableSubscriptionToken);
    }

    onSubmit() {

    }
}