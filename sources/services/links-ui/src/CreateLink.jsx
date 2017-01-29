import React from 'react';
import ReactDOM from 'react-dom';
import LinksClient from './LinksClient.js';

export default class CreateLink extends React.Component {
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
        this.linksClient.createLink(this.refs.item.value).then((responseStatus) => {
            console.log(responseStatus);
            PubSub.publish('uiEvent.linksList.loadSlice');
        });
        console.log(this.refs.item.value);
    }
}
