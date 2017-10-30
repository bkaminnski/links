import LinksListSlicesEvents from './events/LinksListSlicesEvents.jsx';
import DescriptionEvents from './events/DescriptionEvents.jsx';

let linksListSlicesEvents = new LinksListSlicesEvents();
linksListSlicesEvents.subscribeToRequested();

let descriptionEvents = new DescriptionEvents();
descriptionEvents.subscribeToRequested();