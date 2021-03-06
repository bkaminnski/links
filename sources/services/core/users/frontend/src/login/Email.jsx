import React from 'react';
import InputGroup from './InputGroup.jsx'

export default class Email extends React.Component {
    constructor() {
        super();
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        this.inputGroup.focus();
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
            glyphicon="glyphicon-user"
            placeholder="E-mail"
            type="text"
        />
    }

    validate(e) {
        let email = e.target.value;
        return email != '';
    }
}
