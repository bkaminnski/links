import React from 'react';
import UserInfoStore from './UserInfoStore.js';

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.userInfoStore = new UserInfoStore(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.userInfoStore.populate();
    }

    render() {
        return <li className="dropdown">
            <a href="#" className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <span className="glyphicon glyphicon-user" /><strong>&nbsp;&nbsp;{this.state.email}</strong>
                &nbsp;<span className="caret" />
            </a>
            <ul className="dropdown-menu">
                <li>
                    <a href="#" onClick={this.logOut}>Log out</a>
                </li>
            </ul>
        </li>;
    }

    logOut() {
        this.userInfoStore.logOut();
    }
}