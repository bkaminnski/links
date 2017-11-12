import AttributesStore from './AttributesStore.js';
import AuthenticationResponseHandler from '../authenticationResponseHandler/AuthenticationResponseHandler.js';

export default class LoginFormStore {

    constructor(formComponent) {
        this.attributesStore = new AttributesStore(formComponent);
        this.formComponent = formComponent;
        this.formComponent.state = this.initialState();
        this.authenticationResponseHandler = new AuthenticationResponseHandler();
    }

    initialState() {
        let initialState = this.attributesStore.initialState();
        initialState.attributes = {
            email: {
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
        let authenticationRequest = {
            email: this.formComponent.state.attributes.email.value,
            password: this.formComponent.state.attributes.password.value
        };
        HttpClient
            .sendPost('/users/resources/authenticationRequests', authenticationRequest)
            .then(response => {
                this.authenticationResponseHandler.handleResponse(response);
                if (response.status == 200) {
                    PubSub.publish('uiEvent.application.applicationLayout.requested');
                }
            });
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