export default class MenuItemsEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menu-and-content.menuItems.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.menu-and-content.menuItem.available', {
            code: 'monitoring',
            label: 'Monitoring',
            priority: 5000
        });
    }
}