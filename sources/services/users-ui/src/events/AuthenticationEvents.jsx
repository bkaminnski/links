import LoginPage from '../login/LoginPage.jsx';

export default class AuthenticationEvents {

    subscribeToRequested() {
        this.authenticationRequestedSubscriptionToken = PubSub.subscribe('uiEvent.authentication.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.applicationLayout.available', <LoginPage />);
    }
}