import AttributesStore from './AttributesStore.js';
import UsersClient from '../UsersClient.js';

export default class LoginFormStore {

    constructor(formComponent) {
        this.usersClient = new UsersClient();
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
        this.usersClient
            .login(this.formComponent.state.attributes.username.value, this.formComponent.state.attributes.password.value)
            .then(response => this.handleLoginResponse(response));
    }

    handleLoginResponse(response) {
        if (response.status == 204) {
            PubSub.publish('uiEvent.applicationLayout.requested');
        } else {
            PubSub.publish('uiEvent.authentication.requested');
        }
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