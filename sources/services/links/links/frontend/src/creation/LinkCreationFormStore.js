import AttributesStore from './AttributesStore.js';
import LinksClient from '../LinksClient.js';

export default class LinkCreationFormStore {

    constructor(formComponent) {
        this.linksClient = new LinksClient();
        this.attributesStore = new AttributesStore(formComponent);
        this.formComponent = formComponent;
        this.formComponent.state = this.initialState();
    }

    initialState() {
        let initialState = this.attributesStore.initialState();
        initialState.attributes = {
            url: {
                value: '',
                valid: false
            }
        };
        return initialState;
    }

    createLink() {
        uniqueIds.withNext(uniqueId => {
            this.linksClient.createLink(this.formComponent.state.attributes.url.value, uniqueId).then((responseStatus) => {
                if (responseStatus == 204) {
                    this.reset();
                    PubSub.publish('uiEvent.linkCreation.linkWasCreated');
                }
            });
        });
    }

    reset() {
        this.formComponent.setState(this.initialState());
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
}