import AttributesStore from './AttributesStore.js';
import DescriptionItemsStore from '../descriptionItems/DescriptionItemsStore.jsx'

export default class DescriptionCreationFormStore {

    constructor(component) {
        this.attributesStore = new AttributesStore(component);
        this.component = component;
        this.component.state = this.initialState();
    }

    initialState() {
        let initialState = this.attributesStore.initialState();
        initialState.attributes = {
            description: {
                value: '',
                valid: false
            }
        };
        initialState.linkSharedId = '';
        return initialState;
    }

    reset() {
        this.component.setState(this.initialState());
    }

    onChange(attributeName, attributeValue, attributeValid) {
        this.attributesStore.onChange(attributeName, attributeValue, attributeValid);
    }

    addAttributeComponent(attributeName, attributeComponent) {
        this.attributesStore.addAttributeComponent(attributeName, attributeComponent);
    }

    allAttributesAreValid() {
        return this.attributesStore.allAttributesAreValid();
    }

    focusOnFirstInvalidAttributeComponent() {
        this.attributesStore.focusOnFirstInvalidAttributeComponent();
    }

    subscribeToEvents() {
        this.linkCreationWasInitiatedSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreation.initiatedWithLinkId', (msg, linkSharedId) => {
            this.collapsibleWrapper.show();
            this.component.setState({ linkSharedId: linkSharedId });
        });
        this.linkCreationWasFinalizedSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreation.finalized', (msg) => {
            this.createDescription();
        });
    }

    createDescription() {
        let createDescriptionCommand = {
            linkSharedId: this.component.state.linkSharedId,
            description: this.component.state.attributes.description.value
        };
        HttpClient.sendPost('/descriptions/resources/descriptions', createDescriptionCommand).then((response) => {
            if (response.status == 204) {
                this.reset();
                this.collapsibleWrapper.hide();
                new DescriptionItemsStore().loadTransformAndPublish();
            }
        });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.linkCreationWasInitiatedSubscriptionToken);
        PubSub.unsubscribe(this.linkCreationWasFinalizedSubscriptionToken);
    }
}