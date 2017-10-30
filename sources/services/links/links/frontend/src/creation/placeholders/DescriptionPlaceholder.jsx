import React from 'react';

export default class DescriptionPlaceholder extends React.Component {

    constructor() {
        super();
        this.state = { component: null };
    }

    componentDidMount() {
        this.descriptionRequestedSubscriptionToken = PubSub.subscribe('uiEvent.descriptions.description.available', (msg, component) => {
            this.setState({ component: component })
        });
        PubSub.publish('uiEvent.descriptions.description.requested');
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.descriptionRequestedSubscriptionToken);
    }

    render() {
        return this.state.component;
    }
}