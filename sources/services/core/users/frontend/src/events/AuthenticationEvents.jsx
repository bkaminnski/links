import LoginPage from '../login/LoginPage.jsx';

export default class AuthenticationEvents {

    subscribeToRequested() {
        this.authenticationRequestedSubscriptionToken = PubSub.subscribe('uiEvent.users.authentication.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.application.applicationLayout.available', <LoginPage />);
    }
}