import AttributesStore from './AttributesStore.js';

export default class DescriptionCreationFormStore {

    constructor(formComponent) {
        this.attributesStore = new AttributesStore(formComponent);
        this.formComponent = formComponent;
        this.formComponent.state = this.initialState();
    }

    initialState() {
        let initialState = this.attributesStore.initialState();
        initialState.attributes = {
            description: {
                value: '',
                valid: false
            }
        };
        return initialState;
    }

    createDescription() {
        uniqueIds.withNext(uniqueId => {
            let createDescriptionCommand = {
                sharedLinkId: uniqueId,
                description: this.formComponent.state.attributes.description.value
            };
            HttpClient.sendPost('/descriptions/resources/descriptions', createDescriptionCommand).then((response) => {
                if (response.status == 204) {
                    this.reset();
                    PubSub.publish('uiEvent.descriptions.descriptionCreation.descriptionWasCreated');
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