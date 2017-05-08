export default class MenuItemsEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menuItems.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.menuItem.isAvailable', {
            code: 'about',
            label: 'About',
            priority: 10000
        });
    }
}