import React from 'react';

export default class Url extends React.Component {
    render() {
        return (
            <div><b>Url:</b> <a href={this.props.url}>{this.props.url}</a></div>
        )
    }
}
