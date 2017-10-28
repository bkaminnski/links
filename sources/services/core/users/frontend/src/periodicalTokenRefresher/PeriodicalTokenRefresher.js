import AuthenticationResponseHandler from '../authenticationResponseHandler/AuthenticationResponseHandler.js';

export default class PeriodicalTokenRefresher {

    constructor() {
        this.authenticationResponseHandler = new AuthenticationResponseHandler();
    }

    registerPeriodicalRefresh() {
        setInterval(() => this.refreshToken(), 30000);
    }

    refreshToken() {
        if (sessionStorage.getItem('cuiAuthenticationToken') != null && sessionStorage.getItem('cuiAuthenticationToken') != '') {
            HttpClient
                .sendGet('/users/resources/authenticationToken')
                .then(response => this.authenticationResponseHandler.handleResponse(response));
        }
    }
}