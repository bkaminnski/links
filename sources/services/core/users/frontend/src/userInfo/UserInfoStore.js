
import jwt_decode from 'jwt-decode';

export default class InfoStore {

    constructor(component) {
        this.component = component;
        this.component.state = { email: '' };
    }

    populate() {
        let authenticatedUser = jwt_decode(sessionStorage.getItem('cuiAuthenticationToken'));
        this.component.setState({ email: authenticatedUser.email });
    }

    logOut() {
        sessionStorage.setItem('cuiAuthenticationToken', '');
        PubSub.publish('uiEvent.users.authentication.requested');
    }
}