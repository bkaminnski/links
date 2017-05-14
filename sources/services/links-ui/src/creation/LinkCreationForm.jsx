import React from 'react';
import Url from './Url.jsx';
import LinkCreationFormStore from './LinkCreationFormStore.js';

export default class LinkCreationForm extends React.Component {

    constructor() {
        super();
        this.store = new LinkCreationFormStore(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return <div className="bottom-buffer-double">
            <form onSubmit={this.onSubmit}>
                <Url
                    key={'url-' + this.state.key}
                    ref={(url) => { this.store.addRefToAttributeComponent('url', url); }}
                    attributeName="url"
                    initialValue=""
                    onChange={this.onChange}
                />
                <div className="text-right" role="group" aria-label="Add">
                    <button type="submit" className="btn btn-default">Add</button>
                </div>
            </form>
        </div>
    }

    onChange(attributeName, attributeValue, attributeValid) {
        this.store.onChange(attributeName, attributeValue, attributeValid);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.store.validateAndFocusOnFirstInvalidComponent()) {
            this.store.createLink();
            this.store.reset();
        }
    }
}
