import React from 'react';

export default class LinkItem extends React.Component {
    render() {
        return (
            <div className="list-group">
                <a href={this.props.link.url} className="list-group-item" target="_blank">
                    {this.props.link.components}
                </a>
            </div>
        )
    }
}
