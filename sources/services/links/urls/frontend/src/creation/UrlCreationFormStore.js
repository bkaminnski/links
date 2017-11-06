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
        initialState.linkSharedId = '';
        return initialState;
    }

    createUrl() {
        let createUrlCommand = {
            linkSharedId: this.component.state.linkSharedId,
            url: this.component.state.attributes.url.value
        };
        HttpClient.sendPost('/urls/resources/urls', createUrlCommand).then((response) => {
            if (response.status == 204) {
                this.reset();
            }
        });
    }

    reset() {
        this.component.setState(this.initialState());
    }

    onChange(attributeName, attributeValue, attributeValid) {
        var _this = this;
        if (this.component.state.linkSharedId == '') {
            uniqueIds.withNext(
                uniqueId => _this.component.setState(
                    { linkSharedId: uniqueId },
                    () => {
                        PubSub.publish('uiEvent.links.linkCreation.initiatedWithLinkId', _this.component.state.linkSharedId);
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
            PubSub.publish('uiEvent.links.linkCreation.finalized');
            this.createUrl();
        } else {
            this.attributesStore.focusOnFirstInvalidAttributeComponent();
        }
    }
}