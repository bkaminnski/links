export default class MenuItemsEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menuItems.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.menuItem.available', {
            code: 'links',
            label: 'Links',
            priority: 100
        });
    }
}