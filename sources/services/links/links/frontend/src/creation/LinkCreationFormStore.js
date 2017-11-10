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
        this.linkCreationValidationSuccessfullSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreationValidation.successfull', (msg, slice) => {
            this.slices[slice.name].validationSuccessfull = true;
            this.approveLinkCreation();
        });
        this.linkCreationValidationFailedSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreationValidation.failed', (msg, slice) => {
            this.slices[slice.name].validationFailed = true;
            this.denyLinkCreation();
        });
        PubSub.publish('uiEvent.links.linkCreationSlices.requested');
    }

    rebuildState() {
        let slices = Object
            .keys(this.slices)
            .map(k => this.slices[k])
            .map(slice => ({
                url: slice.url,
                priority: slice.priority,
                component: slice.component,
                validationRequested: false,
                validationSuccessfull: false,
                validationFailed: false,
                creationApproved: false,
                creationDenied: false
            }))
            .sort((s1, s2) => s1.priority - s2.priority);
        this.component.setState({ slices: slices });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linkCreationSliceAvailableSubscriptionToken);
    }

    onSubmit() {
        this.requestValidationForEachSlice();
    }

    requestValidationForEachSlice() {
        this.slices
            .forEach(slice => {
                if (!slice.validationRequested) {
                    slice.validationRequested = true;
                    slice.validationSuccessfull = false;
                    slice.validationFailed = false;
                    slice.creationApproved = false;
                    slice.creationDenied = false;
                    PubSub.publish('uiEvent.links.linkCreationValidation.requested');
                }
            });
    }

    approveLinkCreation() {
        let allWereSuccessfullyValidated = this.slices.every(slice => slice.validationSuccessfull);
        if (!allWereSuccessfullyValidated) {
            return;
        }

        this.slices
            .forEach(slice => {
                if (!slice.creationApproved) {
                    slice.creationApproved = true;
                    PubSub.publish('uiEvent.links.linkCreation.approved');
                }
            });
    }

    denyLinkCreation() {
        this.slices
            .forEach(slice => {
                if (!slice.creationDenied) {
                    slice.creationDenied = true;
                    PubSub.publish('uiEvent.links.linkCreation.denied');
                }
            });
    }
}