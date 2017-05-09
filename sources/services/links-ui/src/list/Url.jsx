import React from 'react';

export default class Url extends React.Component {
    render() {
        return (
            <h4 className="list-group-item-heading">{this.props.url}</h4>
        )
    }
}
