import React from 'react';
import LinksClient from '../LinksClient.js';

export default class LinkCreation extends React.Component {
    constructor() {
        super();
        this.linksClient = new LinksClient();
        this.submitItem = this.submitItem.bind(this);
    }

    render() {
        return <div>
            <form onSubmit={this.submitItem}>
                <input type="text" ref="item" />
                <input type="submit" value="Add to list" />
            </form>
        </div>
    }

    submitItem(e) {
        e.preventDefault();
        let url = this.refs.item.value;
        this.linksClient.createLink(url).then((responseStatus) => {
            PubSub.publish('uiEvent.linkCreation.linkWasCreated');
        });
    }
}
