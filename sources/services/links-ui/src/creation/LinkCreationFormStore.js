import LinksClient from '../LinksClient.js';

export default class LinkCreationFormStore {

    constructor(linkCreationFormComponent) {
        this.component = linkCreationFormComponent;
        this.component.state = this.initialStateWithKey(0);
        this.linksClient = new LinksClient();
        this.attributesComponents = {};
    }

    initialStateWithKey(key) {
        return {
            attributes: {
                url: {
                    value: '',
                    valid: false,
                    ref: null
                }
            },
            valid: false,
            key: key
        };
    }

    onChange(attributeName, attributeValue, attributeValid) {
        let attributes = this.component.state.attributes;
        attributes[attributeName].value = attributeValue;
        attributes[attributeName].valid = attributeValid;
        this.component.setState({ attributes: attributes, valid: this.validateWithoutChangingFocus() });
    }

    validateWithoutChangingFocus() {
        return !Object
            .values(this.component.state.attributes)
            .some(a => !a.valid);
    }

    validateAndFocusOnFirstInvalidComponent() {
        let attributes = this.component.state.attributes;
        return !Object.keys(this.component.state.attributes)
            .filter(a => !attributes[a].valid)
            .map(a => this.attributesComponents[a])
            .some((ac) => {
                ac.showErrorAndFocus();
                return true;
            });
    }

    createLink() {
        uniqueIds.withNext(uniqueId => {
            this.linksClient.createLink(this.component.state.attributes.url.value, uniqueId).then((responseStatus) => {
                PubSub.publish('uiEvent.linkCreation.linkWasCreated');
            });
        });
    }

    reset() {
        this.component.setState(this.initialStateWithKey(this.component.state.key + 1));
    }

    addRefToAttributeComponent(attributeName, attributeComponent) {
        this.attributesComponents[attributeName] = attributeComponent;
    }
}