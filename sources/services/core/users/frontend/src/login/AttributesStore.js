export default class AttributesStore {

    constructor(formComponent) {
        this.formComponent = formComponent;
        this.attributesComponents = {};
        this.uniqueKey = 0;
    }

    initialState() {
        this.uniqueKey++;
        return {
            attributes: {},
            allValid: false,
            uniqueKey: this.uniqueKey
        };
    }

    onChange(attributeName, attributeValue, attributeValid) {
        let attributes = this.formComponent.state.attributes;
        attributes[attributeName].value = attributeValue;
        attributes[attributeName].valid = attributeValid;
        this.formComponent.setState({
            attributes: attributes,
            allValid: this.allAttributesAreValid()
        });
    }

    allAttributesAreValid() {
        return !Object
            .values(this.formComponent.state.attributes)
            .some(a => !a.valid);
    }

    focusOnFirstInvalidAttributeComponent() {
        let attributes = this.formComponent.state.attributes;
        Object.keys(attributes)
            .filter(a => !attributes[a].valid)
            .map(a => this.attributesComponents[a])
            .some((ac) => {
                ac.showErrorAndFocus();
                return true;
            });
    }

    addAttributeComponent(attributeName, attributeComponent) {
        this.attributesComponents[attributeName] = attributeComponent;
    }
}