import AttributesStore from './AttributesStore.js';

export default class LoginFormStore {

    constructor(formComponent) {
        this.attributesStore = new AttributesStore(formComponent);
        this.formComponent = formComponent;
        this.formComponent.state = this.initialState();
    }

    initialState() {
        let initialState = this.attributesStore.initialState();
        initialState.attributes = {
            username: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            }
        };
        return initialState;
    }

    login() {
        let newSessionRequest = {
            username: this.formComponent.state.attributes.username.value,
            password: this.formComponent.state.attributes.password.value
        };
        HttpClient
            .sendPost('/users/resources/sessions', newSessionRequest)
            .then(response => this.handleLoginResponse(response));
    }

    handleLoginResponse(response) {
        if (response.status == 200) {
            this.keepSessionToken(response);
            PubSub.publish('uiEvent.application.applicationLayout.requested');
        } else {
            PubSub.publish('uiEvent.users.authentication.requested');
        }
    }

    keepSessionToken(response) {
        let cuiSessionToken = response.jsonObject.cuiSessionToken;
        sessionStorage.setItem('cuiSessionToken', cuiSessionToken);
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