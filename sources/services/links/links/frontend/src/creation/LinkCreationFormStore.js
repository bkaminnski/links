import AttributesStore from './AttributesStore.js';

export default class LinkCreationFormStore {

    constructor(component) {
        this.attributesStore = new AttributesStore(component);
        this.component = component;
        this.component.state = this.initialState();
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
        initialState.sharedId = '';
        return initialState;
    }

    createLink() {
        uniqueIds.withNext(uniqueId => {
            let createLinkCommand = {
                sharedId: uniqueId,
                url: this.component.state.attributes.url.value
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
        this.component.setState(this.initialState());
    }

    onChange(attributeName, attributeValue, attributeValid) {
        var _this = this;
        if (this.component.state.sharedId == '') {
            uniqueIds.withNext(
                uniqueId => _this.component.setState(
                    { sharedId: uniqueId },
                    () => {
                        PubSub.publish('uiEvent.links.linkCreation.initiatedWithLinkId', _this.component.state.sharedId);
                        _this.attributesStore.onChange(attributeName, attributeValue, attributeValid);
                    }
                )
            );
        } else {
            this.attributesStore.onChange(attributeName, attributeValue, attributeValid);
        }
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