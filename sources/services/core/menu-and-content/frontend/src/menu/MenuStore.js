export default class MenuStore {

    constructor(menuComponent) {
        this.menuComponent = menuComponent;
        this.menuItemsMap = new Map();
        this.selectedMenuItem = null;
    }

    subscribeToEvents() {
        this.menuItemIsAvailableSubscriptionToken = PubSub.subscribe('uiEvent.menu-and-content.menuItem.available', (msg, menuItem) => {
            this.menuItemsMap.set(menuItem.code, menuItem);
            this.rebuildState();
        });
        PubSub.publish('uiEvent.menu-and-content.menuItems.requested');
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.menuItemIsAvailableSubscriptionToken);
    }

    rebuildState() {
        let menuItems = [];
        this.menuItemsMap.forEach(value => menuItems.push(value));
        menuItems.sort((mi1, mi2) => mi1.priority - mi2.priority)
        if (menuItems.length > 0) {
            this.select(menuItems[0]);
        }
        this.menuComponent.setState({ menuItems: menuItems, selectedMenuItem: this.selectedMenuItem });
    }

    select(menuItem) {
        this.selectedMenuItem = menuItem;
        PubSub.publish('uiEvent.menu-and-content.content.requested.' + this.selectedMenuItem.code);
    }
}