import React from 'react';

export default class MenuAndContent extends React.Component {

    render() {
        return <div>This is layout</div>;
    }
}

PubSub.publish('uiEvent.applicationLayout.isAvailable', <MenuAndContent />)