import React from 'react';
import AboutPage from './AboutPage.jsx';

export default class Events {

    subscribe() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menuItems.requested', msg => {
            this.publishMenuItem();
        });
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.about', msg => {
            this.publishContent();
        });
    }

    publishMenuItem() {
        PubSub.publish('uiEvent.menuItem.isAvailable', {
            code: 'about',
            label: 'About',
            priority: 10000
        });
    }

    publishContent() {
        PubSub.publish('uiEvent.content.isAvailable', <AboutPage />);
    }
}

let events = new Events();
events.subscribe();
events.publishMenuItem();