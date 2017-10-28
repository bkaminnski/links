
import UserInfo from '../userInfo/UserInfo.jsx';

export default class UserInfoEvents {

    constructor() {
        this.publishAvailable.bind(this);
    }

    subscribeToRequested() {
        this.userInfoRequestedSubscriptionToken = PubSub.subscribe('uiEvent.users.userInfo.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.users.userInfo.available', <UserInfo />);
    }
}