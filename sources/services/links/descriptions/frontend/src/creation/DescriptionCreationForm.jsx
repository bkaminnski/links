import React from 'react';
import Description from './Description.jsx';
import DescriptionCreationFormStore from './DescriptionCreationFormStore.js';

export default class DescriptionCreationForm extends React.Component {

    constructor() {
        super();
        this.store = new DescriptionCreationFormStore(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return <Description
            id={this.state.keyPrefix + '-description'}
            key={this.state.keyPrefix + '-description'}
            ref={(description) => { this.store.addAttributeComponent('description', description); }}
            attributeName="description"
            initialValue=""
            onChange={this.onChange}
        />
    }

    onChange(attributeName, attributeValue, attributeValid) {
        this.store.onChange(attributeName, attributeValue, attributeValid);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.store.allAttributesAreValid()) {
            this.store.createDescription();
        } else {
            this.store.focusOnFirstInvalidAttributeComponent();
        }
    }
}
