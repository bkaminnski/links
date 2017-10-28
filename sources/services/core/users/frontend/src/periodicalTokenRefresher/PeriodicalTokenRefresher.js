import AuthenticationResponseHandler from '../authenticationResponseHandler/AuthenticationResponseHandler.js';

export default class PeriodicalTokenRefresher {

    constructor() {
        this.authenticationResponseHandler = new AuthenticationResponseHandler();
        this.refreshToken.bind(this);
    }

    registerPeriodicalRefresh() {
        setInterval(() => this.refreshToken(), 30000);
    }

    refreshToken() {
        var _this = this;
        HttpClient
            .sendGet('/users/resources/authenticationToken')
            .then(response => _this.authenticationResponseHandler.handleResponse(response));
    }
}