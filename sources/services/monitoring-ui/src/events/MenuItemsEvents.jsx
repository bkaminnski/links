export default class MenuItemsEvents {

    subscribeToRequested() {
        this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menuItems.requested', msg => {
            this.publishAvailable();
        });
    }

    publishAvailable() {
        PubSub.publish('uiEvent.menuItem.available', {
            code: 'monitoring',
            label: 'Monitoring',
            priority: 5000
        });
    }
}