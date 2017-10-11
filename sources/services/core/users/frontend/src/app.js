import AuthenticationEvents from './events/AuthenticationEvents.jsx';

let authenticationEvents = new AuthenticationEvents();
authenticationEvents.subscribeToRequested();

// TODO: remove
authenticationEvents.publishAvailable();