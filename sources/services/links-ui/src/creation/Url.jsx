import React from 'react';

export default class Url extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.shouldShowError = this.shouldShowError.bind(this);
        this.state = {
            value: null,
            valid: false,
            touched: false
        };
    }

    componentDidMount() {
        this.urlInput.focus();
    }

    showErrorAndFocus() {
        this.setState({ touched: true }, () => {
            this.urlInput.focus();
        });
    }

    render() {
        let errorClassName = this.shouldShowError() ? ' has-feedback has-error' : '';
        let ariaDescribedBy = this.shouldShowError() ? 'invalid-url-description' : 'url-label';
        let errorIcon = this.shouldShowError() ? <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" /> : null;
        let errorDescription = this.shouldShowError() ? <span id="invalid-url-description" className="sr-only">Invalid URL</span> : null;

        return <div className={'input-group bottom-buffer' + errorClassName}>
            <span className="input-group-addon" id="url-label">URL</span>
            <input
                type="text"
                ref={(input) => { this.urlInput = input; }}
                onChange={this.onChange}
                value={this.state.value == null ? this.props.initialValue : this.state.value}
                className="form-control"
                placeholder="http://paste-a-link-here.com"
                aria-describedby={ariaDescribedBy}
            />
            {errorIcon}
            {errorDescription}
        </div>;
    }

    shouldShowError() {
        return !this.state.valid && this.state.touched;
    }

    onChange(e) {
        this.setState({ value: e.target.value, valid: this.validate(e.target.value), touched: true }, () => {
            this.props.onChange(this.props.attributeName, this.state.value, this.state.valid);
        });
    }

    validate(url) {
        return url != '' && /^.+((\.\w{2,})|(localhost)).*$/.test(url);
    }
}
