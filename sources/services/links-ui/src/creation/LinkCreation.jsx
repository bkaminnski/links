import React from 'react';
import LinksClient from '../LinksClient.js';

export default class LinkCreation extends React.Component {
    constructor() {
        super();
        this.linksClient = new LinksClient();
        this.urlInput = null;
        this.submitItem = this.submitItem.bind(this);
    }

    componentDidMount() {
        this.urlInput.focus();
    }

    render() {
        return <div>
            <form onSubmit={this.submitItem}>
                <div className="input-group bottom-buffer-double">
                    <span className="input-group-addon" id="url-addon1">URL</span>
                    <input type="text" ref={(input) => { this.urlInput = input; }} className="form-control" placeholder="http://paste-a-link-here.com" aria-describedby="url-addon1" />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-default">Add</button>
                    </span>
                </div>
            </form>
        </div>
    }

    submitItem(e) {
        e.preventDefault();
        let url = this.urlInput.value;
        this.urlInput.value = '';
        this.linksClient.createLink(url).then((responseStatus) => {
            PubSub.publish('uiEvent.linkCreation.linkWasCreated');
        });
    }
}
