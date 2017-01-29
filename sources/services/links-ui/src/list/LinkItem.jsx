import React from 'react';
import Url from './Url.jsx';

export default class LinkItem extends React.Component {
    render() {
        return (
            <div>
                <Url url={this.props.link.url} />
                {this.props.link.components}
                <hr />
            </div>
        )
    }
}
