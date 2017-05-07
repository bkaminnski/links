import React from 'react';
import LinksScreen from './LinksScreen.jsx';

export default class Events {

    subscribe() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menuItems.requested', msg => {
            this.publishMenuItem();
        });
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.links', msg => {
            this.publishContent();
        });
    }

    publishMenuItem() {
        PubSub.publish('uiEvent.menuItem.isAvailable', {
            code: 'links',
            label: 'Links',
            priority: 100
        });
    }

    publishContent() {
        PubSub.publish('uiEvent.content.isAvailable', <LinksScreen />);
    }
}

let events = new Events();
events.subscribe();
events.publishMenuItem();