export default class AuthenticationResponseHandler {

    handleResponse(response) {
        if (response.status == 200) {
            this.keepAuthenticationToken(response);
            PubSub.publish('uiEvent.application.applicationLayout.requested');
        } else {
            sessionStorage.setItem('cuiAuthenticationToken', '');
            PubSub.publish('uiEvent.users.authentication.requested');
        }
    }

    keepAuthenticationToken(response) {
        let cuiAuthenticationToken = response.jsonObject.cuiAuthenticationToken;
        sessionStorage.setItem('cuiAuthenticationToken', cuiAuthenticationToken);
    }
}