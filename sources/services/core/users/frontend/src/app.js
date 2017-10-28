import PeriodicalTokenRefresher from './periodicalTokenRefresher/PeriodicalTokenRefresher.js';
import AuthenticationEvents from './events/AuthenticationEvents.jsx';
import UserInfoEvents from './events/UserInfoEvents.jsx';

let periodicalTokenRefresher = new PeriodicalTokenRefresher();
periodicalTokenRefresher.registerPeriodicalRefresh();

let authenticationEvents = new AuthenticationEvents();
authenticationEvents.subscribeToRequested();

let userInfoEvents = new UserInfoEvents();
userInfoEvents.subscribeToRequested();
userInfoEvents.publishAvailable();
