import React from 'react';
import InputGroup from './InputGroup.jsx'

export default class Password extends React.Component {
    constructor() {
        super();
        this.validate = this.validate.bind(this);
    }

    showErrorAndFocus() {
        this.inputGroup.showErrorAndFocus();
    }

    render() {
        return <InputGroup
            id={this.props.id}
            ref={(inputGroup) => { this.inputGroup = inputGroup; }}
            attributeName={this.props.attributeName}
            initialValue={this.props.initialValue}
            onChange={this.props.onChange}
            validate={this.validate}
            label=""
            glyphicon="glyphicon-lock"
            placeholder="Password"
            type="password"
        />
    }

    validate(e) {
        let password = e.target.value;
        return password != '';
    }
}
