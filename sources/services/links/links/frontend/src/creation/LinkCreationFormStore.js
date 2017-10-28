import AttributesStore from './AttributesStore.js';

export default class LinkCreationFormStore {

    constructor(formComponent) {
        this.attributesStore = new AttributesStore(formComponent);
        this.formComponent = formComponent;
        this.formComponent.state = this.initialState();
        this.onChange = this.onChange.bind(this);
        this.addAttributeComponent = this.addAttributeComponent.bind(this);
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
            let createLinkCommand = {
                sharedId: uniqueId,
                url: this.formComponent.state.attributes.url.value
            };
            HttpClient.sendPost('/links/resources/links', createLinkCommand).then((response) => {
                if (response.status == 204) {
                    this.reset();
                    PubSub.publish('uiEvent.links.linkCreation.linkWasCreated');
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

    onSubmit() {
        if (this.attributesStore.allAttributesAreValid()) {
            this.createLink();
        } else {
            this.attributesStore.focusOnFirstInvalidAttributeComponent();
        }
    }
}