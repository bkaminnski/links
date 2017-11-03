import React from 'react';
import Url from './Url.jsx';
import LinkCreationFormStore from './LinkCreationFormStore.js';
import DescriptionPlaceholder from './placeholders/DescriptionPlaceholder.jsx';

export default class LinkCreationForm extends React.Component {

    constructor() {
        super();
        this.store = new LinkCreationFormStore(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return <div className="bottom-buffer-double">
            <form onSubmit={this.onSubmit}>
                <Url
                    id={this.state.keyPrefix + '-url'}
                    key={this.state.keyPrefix + '-url'}
                    ref={(url) => { this.store.addAttributeComponent('url', url); }}
                    attributeName="url"
                    initialValue=""
                    onChange={this.store.onChange}
                />
                <DescriptionPlaceholder />
                <div className="text-right" role="group" aria-label="Add">
                    <button type="submit" className="btn btn-default">Add</button>
                </div>
            </form>
        </div>
    }

    onSubmit(e) {
        e.preventDefault();
        this.store.onSubmit();
    }
}