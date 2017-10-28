import AuthenticationEvents from './events/AuthenticationEvents.jsx';
import PeriodicalTokenRefresher from './periodicalTokenRefresher/PeriodicalTokenRefresher.js';

let authenticationEvents = new AuthenticationEvents();
authenticationEvents.subscribeToRequested();

let periodicalTokenRefresher = new PeriodicalTokenRefresher();
periodicalTokenRefresher.registerPeriodicalRefresh();