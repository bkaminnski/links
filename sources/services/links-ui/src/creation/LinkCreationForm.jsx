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
                    key={this.state.keyPrefix + '-url'}
                    ref={(url) => { this.store.addAttributeComponent('url', url); }}
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
        if (this.store.allAttributesAreValid()) {
            this.store.createLink();
        } else {
            this.store.focusOnFirstInvalidAttributeComponent();
        }
    }
}
