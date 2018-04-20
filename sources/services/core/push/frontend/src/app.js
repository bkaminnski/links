
import Push from './push/Push.js';
import AuthenticationEvents from './events/AuthenticationEvents.jsx';

let push = new Push();
let authenticationEvents = new AuthenticationEvents(push);
authenticationEvents.subscribeToRequested();
push.register();