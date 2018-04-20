export default class AuthenticationEvents {

    constructor(push) {
        this.push = push;
        this.subscribeToRequested.bind(this);
    }

    subscribeToRequested() {
        this.authenticationRequestedSubscriptionToken = PubSub.subscribe('uiEvent.users.userAuthenticated', msg => {
            this.push.register();
        });
    }
}