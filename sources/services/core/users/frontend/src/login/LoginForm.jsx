import React from 'react';
import Username from './Username.jsx';
import Password from './Password.jsx';
import LoginFormStore from './LoginFormStore.js';

export default class LoginForm extends React.Component {

    constructor() {
        super();
        this.store = new LoginFormStore(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return <div className="vertically-aligned with-shadow">
            <div className="container" style={{ maxWidth: '300px' }}>
                <div className="well well-lg">
                    <form onSubmit={this.onSubmit}>
                        <Username
                            id={this.state.keyPrefix + '-username'}
                            key={this.state.keyPrefix + '-username'}
                            ref={(login) => { this.store.addAttributeComponent('username', login); }}
                            attributeName="username"
                            initialValue=""
                            onChange={this.onChange}
                        />
                        <Password
                            id={this.state.keyPrefix + '-password'}
                            key={this.state.keyPrefix + '-password'}
                            ref={(login) => { this.store.addAttributeComponent('password', login); }}
                            attributeName="password"
                            initialValue=""
                            onChange={this.onChange}
                        />
                        <div className="text-right" role="group" aria-label="Add">
                            <button type="submit" className="btn btn-default">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

    onChange(attributeName, attributeValue, attributeValid) {
        this.store.onChange(attributeName, attributeValue, attributeValid);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.store.allAttributesAreValid()) {
            this.store.login();
        } else {
            this.store.focusOnFirstInvalidAttributeComponent();
        }
    }
}
